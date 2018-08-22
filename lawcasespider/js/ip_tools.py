import json
import requests
import time
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s',
                    datefmt='%a, %d %b %Y %H:%M:%S', filemode='a', )
'''
获取代理ip
'''


def get_ip():
    ret = requests.get(
        'http://api.http.niumoip.com/v1/http/ip/get?p_id=406&s_id=1&u=AWJRM1FiAWQGMwwiUhxValp1DzNVbQsaUAdTVwQC&number=1&port=1&type=1&map=1&pro=0&city=0&pb=1&mr=3&cs=1')
    logging.info(ret.text)
    try:
        dj = json.loads(ret.text)
    except Exception as e:
        time.sleep(60)
    return dj['data'][0].get("ip") + ":" + str(dj['data'][0].get("port"))
