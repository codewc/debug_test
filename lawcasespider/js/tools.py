import execjs

import remote_post_util
import db
import time
import logging
import json
from selenium import webdriver

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s',
                    datefmt='%a, %d %b %Y %H:%M:%S', )

wen_shu_js = "";
with open("md5_20180820.js") as f:
    wen_shu_js += f.read()
with open("base64_20180820.js") as f:
    wen_shu_js += f.read()
with open("sha1.js") as f:
    wen_shu_js += f.read()
with open("wenshu_20180820.js") as f:
    wen_shu_js += f.read()
# with open(('crack20180820.js')) as f:
#     wen_shu_js += f.read()

#vl5x = execjs.compile(wen_shu_js).call('test_unzip', 'D9D4E7F3DBE8894C19D617420CA337191FD68CFFE9DB6DD82D857010709EA26DE0772E19137A356A439AD313F91E586208E38FBC939BBC0F684E0BBD49C8844BAF946B20962328010DFD492AEC9A84F0F7184D7294C0743CE65A6F0C33C6B6715463B2839E1649CF4B91B334304155C7')


# https://wangye.org/tools/scripts/eval/


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
    browser = webdriver.Chrome(chrome_options=chromeOptions)
    # service_args = [
    #     '--proxy=%s' % remote_post_util.ip_config.get("ip_config"),  # 代理 IP:prot(eg:192.168.0.28:808)
    #     '--proxy-type=http',  # 代理类型:http/https
    #     '--load - images = no',  # 关闭图片加载(可选)
    #     '--disk-cache=yes',  # 开启缓存(可选)
    #     '--ignore-ssl-errors=true'  # 忽略https错误(可选)
    # ]
    # browser = webdriver.PhantomJS(service_args=service_args)
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


# print(vl5x)

case_lawyer = db.get_case_lawyer()


def proceed_case_lawyer(case_lawyer):
    index = 1
    while (True):
        LAWYER = case_lawyer.get("realname")
        LS = case_lawyer.get("office")
        WSLX = None
        AJLX = None
        CPRQ = None
        cookies = init_cookies()
        print(wen_shu_js)
        uuid = execjs.compile(wen_shu_js).call('guid')
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
        db.insert_case_lawyer_schema(case_lawyer.get("id"), page_json)
        batch_count = int(json.loads(page_json)[0].get("Count"))
        time.sleep(2)
        if (index * 5 >= batch_count):
            return batch_count
            break
        if batch_count > 90:
            return -1
        index = index + 1


while True:
    case_lawyer = db.get_case_lawyer()
    if case_lawyer is not None:
        batch_count = proceed_case_lawyer(case_lawyer)
        db.update_case_lawyer(case_lawyer.get("id"), batch_count)
