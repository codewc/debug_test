import logging
import urllib.parse as urlparse

import requests
import urllib.parse as urlParse
from selenium import webdriver
import random

ip_port = '183.164.244.21:10077'
proxies = {
    # 'http': 'http://223.153.84.130:11067',
    # 'http': 'http://116.53.197.218:17731',
    'http': 'http://{}'.format(ip_port),
    'https': 'https://{}'.format(ip_port),
}
ip_config = {
    'ip_config': '{}'.format(ip_port),
}

my_headers = [
    "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:30.0) Gecko/20100101 Firefox/30.0"
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/537.75.14",
    "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Win64; x64; Trident/6.0)"

]
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s',
                    datefmt='%a, %d %b %Y %H:%M:%S', )
'''
搜索条件
案件类型:民事案件,文书类型:判决书,裁判日期:2018-08-08   TO   2018-08-08
案件类型:行政案件,文书类型:裁定书,裁判日期:2018-08-08    TO    2018-08-08
案件类型:赔偿案件,文书类型:调解书,裁判日期:2018-08-08     TO     2018-08-08
裁判日期:2018-08-08 TO 2018-08-10
'''
data_dict = {
    '案件类型:刑事案件': '&conditions=searchWord+1+AJLX++%E6%A1%88%E4%BB%B6%E7%B1%BB%E5%9E%8B:%E5%88%91%E4%BA%8B%E6%A1%88%E4%BB%B6',
    '案件类型:民事案件': '&conditions=searchWord+2+AJLX++%E6%A1%88%E4%BB%B6%E7%B1%BB%E5%9E%8B:%E6%B0%91%E4%BA%8B%E6%A1%88%E4%BB%B6',
    '案件类型:行政案件': '&conditions=searchWord+3+AJLX++%E6%A1%88%E4%BB%B6%E7%B1%BB%E5%9E%8B:%E8%A1%8C%E6%94%BF%E6%A1%88%E4%BB%B6',
    '案件类型:赔偿案件': '&conditions=searchWord+4+AJLX++%E6%A1%88%E4%BB%B6%E7%B1%BB%E5%9E%8B:%E8%B5%94%E5%81%BF%E6%A1%88%E4%BB%B6',
    '案件类型:执行案件': '&conditions=searchWord+5+AJLX++%E6%A1%88%E4%BB%B6%E7%B1%BB%E5%9E%8B:%E6%89%A7%E8%A1%8C%E6%A1%88%E4%BB%B6',

    '文书类型:全部': '&conditions=searchWord+all+WSLX++%E6%96%87%E4%B9%A6%E7%B1%BB%E5%9E%8B:%E5%85%A8%E9%83%A8',
    '文书类型:判决书': '&conditions=searchWord+1+WSLX++%E6%96%87%E4%B9%A6%E7%B1%BB%E5%9E%8B:%E5%88%A4%E5%86%B3%E4%B9%A6',
    '文书类型:裁定书': '&conditions=searchWord+2+WSLX++%E6%96%87%E4%B9%A6%E7%B1%BB%E5%9E%8B:%E8%A3%81%E5%AE%9A%E4%B9%A6',
    '文书类型:调解书': '&conditions=searchWord+3+WSLX++%E6%96%87%E4%B9%A6%E7%B1%BB%E5%9E%8B:%E8%B0%83%E8%A7%A3%E4%B9%A6',
    '文书类型:决定书': '&conditions=searchWord+4+WSLX++%E6%96%87%E4%B9%A6%E7%B1%BB%E5%9E%8B:%E5%86%B3%E5%AE%9A%E4%B9%A6',
    '文书类型:通知书': '&conditions=searchWord+5+WSLX++%E6%96%87%E4%B9%A6%E7%B1%BB%E5%9E%8B:%E9%80%9A%E7%9F%A5%E4%B9%A6',
    '文书类型:批复': '&conditions=searchWord+6+WSLX++%E6%96%87%E4%B9%A6%E7%B1%BB%E5%9E%8B:%E6%89%B9%E5%A4%8D',
    '文书类型:答复': '&conditions=searchWord+7+WSLX++%E6%96%87%E4%B9%A6%E7%B1%BB%E5%9E%8B:%E7%AD%94%E5%A4%8D',
    '文书类型:函': '&conditions=searchWord+8+WSLX++%E6%96%87%E4%B9%A6%E7%B1%BB%E5%9E%8B:%E5%87%BD',
    '文书类型:令': '&conditions=searchWord+9+WSLX++%E6%96%87%E4%B9%A6%E7%B1%BB%E5%9E%8B:%E4%BB%A4',
    '文书类型:其他': '&conditions=searchWord+10+WSLX++%E6%96%87%E4%B9%A6%E7%B1%BB%E5%9E%8B:%E5%85%B6%E4%BB%96',

    # &conditions=searchWord+国信信扬律师事务所+LS++律所:国信信扬律师事务所
    '律所': '&conditions=searchWord+{}+LS++%E5%BE%8B%E6%89%80:{}',
    # &conditions=searchWord+冯志成+LAWYER++律师:冯志成
    '律师': '&conditions=searchWord+{}+LAWYER++%E5%BE%8B%E5%B8%88:{}',
    # 裁判日期:2018-08-08 TO 2018-08-10
    '裁判日期': '&conditions=searchWord++CPRQ++%E8%A3%81%E5%88%A4%E6%97%A5%E6%9C%9F:{}%20TO%20{}',

}
'''
	@获取403禁止访问的网页
	'''


