# coding=utf8
import json
import logging
import os

import execjs

import db
import remote_post_util

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s',
                    datefmt='%a, %d %b %Y %H:%M:%S', )
wen_shu_js = ""
with open(os.curdir + "/md5_20180820.js") as f:
    wen_shu_js += f.read()
with open(os.curdir + "/base64_200180820_1.js") as f:
    wen_shu_js += f.read()
with open(os.curdir + '/Base64_20180820.js') as f:
    wen_shu_js += f.read()
with open(os.curdir + "/sha1.js") as f:
    wen_shu_js += f.read()
with open(os.curdir + '/rawinflate_20180820.js') as f:
    wen_shu_js += f.read()
with open(os.curdir + "/20180927/wenshu_20180820.js") as f:
    wen_shu_js += f.read()
uuid = execjs.compile(wen_shu_js).call('guid')
logging.info(wen_shu_js)


def excute_unzip_1(source):
    if source is not None:
        context = execjs.compile(wen_shu_js);
        its = context.call('unzip', source);
        for it in its.split(";"):
            if it == '' or it is None:
                continue
            rep = it.replace('$hidescript=', '')
            print(rep)
            eval(rep)
        return context.call('unzip', source)


# AJLX = "案件类型:民事案件"
# CPRQ = "2018-07-06"
# WSLX = "文书类型:判决书"
# LAWYER = "张娟"
# LS = "安徽烁光律师事务所"
# CPRQ = '2018-08-06'
def proceed_case_lawyer(case_lawyer):
    index = case_lawyer.get("pageindex")
    index = index + 1
    repeat_count = case_lawyer.get('repeatcont')
    _try = 0;
    while (True):
        LAWYER = case_lawyer.get("realname")
        LS = case_lawyer.get("office")
        WSLX = None
        AJLX = None
        CPRQ = None
        uuid = execjs.compile(wen_shu_js).call('guid')
        page_num = 20
        logging.info(uuid)
        vjkl5 = remote_post_util.post_get_vjkl5(uuid, {})
        update_vjkl5 = False
        if update_vjkl5:
            vjkl5 = remote_post_util.post_get_vjkl5(uuid)
        vl5x = execjs.compile(wen_shu_js).call('getkey', vjkl5)
        uuid = execjs.compile(wen_shu_js).call('guid')
        page_json = remote_post_util.post_list_context(guid=uuid, vl5x=vl5x, vjkl5=vjkl5, number="&gui", AJLX=AJLX,
                                                       WSLX=WSLX,
                                                       CPRQ=CPRQ, LAWYER=LAWYER, LS=LS, Index=index, cookies={})
        if str(page_json).startswith("[]"):
            _try = _try + 1;
            if _try <= 6:
                logging.info("重试：[]'" + str(_try) + "次")
                continue
            return None
        if str(page_json).startswith("remind"):
            remote_post_util.init_randdom_ip_port()
            continue
        if str(page_json).find("RunEval") == -1:
            return None
        if str(page_json).find("Count") == -1:
            logging.warning("Count没有值" + str(page_json))
            batch_count = 0
        else:
            batch_count = int(json.loads(page_json)[0].get("Count"))
        if not db.insert_case_lawyer_schema_before(case_lawyer.get("id"), page_json, index, batch_count, page_num):
            repeat_count = repeat_count + 1
        db.update_case_lawyer_on_sucess(case_lawyer.get("id"), index)
        if (index * page_num >= batch_count):
            return batch_count
            break
        index = index + 1


def init_court_tree(condition="裁判日期:2018-08-09 TO 2018-08-09"):
    guid = execjs.compile(wen_shu_js).call('guid')
    referer = "http://wenshu.court.gov.cn/list/list/?sorttype=1&number=&guid=&conditions=searchWord+2+AJLX++%E6%A1%88%E4%BB%B6%E7%B1%BB%E5%9E%8B:%E6%B0%91%E4%BA%8B%E6%A1%88%E4%BB%B6&"
    vjkl5 = remote_post_util.post_get_vjkl5_url(uuid, url=referer)
    vl5x = execjs.compile(wen_shu_js).call('getkey', vjkl5)
    number = 'wens'  # remote_post_util.post_get_number(guid, vjkl5, referer)
    condition = condition
    json_text = remote_post_util.list_tree_content(condition, vl5x, guid, number, vjkl5)
    json_data = json.loads(json_text)
    ret_context = []
    for it in json_data:
        print(it)
        if it.get("Key") == "法院地域":  #
            child = it.get("Child")
            int_value = it.get("IntValue")
            ret_context.append(int_value)
            for _child_it in child:
                _child_key = _child_it.get("Key")
                _child_value = _child_it.get("Value")
                _child_field = _child_it.get("Field")
                if _child_key == "":
                    continue
                _child_value = int(_child_value)
                if _child_value == 0:  # 没有值,do nothing
                    continue
                if _child_value <= 200:
                    ret_context.append({"{},{}:{}".format(condition, _child_field, _child_key): _child_value})
                    continue
                remote_post_util.proceed_court_tree_context(condition, _child_field, _child_key, ret_context)
            break
        else:
            continue
    return ret_context


def execute():
    try:
        case_lawyer = db.get_case_lawyer()
        if case_lawyer is not None:
            batch_count = proceed_case_lawyer(case_lawyer)
            if batch_count is None or batch_count < 0:
                db.update_case_lawyer_on_fail(case_lawyer.get("id"))
            else:
                db.update_case_lawyer(case_lawyer.get("id"), batch_count)
    except Exception as e:
        db.update_case_lawyer_on_fail(case_lawyer.get("id"))
        logging.exception("error")
        remote_post_util.init_randdom_ip_port()

# while True:
#     execute()
