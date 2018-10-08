# coding =utf8
import datetime
import logging

import execjs

import remote_post_util
import tools
from task_schema import db
from tools import wen_shu_js
from dbtools import law_case_helper as db_helper
import json


def proceed_schema(param, index=1, page=20):
    guid = execjs.compile(wen_shu_js).call('guid')
    referer = "http://wenshu.court.gov.cn/list/list/?sorttype=1&number=&guid=&conditions=searchWord+2+AJLX++%E6%A1%88%E4%BB%B6%E7%B1%BB%E5%9E%8B:%E6%B0%91%E4%BA%8B%E6%A1%88%E4%BB%B6&"
    vjkl5 = remote_post_util.post_get_vjkl5_url(guid, url=referer)
    vl5x = execjs.compile(wen_shu_js).call('getkey', vjkl5)
    number = 'wens'  # remote_post_util.post_get_number(guid, vjkl5, referer)
    json_text = remote_post_util.post_list_context_by_param(guid, vjkl5, vl5x, number, param, index=index, page=page)
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
            while page_index * self.page <= batch_count:
                page_index = 1 if page_index == 0 else page_index
                json_text = proceed_schema(param=self.schema['schema_search'], index=page_index,
                                           page=self.page)
                if "RunEval" in json_text:
                    db.insert_case_plan_schema_detail(rule_id=rule_id, page_index=page_index,
                                                      schema_day=self.schema['schema_day'], json_text=json_text)
                    page_index += 1
                else:  # TODO：异常处理优化
                    logging.warning(json_text)
                    continue
            _state = "20"  # 全部成功
        except Exception:
            _state = "13"  # 出现异常
            logging.exception("notice==>")
        finally:
            db_helper.update("UPDATE case_plan_schema SET page_index=%s,state=%s WHERE rule_id=%s",
                             (page_index, _state, rule_id,))


if __name__ == "__main__":
    while True:
        schema = CasePlanSchema()
        schema.proceed_schema()
