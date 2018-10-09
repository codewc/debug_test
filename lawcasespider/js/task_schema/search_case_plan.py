# coding =utf8
import datetime
import json
import logging
import time

import execjs
import requests

import remote_post_util
import tools
from dbtools import law_case_helper as db_helper
from task_schema import db
from tools import wen_shu_js


def proceed_schema(param, proxies={}, index=1, page=20):
    guid = execjs.compile(wen_shu_js).call('guid')
    referer = "http://wenshu.court.gov.cn/list/list/?sorttype=1&number=&guid=&conditions=searchWord+2+AJLX++%E6%A1%88%E4%BB%B6%E7%B1%BB%E5%9E%8B:%E6%B0%91%E4%BA%8B%E6%A1%88%E4%BB%B6&"
    vjkl5 = remote_post_util.post_get_vjkl5_url(guid, proxies=proxies, url=referer)
    vl5x = execjs.compile(wen_shu_js).call('getkey', vjkl5)
    number = 'wens'  # remote_post_util.post_get_number(guid, vjkl5, referer)
    json_text = remote_post_util.post_list_context_by_param(guid, vjkl5, vl5x, number, param, index=index, page=page,
                                                            _proxies=proxies)
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


if __name__ == "__main1__":
    schema_days = get_between_day("2017-01-12", "2017-01-31", )
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

    def __init__(self, schema={}, page=20):
        """
        构造器
        :param schema:
        """
        if len(schema) > 0:
            self.schema = schema
        else:
            self.schema = db.extract_case_plan_schema()
        self.page = page

    def proceed_schema(self):
        """
        下载任务
        :return:
        """
        page_index = self.schema['page_index']
        batch_count = self.schema['batch_count']
        rule_id = self.schema['rule_id']
        _state = '11'  # 正在处理
        try:
            while True:  #
                page_index = 1 if page_index == 0 else page_index
                IpPort.random_ip_port()
                json_text = proceed_schema(param=self.schema['schema_search'], index=page_index,
                                           page=self.page, proxies=IpPort.proxies)
                if "RunEval" in json_text:
                    db.insert_case_plan_schema_detail(rule_id=rule_id, page_index=page_index,
                                                      schema_day=self.schema['schema_day'], json_text=json_text)

                elif "remind" in json_text:
                    IpPort.update = True
                    continue
                else:  # TODO：异常处理优化
                    logging.warning(json_text)
                    continue

                if page_index * self.page < batch_count:
                    page_index += 1
                else:
                    break
            _state = "20"  # 全部成功
        except Exception:
            _state = "13"  # 出现异常
            IpPort.update = True
            logging.exception("notice==>")
        finally:
            db_helper.update("UPDATE case_plan_schema SET page_index=%s,state=%s WHERE rule_id=%s",
                             (page_index, _state, rule_id,))


class IpPort(object):
    proxies = {}
    ip_config = {}
    cookie_dict = {}
    update = True  # 需要更新IP地址
    count = 0

    @staticmethod
    def random_ip_port():
        IpPort.count = IpPort.count + 1
        if IpPort.update or IpPort.count % 200 == 0:
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
        logging.info("IpPort count=" + str(IpPort.count))

    @staticmethod
    def _get_ip():
        time.sleep(1)
        ret = requests.get(
            'http://47.96.139.87:8081/Index-generate_api_url.html?packid=7&fa=5&qty=1&port=1&format=json&ss=5&css=&ipport=1&pro=&city='
        )
        logging.info(ret.text)
        try:
            dj = json.loads(ret.text)
            return dj['data'][0].get("IP")
        except Exception as e:
            time.sleep(60)


if __name__ == "__main__":
    IpPort.random_ip_port()
    while True:
        schema = CasePlanSchema()
        schema.proceed_schema()
