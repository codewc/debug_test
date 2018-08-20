import requests
import json

'''
获取代理ip
'''


def get_ip():
    # ret = requests.get(
    #     'http://api.http.niumoip.com/v1/http/ip/get?p_id=406&s_id=1&u=AWJRM1FiAWQGMwwiUhxValp1DzNVbQsaUAdTVwQC&number=1&port=1&type=1&map=1&pro=0&city=0&pb=1&mr=3&cs=1')
    ret = '{"error_code":0,"error_message":"","data":[{"ip":"117.69.230.196","port":10066}]}'
    print(ret)
    pass

get_ip()