def get_randdom_header():
    randdom_header = random.choice(my_headers)
    return randdom_header


def post_get_vjkl5(guid, AJLX=None, WSLX=None, CPRQ='2018-08-16'):
    # http://wenshu.court.gov.cn/list/list/?sorttype=1&number=&guid=4e1ea9ed-1930-cae981f3-368067fde505&conditions=searchWord++CPRQ++裁判日期:2018-08-04   TO   2018-08-04
    # res = requests.post(
    #     "http://wenshu.court.gov.cn/list/list/?sorttype=1&number=&guid=4e1ea9ed-1930-cae981f3-368067fde505&conditions=searchWord++CPRQ++裁判日期:2018-08-04   TO   2018-08-04",
    #     headers=headers)
    # print(res.text)
    # print(res.cookies)

    conditon = "&conditions=searchWord++CPRQ++%E8%A3%81%E5%88%A4%E6%97%A5%E6%9C%9F:{}%20TO%20{}"
    # conditons = "&conditions=searchWord++CPRQ++%E8%A3%81%E5%88%A4%E6%97%A5%E6%9C%9F:{}%20TO%20{}".format(CPRQ, CPRQ)
    headers = {'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
               'Accept-Encoding': 'gzip, deflate',
               'Accept-Language': 'zh-CN,zh;q=0.9',
               'Connection': 'keep-alive',
               'Cache-Control': 'max-age=0',
               'Host': 'wenshu.court.gov.cn',
               'Upgrade-Insecure-Requests': '1',
               # 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36',
               'User-Agent': get_randdom_header(),
               }
    payload = {"guid": guid, "sorttype": 1, "number": "",
               "conditions": 'searchWord  CPRQ  裁判日期:{} TO {}'.format(CPRQ, CPRQ)}  # 先写死
    res = requests.post(
        url="http://wenshu.court.gov.cn/list/list/?sorttype=1&number=&guid=" + guid + conditon.format(CPRQ, CPRQ),
        # url="http://www.sohu.com/",
        headers=headers,
        proxies=proxies,
        data=payload,
    )
    print("http://wenshu.court.gov.cn/list/list/?sorttype=1&number=&guid=" + guid + conditon.format(CPRQ, CPRQ))
    # print(res.text)
    logging.info(res.cookies)
    return res.cookies.get("vjkl5")


'''
去获取请求number参数
'''


