import pymysql.cursors
import logging
import json
import uuid

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s',
                    datefmt='%a, %d %b %Y %H:%M:%S', )

'''
待获取律师信息
'''


def get_case_lawyer():
    connection = pymysql.connect(host="120.76.138.153", port=3307, user="root", password="faduceshi123!@#",
                                 db="duowen", charset='utf8')
    # 通过cursor创建游标
    cursor = connection.cursor()
    sql = 'select id,casenum,deal,office,phone,realname,remarks from case_lawyer where deal=FALSE order by id desc LIMIT 1'
    cursor.execute(sql)
    row = cursor.fetchone()
    lawyer = {"id": row[0], "casenum": row[1], "deal": row[2], "office": row[3], "phone": row[4], "realname": row[5],
              "remarks": row[6]}
    connection.close()
    logging.info(lawyer)
    return lawyer


def update_case_lawyer(lawyer_id, page_json):
    connection = pymysql.connect(host="120.76.138.153", port=3307, user="root", password="faduceshi123!@#",
                                 db="duowen", charset='utf8')
    # 通过cursor创建游标
    cursor = connection.cursor()
    page_data = json.loads(page_json)
    temp_sql = '''INSERT INTO `case_lawyer_schema`
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
    for it in page_data:
        if it.get("Count") is not None:
            json_batch_count = int(it.get("Count"))
            continue
        id = uuid.uuid1().hex
        json_data_context = it.get("裁判要旨段原文")
        json_data_type = it.get("案件类型")
        json_data_date = it.get("裁判日期")
        json_data_name = it.get("案件名称")
        json_data_id = it.get("文书ID")
        json_data_level = it.get("审判程序")
        json_data_number = it.get("案号")
        json_data_court = it.get("法院名称")

        cursor.execute(temp_sql, (
            id, lawyer_id, json_batch_count, json_data_context, json_data_type, json_data_date, json_data_name,
            json_data_id, json_data_level, json_data_number, json_data_court))
    connection.commit()
    connection.close()