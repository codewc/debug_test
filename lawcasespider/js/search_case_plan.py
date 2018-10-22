# coding =utf8
import asyncio
import concurrent
import datetime
import json
import logging
import time

import aiohttp
import execjs
import requests
from utils.redis_util import RedisCasePlanSchemaTaskMaster
import remote_post_util
import tools
from dbtools import law_case_helper as db_helper
from task_schema import db
from tools import wen_shu_js
import copy


async def _proceed_schema(param, proxies={}, index=1, page=20):
    guid = execjs.compile(wen_shu_js).call('guid')
    referer = "http://wenshu.court.gov.cn/list/list/?sorttype=1"
    async with aiohttp.ClientSession() as client:
        client.cookie_jar.clear()
        vjkl5 = await remote_post_util.async_post_get_vjkl5_url(client, guid, proxies=proxies, url=referer)
        # vjkl5 = remote_post_util.post_get_vjkl5_url_helper(guid, _proxies=proxies)
        vl5x = execjs.compile(wen_shu_js).call('getkey', vjkl5)
        number = 'wens'  # await remote_post_util.async_post_get_number(client, guid, vjkl5, referer, _proxies=proxies)
        json_text = await remote_post_util.post_list_context_by_param(client, guid, vjkl5, vl5x, number, param,
                                                                      index=index,
                                                                      page=page,
                                                                      _proxies=proxies
                                                                      )
        return json_text


def condition_helper(schema_day="2018-08-09"):
    return "裁判日期:{} TO {}".format(schema_day, schema_day)


def get_between_day(begin_date, end_date):
    date_list = []
    begin_date = datetime.datetime.strptime(begin_date, "%Y-%m-%d")
    end_date = datetime.datetime.strptime(end_date, "%Y-%m-%d")
    # end_date = datetime.datetime.strptime(time.strftime('%Y-%m-%d', time.localtime(time.time())), "%Y-%m-%d")
    while begin_date <= end_date:
        date_str = begin_date.strftime("%Y-%m-%d")
        date_list.append(date_str)
        begin_date += datetime.timedelta(days=1)
    return date_list


if __name__ == "__main4__":
    schema_days = get_between_day("2017-12-01", "2017-12-31", )
    for schema_day in schema_days:
        # post_test("裁判日期:2018-08-09 TO 2018-08-09,基层法院:北京市石景山区人民法院")
        ret = tools.init_court_tree(condition=condition_helper(schema_day))
        first_count = ret[0]
        for it in ret[1:]:
            (key, value), = it.items()
            db.insert_case_plan_schema(first_count, value, schema_day, key)
        db.update_case_plan_schema(schema_day)


