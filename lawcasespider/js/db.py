import pymysql.cursors
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s',
                    datefmt='%a, %d %b %Y %H:%M:%S', )

'''
待获取律师信息
'''


def get_case_lawyer():
    connection = pymysql.connect(host="120.76.138.153", port=3307, user="root", password="faduceshi123!@#",
                                 db="duowen", charset='utf8')
    # 执行数据查询
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
