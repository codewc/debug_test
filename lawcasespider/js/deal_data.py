import logging

import db
import time

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s',
                    datefmt='%a, %d %b %Y %H:%M:%S', )


def proceed_data():
    case_lawyer_schema_before = db.get_case_lawyer_schema_before()
    page_json = case_lawyer_schema_before.get("page_json")
    if str(page_json).find("RunEval") == -1:
        logging.error(page_json)
        return None
    if not db.insert_case_lawyer_schema(case_lawyer_schema_before.get("lawyer_id"), page_json):
        pass


while True:
    try:
        proceed_data();
    except Exception as e:
        logging.exception("发生了错误")
        time.sleep(60)