class CasePlanSchema(object):
    """
    获取调度任务
    """
    __max_retry = 30
    __page = 20  # 每页条数

    def __init__(self):
        """
        构造器
        """
        # if len(schema) > 0:
        #     self.schema = schema
        # else:
        #     self.schema = RedisCasePlanSchemaTaskMaster.extract_case_plan_schema(RedisCasePlanSchemaTaskMaster.KEY,
        #                                                                          1).pop()

    @staticmethod
    def fail(now=False):
        """
        :param now: True 马上刷新
        :return:
        """
        __ret = False
        if now:
            IpPort.retry = IpPort.retry + 3
        if IpPort.retry > CasePlanSchema.__max_retry:
            IpPort.update = True
            __ret = True
            logging.warning("IpPort.update = True" + str(now))
        IpPort.retry = IpPort.retry + 1
        logging.warning("warn==> retry=" + str(IpPort.retry))
        return __ret

    @staticmethod
    def success():
        IpPort.retry = 0

    @staticmethod
    async def proceed_schema(schema={}):
        """
        下载任务
        :return:
        """
        if not schema:
            logging.warning("没有任务")
            return False
        page_index = schema['page_index']
        batch_count = schema['batch_count']
        rule_id = schema['rule_id']
        _state = '11'  # 正在处理
        _continue = True  # 是否继续处理
        try:
            page_index = 1 if page_index == 0 else page_index
            IpPort.random_ip_port()
            _proxies = IpPort.proxies
            try:
                json_text = await _proceed_schema(param=schema['schema_search'],
                                                  index=page_index,
                                                  page=CasePlanSchema.__page,
                                                  proxies=IpPort.proxies)
            except concurrent.futures._base.TimeoutError:
                CasePlanSchema.fail()
                return _continue
            except aiohttp.client_exceptions.ClientProxyConnectionError:  # 代理不可用
                CasePlanSchema.fail(now=True)
                return _continue
            except aiohttp.client_exceptions.ClientPayloadError:
                CasePlanSchema.fail()
                logging.exception("warn==> retry=" + str(IpPort.retry))
                return _continue
            except AssertionError:
                logging.exception("AssertionError")
                CasePlanSchema.fail()
                return _continue
            except aiohttp.client_exceptions.ServerDisconnectedError:
                logging.exception("ServerDisconnectedError")
                CasePlanSchema.fail()
            except execjs._exceptions.ProgramError:
                logging.exception("ProgramError")
                CasePlanSchema.fail()
            if "RunEval" in json_text:
                CasePlanSchema.success()
                db.insert_case_plan_schema_detail(rule_id=rule_id,
                                                  page_index=page_index,
                                                  schema_day=schema['schema_day'],
                                                  json_text=json_text)
            elif "remind" in json_text:
                if _proxies and _proxies.get("http") in IpPort.proxies.get("http"):  # 协程
                    logging.warning(json_text)
                    CasePlanSchema.fail(True)
                return _continue
            else:
                logging.warning(json_text)
                return _continue
            if page_index * CasePlanSchema.__page < batch_count:
                page_index += 1
                schema["page_index"] = page_index
            else:
                _continue = False
                schema["process"] = True
                _state = "20"  # 全部成功
        except Exception:
            _state = "13"  # 出现异常
            schema["process"] = True
            IpPort.update = True
            logging.exception("notice==>")
        finally:
            db_helper.update("UPDATE case_plan_schema SET page_index=%s,state=%s WHERE rule_id=%s",
                             (page_index, _state, rule_id,))
        return _continue

    @staticmethod
    def remove_complete_task(deal_task_pool=[]):
        logging.info("remove_complete_task from ====" + str(deal_task_pool))

        def condition(data={}):
            return not ("process" in data.keys() and data.get("process"))

        __deal_task_pool = list(filter(condition, deal_task_pool))
        return __deal_task_pool


class IpPort(object):
    proxies = {}
    ip_config = {}
    cookie_dict = {}
    update = True  # 需要更新IP地址
    count = 0
    retry = 0
    max_retry = 10
    cache_vjkl5 = ""

    @staticmethod
    def random_ip_port():
        IpPort.count = IpPort.count + 1
        IpPort.cache_vjkl5 = ""
        if IpPort.update or IpPort.count % 666 == 0:
            ip_port = IpPort._get_ip()
            logging.info("change ip_port=>" + ip_port)
            IpPort.proxies = {
                'http': 'http://{}'.format(ip_port),
                'https': 'https://{}'.format(ip_port),
            }
            IpPort.ip_config = {
                'ip_config': '{}'.format(ip_port),
            }
            IpPort.update = False
            IpPort.count = 0
            IpPort.retry = 0
        logging.info("IpPort count=" + str(IpPort.count))

    @staticmethod
    def task_before_process():
        IpPort.cache_vjkl5 = ""

    @staticmethod
    def _get_ip():
        time.sleep(1)
        ret = requests.get(
            'http://47.96.139.87:8081/Index-generate_api_url.html?packid=7&fa=5&qty=1&port=1&format=json&ss=5&css=&ipport=1&pro=&city='
        )
        while True:
            logging.info(ret.text)
            try:
                dj = json.loads(ret.text)
                return dj['data'][0].get("IP")
            except Exception as e:
                time.sleep(60)




if __name__ == "__main__":
    batch_num = 10  # 爬取批次数量
    wait_task_pool = []
    while True:
        IpPort.task_before_process()
        IpPort.random_ip_port()
        loop = asyncio.get_event_loop()
        wait_task_pool = CasePlanSchema.remove_complete_task(deal_task_pool=wait_task_pool)
        __extract_task_num = batch_num - len(wait_task_pool)
        extract_task_num = __extract_task_num if __extract_task_num > 0 else 0
        logging.info("__extract_task_num=" + str(__extract_task_num) + ";extract_task_num=" + str(extract_task_num))
        task_pool = RedisCasePlanSchemaTaskMaster.extract_case_plan_schema(RedisCasePlanSchemaTaskMaster.KEY,
                                                                           extract_task_num)
        wait_task_pool.extend(task_pool)
        __wait_task_pool = copy.deepcopy(wait_task_pool)
        task = []
        for data in wait_task_pool:
            task.append(CasePlanSchema.proceed_schema(data))
        loop.run_until_complete(asyncio.wait(task))
