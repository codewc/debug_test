import config
import json
import logging
import uuid

from pymysql.err import IntegrityError

import dbtools.helper as db_helper
from tools_extends import unzip_helper, doc_id_helper, get_browser

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s',
                    datefmt='%a, %d %b %Y %H:%M:%S', filemode='a', )


def get_case_lawyer():
    """"
    待获取律师信息
    """
    sql = 'select id,casenum,deal,office,phone,realname,remarks,`pageindex`,`repeatcont` from case_lawyer where deal=FALSE and fail<15 and process=0  and remark = {} {} LIMIT 1'.format(
        config.remark,
        config.order_by)
    row = db_helper.fetch_one(sql)
    update_case_lawyer_process(1, row.get("id"));
    logging.info(row)
    return row


def update_case_lawyer_process(process, lawyer_id):
    template_sql = '''update `case_lawyer` set `process`= %s where `id`= %s''';
    db_helper.update(template_sql, (process, lawyer_id))


def insert_case_lawyer_schema_before(lawyer_id, page_json, index, batch_count, pageNum=20):
    template_sql = '''INSERT INTO `case_lawyer_schema_before`
         (`id`,
          `lawyer_id`,
          `page_json`,
          `json_batch_count`,
          `index`,
          `pageNum`
           )  VALUES (%s, %s, %s, %s, %s,%s)'''
    id = str(uuid.uuid1())
    db_helper.insert(template_sql, (id, lawyer_id, page_json, batch_count, index, pageNum,))


browser = get_browser()


def insert_case_lawyer_schema(lawyer_id, page_json):
    global remark
    remark = True
    # 通过cursor创建游标
    page_data = json.loads(page_json)
    template_sql = '''INSERT INTO `case_lawyer_schema`
     (`id`,
      `lawyer_id`,
      `json_batch_count`,
      `json_data_context`,
      `json_data_type`,
      `json_data_date`, 
      `json_data_name`,
      `json_data_id`,
      `json_data_level`,
      `json_data_number`,
      `json_data_court`
       )  VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'''
    json_batch_count = -1
    global run_eval
    run_eval = None
    run_eval_key = None
    for it in page_data:
        if it.get("RunEval") is not None:
            run_eval = it.get("RunEval")
            run_eval_key = unzip_helper(run_eval, browser)
        if it.get("Count") is not None:
            json_batch_count = int(it.get("Count"))
            continue
        id = str(uuid.uuid1())
        json_data_context = it.get("裁判要旨段原文")
        json_data_type = it.get("案件类型")
        json_data_date = it.get("裁判日期")
        json_data_name = it.get("案件名称")
        _json_data_id = doc_id_helper(it.get("文书ID"), run_eval_key, browser)
        logging.info(_json_data_id)
        json_data_id = _json_data_id
        json_data_level = it.get("审判程序")
        json_data_number = it.get("案号")
        json_data_court = it.get("法院名称")
        try:
            db_helper.insert(template_sql, (
                id, lawyer_id, json_batch_count, json_data_context, json_data_type, json_data_date, json_data_name,
                json_data_id, json_data_level, json_data_number, json_data_court))
        except IntegrityError:
            remark = False
            logging.exception("发生了错误 IntegrityError")
            db_helper.update('update case_lawyer set repeatcont=repeatcont+1 where id=%s', (lawyer_id,))
        except Exception:
            logging.exception("发生了错误")
    return remark


def update_case_lawyer(lawyer_id, casenum):
    template_sql = '''update `case_lawyer` set `casenum`= %s,deal=TRUE where `id`= %s''';
    db_helper.update(template_sql, (casenum, lawyer_id))
    update_case_lawyer_process(0, lawyer_id);


def update_case_lawyer_on_sucess(lawyer_id, index):
    template_sql = '''update `case_lawyer` set `pageindex`=%s  where `id`= %s''';
    db_helper.update(template_sql, (index, lawyer_id,))


def update_case_lawyer_on_fail(lawyer_id):
    template_sql = '''update `case_lawyer` set fail=fail+1  where `id`= %s''';
    db_helper.update(template_sql, (lawyer_id,))
    update_case_lawyer_process(0, lawyer_id);


# deal
def get_case_lawyer_schema_before():
    sql = 'select `id`,`lawyer_id`,`json_batch_count`,`createdate`,`updatedate`,`page_json`,`index`,`status` from case_lawyer_schema_before where `status`=00 order by `createdate` asc LIMIT 1'
    row = db_helper.fetch_one(sql)
    after_sql = 'update case_lawyer_schema_before set `status`=%s where `id`=%s'
    db_helper.update(after_sql, ('10', row.get('id')))
    logging.info(row)
    return row
