import logging
import random
import urllib.parse as urlParse
import urllib.parse as urlparse
import json
import requests

from ip_tools import get_ip

global proxies
global ip_config
proxies = {}
my_headers = [
    "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:30.0) Gecko/20100101 Firefox/30.0"
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/537.75.14",
    "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Win64; x64; Trident/6.0)"

]
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s',
                    datefmt='%a, %d %b %Y %H:%M:%S', filemode='a')
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


def init_randdom_ip_port():
    ip_port = get_ip()
    logging.info("change ip_port=>" + ip_port)
    global proxies
    proxies = {
        'http': 'http://{}'.format(ip_port),
        'https': 'https://{}'.format(ip_port),
    }
    global ip_config
    ip_config = {
        'ip_config': '{}'.format(ip_port),
    }


# FIXME:
# init_randdom_ip_port()


def get_randdom_header():
    randdom_header = random.choice(my_headers)
    return randdom_header


def post_get_vjkl5(guid, AJLX=None, WSLX=None, CPRQ='2018-08-16'):
    conditon = "&conditions=searchWord++CPRQ++%E8%A3%81%E5%88%A4%E6%97%A5%E6%9C%9F:{}%20TO%20{}"
    # conditons = "&conditions=searchWord++CPRQ++%E8%A3%81%E5%88%A4%E6%97%A5%E6%9C%9F:{}%20TO%20{}".format(CPRQ, CPRQ)
    headers = {'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
               'Accept-Encoding': 'gzip, deflate',
               'Accept-Language': 'zh-CN,zh;q=0.9',
               'Connection': 'keep-alive',
               'Cache-Control': 'max-age=0',
               'Host': 'wenshu.court.gov.cn',
               'Upgrade-Insecure-Requests': '1',
               'User-Agent': get_randdom_header(),
               }
    payload = {"guid": guid,
               "sorttype": 1,
               "number": "",
               # "conditions": 'searchWord  CPRQ  裁判日期:{} TO {}'.format(CPRQ, CPRQ)
               "conditions": 'searchWord 1 AJLX  案件类型:刑事案件',
               "conditions": 'searchWord 1 WSLX  文书类型:判决书',
               }  # 先写死
    res = requests.post(
        url="http://wenshu.court.gov.cn/list/list/?sorttype=1&number=&guid=" + guid + conditon.format(CPRQ, CPRQ),
        headers=headers,
        proxies=proxies,
        data=payload,
        timeout=30,
    )
    print("http://wenshu.court.gov.cn/list/list/?sorttype=1&number=&guid=" + guid + conditon.format(CPRQ, CPRQ))
    # print(res.text)
    logging.info(res.cookies)
    return res.cookies.get("vjkl5")


def post_get_vjkl5_url(guid, proxies={}, url=""):
    headers = {'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
               'Accept-Encoding': 'gzip, deflate',
               'Accept-Language': 'zh-CN,zh;q=0.9',
               'Connection': 'keep-alive',
               'Cache-Control': 'max-age=0',
               'Host': 'wenshu.court.gov.cn',
               'Upgrade-Insecure-Requests': '1',
               'User-Agent': get_randdom_header(),
               }
    payload = {"guid": "",
               "sorttype": 1,
               "number": "",
               "conditions": 'searchWord 2 AJLX  案件类型:民事案件',
               # "conditions": 'searchWord  CPRQ  裁判日期:2018-09-01  TO  2018-09-01',
               # "conditions": 'searchWord 与公司、证券、保险、票据等有关的民事纠纷   二级案由:与公司、证券、保险、票据等有关的民事纠纷',
               # "conditions": 'searchWord 2 AJLX  案件类型:民事案件',
               # "conditions": 'searchWord 保险人代位求偿权纠纷   五级案由: 保险人代位求偿权纠纷',
               }  # 先写死
    res = requests.post(
        url=url,
        headers=headers,
        proxies=proxies,
        data=payload,
        timeout=30,
    )
    print(url)
    # print(res.text)
    logging.info(res.cookies)
    return res.cookies.get("vjkl5")


def post_get_number(guid, vjkl5, AJLX=None, WSLX=None, CPRQ=None, LS=None, LAWYER=None, cookies={}):
    """
    去获取请求number参数
    :param guid:
    :param vjkl5:
    :param AJLX:
    :param WSLX:
    :param CPRQ:
    :param LS:
    :param LAWYER:
    :param cookies:
    :return:
    """
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
               'Cookie': head_cookie + 'vjkl5=' + vjkl5,
               'Host': 'wenshu.court.gov.cn',
               'Origin': 'http://wenshu.court.gov.cn',
               'Referer': 'http://wenshu.court.gov.cn/list/list/?sorttype=1&number=&guid=' + guid + condition,
               'User-Agent': get_randdom_header(),
               'X-Requested-With': 'XMLHttpRequest',
               }
    logging.info(payload)
    logging.info(headers)
    d = requests.post(url='http://wenshu.court.gov.cn/ValiCode/GetCode', data=payload, headers=headers, proxies=proxies,
                      timeout=15)
    logging.info("number=" + d.text)
    return d.text


