import pymysql.cursors
import logging
import json
import uuid
from tools_extends import unzip_helper, doc_id_helper

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s',
                    datefmt='%a, %d %b %Y %H:%M:%S', filemode='a', )

'''
待获取律师信息
'''


def get_case_lawyer():
    connection = pymysql.connect(host="120.76.138.153", port=3307, user="root", password="faduceshi123!@#",
                                 db="duowen", charset='utf8')
    # 通过cursor创建游标
    cursor = connection.cursor()
    sql = 'select id,casenum,deal,office,phone,realname,remarks,`pageindex` from case_lawyer where deal=FALSE and fail<15 and process=0 order by phone asc LIMIT 1'
    cursor.execute(sql)
    row = cursor.fetchone()
    lawyer = {"id": row[0], "casenum": row[1], "deal": row[2], "office": row[3], "phone": row[4], "realname": row[5],
              "remarks": row[6], "pageindex": row[7]}
    connection.close()
    update_case_lawyer_process(1, lawyer.get("id"));
    logging.info(lawyer)
    return lawyer


def update_case_lawyer_process(process, lawyer_id):
    connection = pymysql.connect(host="120.76.138.153", port=3307, user="root", password="faduceshi123!@#",
                                 db="duowen", charset='utf8')
    # 通过cursor创建游标
    cursor = connection.cursor()
    template_sql = '''update `case_lawyer` set `process`= %s where `id`= %s''';
    cursor.execute(template_sql, (process, lawyer_id))
    connection.commit()


def transform_json_data_id(runEval, id):
    return


def insert_case_lawyer_schema(lawyer_id, page_json):
    connection = pymysql.connect(host="120.76.138.153", port=3307, user="root", password="faduceshi123!@#",
                                 db="duowen", charset='utf8')
    # 通过cursor创建游标
    cursor = connection.cursor()
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
       )  VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)''';
    json_batch_count = -1
    global run_eval
    run_eval = None
    run_eval_key = None
    for it in page_data:
        if it.get("RunEval") is not None:
            run_eval = it.get("RunEval")
            run_eval_key = unzip_helper(run_eval)
        if it.get("Count") is not None:
            json_batch_count = int(it.get("Count"))
            continue
        id = str(uuid.uuid1())
        json_data_context = it.get("裁判要旨段原文")
        json_data_type = it.get("案件类型")
        json_data_date = it.get("裁判日期")
        json_data_name = it.get("案件名称")
        _json_data_id = doc_id_helper(it.get("文书ID"), run_eval_key);
        logging.info(_json_data_id)
        json_data_id = doc_id_helper(it.get("文书ID"), run_eval_key)
        json_data_level = it.get("审判程序")
        json_data_number = it.get("案号")
        json_data_court = it.get("法院名称")
        try:
            cursor.execute(template_sql, (
                id, lawyer_id, json_batch_count, json_data_context, json_data_type, json_data_date, json_data_name,
                json_data_id, json_data_level, json_data_number, json_data_court))
            connection.commit()
        except Exception as exception:
            logging.exception("发生了错误")
    connection.close()
    return page_json


def update_case_lawyer(lawyer_id, casenum):
    connection = pymysql.connect(host="120.76.138.153", port=3307, user="root", password="faduceshi123!@#",
                                 db="duowen", charset='utf8')
    # 通过cursor创建游标
    cursor = connection.cursor()
    template_sql = '''update `case_lawyer` set `casenum`= %s,deal=TRUE where `id`= %s''';
    cursor.execute(template_sql, (casenum, lawyer_id))
    connection.commit()
    connection.close()
    update_case_lawyer_process(0, lawyer_id);


def update_case_lawyer_on_sucess(lawyer_id, index):
    connection = pymysql.connect(host="120.76.138.153", port=3307, user="root", password="faduceshi123!@#",
                                 db="duowen", charset='utf8')
    # 通过cursor创建游标
    cursor = connection.cursor()
    template_sql = '''update `case_lawyer` set `pageindex`=%s  where `id`= %s''';
    cursor.execute(template_sql, (index, lawyer_id,))
    connection.commit()
    connection.close()


def update_case_lawyer_on_fail(lawyer_id):
    connection = pymysql.connect(host="120.76.138.153", port=3307, user="root", password="faduceshi123!@#",
                                 db="duowen", charset='utf8')
    # 通过cursor创建游标
    cursor = connection.cursor()
    template_sql = '''update `case_lawyer` set fail=fail+1  where `id`= %s''';
    cursor.execute(template_sql, (lawyer_id,))
    connection.commit()
    connection.close()
    update_case_lawyer_process(0, lawyer_id);
