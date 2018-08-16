import execjs

import remote_post_util
import db
import time
import logging
from selenium import webdriver

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s',
                    datefmt='%a, %d %b %Y %H:%M:%S', )

wen_shu_js = "";
with open("md5.js") as f:
    wen_shu_js += f.read()
with open("base64.js") as f:
    wen_shu_js += f.read()
with open("sha1.js") as f:
    wen_shu_js += f.read()
with open("wen_shu.js") as f:
    wen_shu_js += f.read()
# https://wangye.org/tools/scripts/eval/


# AJLX = "案件类型:民事案件"
# CPRQ = "2018-07-06"
# WSLX = "文书类型:判决书"
#LAWYER = "张娟"
#LS = "安徽烁光律师事务所"
case_lawyer = db.get_case_lawyer()
LAWYER = case_lawyer.get("realname")
LS = case_lawyer.get("office")
WSLX = None
AJLX = None
CPRQ = None
# CPRQ = '2018-08-06'

'''
初始化cookies值
'''


def init_cookies():
    browser = webdriver.Chrome()
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
        browser.close()
    return cookie_dict


# print(vl5x)
cookies = init_cookies()
uuid = execjs.compile(wen_shu_js).call('guid')

vjkl5 = remote_post_util.post_get_vjkl5(uuid, cookies)
update_vjkl5 = False
i = 1;
while (True):
    if update_vjkl5:
        vjkl5 = remote_post_util.post_get_vjkl5(uuid)
        update_vjkl5 = False
    vl5x = execjs.compile(wen_shu_js).call('getkey', vjkl5)
    uuid = execjs.compile(wen_shu_js).call('guid')
    number = remote_post_util.post_get_number(guid=uuid, vjkl5=vjkl5, AJLX=AJLX, WSLX=WSLX, CPRQ=CPRQ, LAWYER=LAWYER,
                                              LS=LS, cookies=cookies)
    ret = remote_post_util.post_list_context(guid=uuid, vl5x=vl5x, vjkl5=vjkl5, number=number, AJLX=AJLX, WSLX=WSLX,
                                             CPRQ=CPRQ, LAWYER=LAWYER, LS=LS, Index=1, cookies=cookies)
    if ret != '[check]' and ret != 'remind' and ret != 'remind key':
        break
    if i % 20 == 0:
        update_vjkl5 = True
    time.sleep(10)