def post_get_number(guid, vjkl5, referer):
    payload = {"guid": guid, }
    headers = {'Accept': '*/*',
               'Accept-Encoding': 'gzip, deflate',
               'Accept-Language': 'zh-CN,zh;q=0.9',
               'Connection': 'keep-alive',
               'Content-Length': '40',
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
               'Cookie': 'vjkl5=' + vjkl5,
               'Host': 'wenshu.court.gov.cn',
               'Origin': 'http://wenshu.court.gov.cn',
               'Referer': referer,
               'User-Agent': get_randdom_header(),
               'X-Requested-With': 'XMLHttpRequest',
               }
    logging.info(payload)
    logging.info(headers)
    d = requests.post(url='http://wenshu.court.gov.cn/ValiCode/GetCode', data=payload, headers=headers, proxies=proxies,
                      timeout=15)
    logging.info("number=" + d.text)
    return d.text


def post_list_context(guid, vjkl5, vl5x, number, AJLX=None, WSLX=None, CPRQ=None, LS=None, LAWYER=None, Index=1,
                      page=20,
                      cookies={}):
    """
    去获取内容
    :param guid:
    :param vjkl5:
    :param vl5x:
    :param number:
    :param AJLX:
    :param WSLX:
    :param CPRQ:
    :param LS:
    :param LAWYER:
    :param Index:
    :param page:
    :param cookies:
    :return:
    """
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
               'Page': page,
               'Order': '裁判日期',
               'Direction': 'desc',
               'vl5x': vl5x,
               'number': number,
               'guid': guid,
               }
    headers = {'Accept': '*/*',
               'Accept-Encoding': 'gzip, deflate',
               'Accept-Language': 'zh-CN,zh;q=0.9',
               'Connection': 'keep-alive',
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
               'Cookie': head_cookie + 'vjkl5=' + vjkl5,
               'Host': 'wenshu.court.gov.cn',
               'Origin': 'http://wenshu.court.gov.cn',
               'Referer': 'http://wenshu.court.gov.cn/list/list/?sorttype=1&number=&guid=' + guid + condition,
               'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 UBrowser/6.0.1471.813 Safari/537.36',
               'X-Requested-With': 'XMLHttpRequest',
               }
    logging.info(payload)
    logging.info(headers)
    ret = requests.post(url='http://wenshu.court.gov.cn/List/ListContent', data=payload, headers=headers,
                        proxies=proxies,
                        timeout=30)
    logging.info(ret.json())
    ret.close()
    return ret.json()


def post_list_context_by_param(guid, vjkl5, vl5x, number, param, index=1, page=20, cookies={}, _proxies={}):
    payload = {'Param': param,
               'Index': index,
               'Page': page,
               'Order': '裁判日期',
               'Direction': 'desc',
               'vl5x': vl5x,
               'number': number,
               'guid': guid,
               }
    headers = {'Accept': '*/*',
               'Accept-Encoding': 'gzip, deflate',
               'Accept-Language': 'zh-CN,zh;q=0.9',
               'Connection': 'keep-alive',
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
               'Cookie': 'vjkl5=' + vjkl5,
               'Host': 'wenshu.court.gov.cn',
               'Origin': 'http://wenshu.court.gov.cn',
               'Referer': 'http://wenshu.court.gov.cn/list/list/?sorttype=1&number=&guid=' + guid,
               'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 UBrowser/6.0.1471.813 Safari/537.36',
               'X-Requested-With': 'XMLHttpRequest',
               }
    logging.info(payload)
    logging.info(headers)
    ret = requests.post(url='http://wenshu.court.gov.cn/List/ListContent', data=payload, headers=headers,
                        proxies=_proxies,
                        timeout=30)
    logging.info(ret.json())
    ret.close()
    return ret.json()


def list_tree_content(param, vl5x, guid, number, vjkl5):
    """
    获取目录树
    :return:
    """
    payload = {'Param': param,
               'vl5x': vl5x,
               'guid': guid,
               'number': number,
               }
    headers = {'Accept': '*/*',
               'Accept-Encoding': 'gzip, deflate',
               'Accept-Language': 'zh-CN,zh;q=0.9',
               'Connection': 'keep-alive',
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
               'Host': 'wenshu.court.gov.cn',
               'Origin': 'http://wenshu.court.gov.cn',
               'Cookie': 'vjkl5=' + vjkl5,
               'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 UBrowser/6.0.1471.813 Safari/537.36',
               'X-Requested-With': 'XMLHttpRequest',
               }
    logging.info(payload)
    logging.info(headers)
    ret = requests.post(url='http://wenshu.court.gov.cn/List/TreeContent', data=payload, headers=headers,
                        proxies=proxies,
                        timeout=30)
    json_text = ret.json()
    ret.close()
    logging.info(json_text)
    return json_text


