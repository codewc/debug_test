import json
import logging

import execjs
from selenium import webdriver

import db
import remote_post_util

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s',
                    datefmt='%a, %d %b %Y %H:%M:%S', )
wen_shu_js = "";
with open("md5_20180820.js") as f:
    wen_shu_js += f.read()
with open("base64_200180820_1.js") as f:
    wen_shu_js += f.read()
with open('Base64_20180820.js') as f:
    wen_shu_js += f.read()
with open("sha1.js") as f:
    wen_shu_js += f.read()
with open('rawinflate_20180820.js') as f:
    wen_shu_js += f.read()
with open("wenshu_20180820.js") as f:
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

'''
初始化cookies值
'''


def init_cookies():
    chromeOptions = webdriver.ChromeOptions()
    chromeOptions.add_argument('--proxy-server=http://' + remote_post_util.ip_config.get("ip_config"))
    chromeOptions.add_argument("--no-sandbox")
    chromeOptions.add_argument('--headless')
    browser = webdriver.Chrome(chrome_options=chromeOptions)
    browser.delete_all_cookies()
    global cookie_dict
    try:
        browser.get("http://wenshu.court.gov.cn")
        Hm_lvt = browser.get_cookie("Hm_lvt_d2caefee2de09b8a6ea438d74fd98db2")['value']
        Hm_lpvt = browser.get_cookie("Hm_lpvt_d2caefee2de09b8a6ea438d74fd98db2")['value']
        gscu = browser.get_cookie("_gscu_2116842793")['value']
        gscs = browser.get_cookie("_gscs_2116842793")['value']
        cookie_dict = {
            'Hm_lvt_d2caefee2de09b8a6ea438d74fd98db2': Hm_lvt,
            'Hm_lpvt_d2caefee2de09b8a6ea438d74fd98db2': Hm_lpvt,
            '_gscu_2116842793': gscu,
            '_gscs_2116842793': gscs,
        }
        logging.info(cookie_dict)
    finally:
        browser.quit()
    return cookie_dict


def proceed_case_lawyer(case_lawyer):
    index = case_lawyer.get("pageindex")
    index = index + 1
    repeat_count = case_lawyer.get('repeatcont')
    while (True):
        LAWYER = case_lawyer.get("realname")
        LS = case_lawyer.get("office")
        WSLX = None
        AJLX = None
        CPRQ = None
        cookies = init_cookies()
        uuid = execjs.compile(wen_shu_js).call('guid')
        logging.info(uuid)
        vjkl5 = remote_post_util.post_get_vjkl5(uuid, cookies)
        update_vjkl5 = False
        if update_vjkl5:
            vjkl5 = remote_post_util.post_get_vjkl5(uuid)
            update_vjkl5 = False
        vl5x = execjs.compile(wen_shu_js).call('getkey', vjkl5)
        uuid = execjs.compile(wen_shu_js).call('guid')
        number = remote_post_util.post_get_number(guid=uuid, vjkl5=vjkl5, AJLX=AJLX, WSLX=WSLX, CPRQ=CPRQ,
                                                  LAWYER=LAWYER,
                                                  LS=LS, cookies=cookies)
        page_json = remote_post_util.post_list_context(guid=uuid, vl5x=vl5x, vjkl5=vjkl5, number=number, AJLX=AJLX,
                                                       WSLX=WSLX,
                                                       CPRQ=CPRQ, LAWYER=LAWYER, LS=LS, Index=index, cookies=cookies)
        if page_json == '[]':
            return None
        if not db.insert_case_lawyer_schema(case_lawyer.get("id"), page_json):
            repeat_count = repeat_count + 1
        db.update_case_lawyer_on_sucess(case_lawyer.get("id"), index)
        batch_count = int(json.loads(page_json)[0].get("Count"))
        if (index * 5 >= batch_count or repeat_count > 15):
            return batch_count
            break
        if batch_count > 90:
            return -1
        index = index + 1


while True:
    try:
        case_lawyer = db.get_case_lawyer()
        if case_lawyer is not None:
            batch_count = proceed_case_lawyer(case_lawyer)
            if batch_count < 0 or batch_count is None:
                db.update_case_lawyer_on_fail(case_lawyer.get("id"))
                remote_post_util.init_randdom_ip_port()
            db.update_case_lawyer(case_lawyer.get("id"), batch_count)
    except Exception as e:
        db.update_case_lawyer_on_fail(case_lawyer.get("id"))
        logging.error(e)
        remote_post_util.init_randdom_ip_port()