def post_get_number(guid, vjkl5, AJLX=None, WSLX=None, CPRQ=None, LS=None, LAWYER=None, cookies={}):
    condition = "";
    if AJLX is not None:
        condition += data_dict.get(AJLX)
    if WSLX is not None:
        condition += data_dict.get(WSLX)
    if CPRQ is not None:
        condition += data_dict.get('裁判日期').format(CPRQ, CPRQ)
    if LS is not None:
        ls = urlparse.quote(LS)
        condition += data_dict.get("律所").format(ls, ls)
    if LAWYER is not None:
        lawyer = urlParse.quote(LAWYER)
        condition += data_dict.get("律师").format(lawyer, lawyer)
    head_cookie = ""
    for key, value in cookies.items():
        head_cookie += key + "=" + value + "; ";
    payload = {"guid": guid, }
    headers = {'Accept': '*/*',
               'Accept-Encoding': 'gzip, deflate',
               'Accept-Language': 'zh-CN,zh;q=0.9',
               'Connection': 'keep-alive',
               'Content-Length': '40',
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
               # 'Cookie': 'Hm_lvt_d2caefee2de09b8a6ea438d74fd98db2=1534386180; _gscu_2116842793=3430082807nzm686; _gscbrs_2116842793=1; _gscs_2116842793=343008280aveh586|pv:2; Hm_lpvt_d2caefee2de09b8a6ea438d74fd98db2=1534386180; vjkl5=' + vjkl5,
               'Cookie': head_cookie + 'vjkl5=' + vjkl5,
               'Host': 'wenshu.court.gov.cn',
               'Origin': 'http://wenshu.court.gov.cn',
               'Referer': 'http://wenshu.court.gov.cn/list/list/?sorttype=1&number=&guid=' + guid + condition,
               # 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 UBrowser/6.0.1471.813 Safari/537.36',
               'User-Agent': get_randdom_header(),
               'X-Requested-With': 'XMLHttpRequest',
               }
    logging.info(payload)
    logging.info(headers)
    d = requests.post(url='http://wenshu.court.gov.cn/ValiCode/GetCode', data=payload, headers=headers, proxies=proxies)
    return d.text


'''
去获取内容
'''


def post_list_context(guid, vjkl5, vl5x, number, AJLX=None, WSLX=None, CPRQ=None, LS=None, LAWYER=None, Index=1, Page=5,
                      cookies={}):
    sep = ","
    param = {'Param': ''}
    condition = "";
    if AJLX is not None:
        condition += data_dict.get(AJLX)
        param['Param'] = param['Param'] + AJLX + sep
    if WSLX is not None:
        condition += data_dict.get(WSLX)
        param['Param'] = param['Param'] + WSLX + sep
    if CPRQ is not None:
        condition += data_dict.get('裁判日期').format(CPRQ, CPRQ)
        param['Param'] = param['Param'] + '裁判日期:{} TO {}'.format(CPRQ, CPRQ) + sep
    if LS is not None:
        ls = urlParse.quote(LS)
        condition += data_dict.get("律所").format(ls, ls)
        param['Param'] = param['Param'] + '律所:{}'.format(LS) + sep
    if LAWYER is not None:
        lawyer = urlParse.quote(LAWYER)
        condition += data_dict.get("律师").format(lawyer, lawyer)
        param['Param'] = param['Param'] + '律师:{}'.format(LAWYER) + sep
    head_cookie = ""
    for key, value in cookies.items():
        head_cookie += key + "=" + value + "; ";

    param['Param'] = param['Param'][:-1]  # 去除最后一个逗号sep
    payload = {'Param': param['Param'],
               'Index': Index,
               'Page': 5,
               'Order': '法院层级',
               'Direction': 'asc',
               'vl5x': vl5x,
               'number': number,
               'guid': guid,
               }
    headers = {'Accept': '*/*',
               'Accept-Encoding': 'gzip, deflate',
               'Accept-Language': 'zh-CN,zh;q=0.9',
               'Connection': 'keep-alive',
               # 'Content-Length': '5000',
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
               # 'Cookie': 'Hm_lvt_d2caefee2de09b8a6ea438d74fd98db2=1534386180; _gscu_2116842793=3430082807nzm686; _gscbrs_2116842793=1; _gscs_2116842793=343008280aveh586|pv:2; Hm_lpvt_d2caefee2de09b8a6ea438d74fd98db2=1534386180; vjkl5=' + vjkl5,
               'Cookie': head_cookie + 'vjkl5=' + vjkl5,
               'Host': 'wenshu.court.gov.cn',
               'Origin': 'http://wenshu.court.gov.cn',
               'Referer': 'http://wenshu.court.gov.cn/list/list/?sorttype=1&number=&guid=' + guid + condition,
               'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 UBrowser/6.0.1471.813 Safari/537.36',
               'X-Requested-With': 'XMLHttpRequest',
               }
    logging.info(payload)
    logging.info(headers)
    d = requests.post(url='http://wenshu.court.gov.cn/List/ListContent', data=payload, headers=headers, proxies=proxies)
    logging.info(d.json())
    return d.json()