def proceed_tree_context(condition="裁判日期:2018-09-01 TO 2018-09-01", ret_context=[], level=None, level_name=None):
    """
    生成当日，条件，获取搜索条件任务。再进行抓取
    :param condition: 大类业务条件：当天日期截取
    :param level: 案由级别
    :param level_name  案由名字
    :return: ret_context 保存搜索算法容器
    """
    param = "{},{}:{}".format(condition, level, level_name)
    payload = {'Param': param,
               'parval': level_name,
               }
    headers = {'Accept': '*/*',
               'Accept-Encoding': 'gzip, deflate',
               'Accept-Language': 'zh-CN,zh;q=0.9',
               'Connection': 'keep-alive',
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
               'Host': 'wenshu.court.gov.cn',
               'Origin': 'http://wenshu.court.gov.cn',
               'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 UBrowser/6.0.1471.813 Safari/537.36',
               'X-Requested-With': 'XMLHttpRequest',
               }
    logging.info(payload)
    logging.info(headers)
    ret = requests.post(url='http://wenshu.court.gov.cn/List/ReasonTreeContent', data=payload, headers=headers,
                        proxies=proxies,
                        timeout=30)
    json_text = ret.json()
    logging.info(json_text)
    json_var = json.loads(json_text)
    count = int(json_var[0].get("IntValue"))
    if count <= 0:
        logging.info("{} 条件舍弃未有文书".format(param))
    elif count <= 200:
        ret_context.append({param: count})  # 统计算法数，理论存在文档数
    else:
        for it in json_var[0].get("Child"):
            sub_condition = it.get("Key")
            int_value = it.get("IntValue")
            field = it.get("Field")
            if sub_condition == "" or int_value == 0:
                continue
            if int_value <= 200 or field == "五级案由":
                ret_context.append({"{},{}:{}".format(condition, field, constant): int_value})
            else:
                proceed_tree_context(condition, ret_context, field, sub_condition)


def proceed_court_tree_context(condition="裁判日期:2018-09-01 TO 2018-09-01", field="", key="", ret_context=[]):
    """
       按地域及法院筛选，获取搜索条件任务。再进行抓取
       :param condition: 大类业务条件：当天日期截取
       :param append_condition: 增加条件
       :return: ret_context 保存搜索算法容器
       """
    param = "{},{}:{}".format(condition, field, key)
    json_text = post_court_tree_context(param, key)
    logging.info(json_text)
    try:
        json_var = json.loads(json_text)
    except Exception:
        logging.error(json_text)
        ret_context.append({"{},{}:{}".format(condition, field, key): 0})
        return

    count = int(json_var[0].get("IntValue"))
    if count <= 0:
        logging.info("{} 条件舍弃未有文书".format(param))
    elif count <= 200:
        ret_context.append({param: count})  # 统计算法数，理论存在文档数
    else:
        for it in json_var[0].get("Child"):
            _key = it.get("Key")
            _int_value = it.get("IntValue")
            _field = it.get("Field")
            if _key == "" or _int_value == 0:
                continue
            if _int_value <= 200 or _field == "基层法院":
                ret_context.append({"{},{}:{}".format(condition, _field, _key): _int_value})
                continue
            else:
                proceed_court_tree_context(condition, _field, _key, ret_context)


def post_court_tree_context(param, key, retry=6):
    payload = {'Param': param,
               'parval': key,
               }
    headers = {'Accept': '*/*',
               'Accept-Encoding': 'gzip, deflate',
               'Accept-Language': 'zh-CN,zh;q=0.9',
               'Connection': 'keep-alive',
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
               'Host': 'wenshu.court.gov.cn',
               'Origin': 'http://wenshu.court.gov.cn',
               'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 UBrowser/6.0.1471.813 Safari/537.36',
               'X-Requested-With': 'XMLHttpRequest',
               }
    logging.info(payload)
    logging.info(headers)
    success = False
    count = 0
    json_text = ""
    while not success:
        if count >= retry:
            return json_text

        count += 1
        ret = requests.post(url='http://wenshu.court.gov.cn/List/CourtTreeContent', data=payload, headers=headers,
                            proxies=proxies,
                            timeout=30)
        json_text = ret.json()
        ret.close()
        if "Key" in json_text:
            success = True
        else:
            logging.warning("重试->" + str(count) + str(payload))
    return json_text


if __name__ == "__main__":
    condition_constant = {
        '刑事案由',
        '民事案由',
        '行政案由',
        '赔偿案由',
    }
    ret_context = []
    condition = "裁判日期:2018-09-01 TO 2018-09-01"
    logging.info("开始生成：->搜索条件；condition={}".format(condition))
    for constant in condition_constant:  # 一级案由
        proceed_tree_context(condition, ret_context, "一级案由", constant)
    logging.info("条件算法树生成完毕：->" + str(ret_context))
