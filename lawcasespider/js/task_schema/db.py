# coding=utf8
from dbtools import law_case_helper as db_helper
import uuid
import logging

CASE_PLAN_SCHEMA_STATE_00 = "00"
CASE_PLAN_SCHEMA_STATE_10 = "10"
CASE_PLAN_SCHEMA_STATE_11 = "11"


def insert_case_plan_schema(total_count, batch_count, schema_day, schema_search, ):
    template_sql = '''INSERT INTO `case_plan_schema`
         (`rule_id`,
         `total_count`,
          `batch_count`,
          `schema_day`,
          `schema_search`,
          `state`
           )  VALUES (%s, %s, %s, %s, %s,%s)'''
    _id = str(uuid.uuid1())
    db_helper.insert(template_sql,
                     (_id, total_count, batch_count, schema_day, schema_search, CASE_PLAN_SCHEMA_STATE_00,))


def update_case_plan_schema(schema_day):
    template_sql = '''UPDATE `case_plan_schema` SET state=%s WHERE state=%s AND schema_day=%s'''
    db_helper.insert(template_sql, (CASE_PLAN_SCHEMA_STATE_10, CASE_PLAN_SCHEMA_STATE_00, schema_day,))


def extract_case_plan_schema():
    """
    返回待处理数据
    :return:
    """
    sql = '''
    SELECT 
        rule_id,
        batch_count,
        remarks,
        create_date,
        update_date,
        fail,
        page_index,
        repeat_count,
        schema_day,
        schema_search,
        total_count,
        state 
    FROM case_plan_schema WHERE state='10' AND fail<15 ORDER BY schema_day limit 1 
    '''
    row = db_helper.fetch_one(sql)
    db_helper.update("UPDATE case_plan_schema SET state=%s WHERE rule_id=%s",
                     (CASE_PLAN_SCHEMA_STATE_11, row.get("rule_id")))
    logging.info(row)
    return row


CASE_PLAN_SCHEMA_DETAIL_00 = "00"


def insert_case_plan_schema_detail(rule_id, page_index, schema_day, json_text):
    template_sql = '''INSERT INTO `case_plan_schema_detail`
         (`detail_id`,
         `rule_id`,
         `page_index`,
          `schema_day`,
          `state`,
          `json_text`
           )  VALUES (%s, %s, %s, %s, %s, %s)'''
    _id = str(uuid.uuid1())
    db_helper.insert(template_sql,
                     (_id, rule_id, page_index, schema_day, CASE_PLAN_SCHEMA_DETAIL_00, json_text,))
