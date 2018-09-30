# coding =utf8
import execjs
from tools import wen_shu_js
import tools
import remote_post_util


def post_test(param):
    guid = execjs.compile(wen_shu_js).call('guid')
    referer = "http://wenshu.court.gov.cn/list/list/?sorttype=1&number=&guid=&conditions=searchWord+2+AJLX++%E6%A1%88%E4%BB%B6%E7%B1%BB%E5%9E%8B:%E6%B0%91%E4%BA%8B%E6%A1%88%E4%BB%B6&"
    vjkl5 = remote_post_util.post_get_vjkl5_url(guid, url=referer)
    vl5x = execjs.compile(wen_shu_js).call('getkey', vjkl5)
    number = 'wens'  # remote_post_util.post_get_number(guid, vjkl5, referer)
    json_text = remote_post_util.post_list_context_by_param(guid, vjkl5, vl5x, number, param, page=6)
    print(json_text)


def init_court_tree(condition):
    ret = tools.init_court_tree(condition)
    first_count = ret[0]
    list()
    for it in ret[1:]:
        print(it)


if __name__ == "__main__":
    # post_test("裁判日期:2018-08-09 TO 2018-08-09,基层法院:北京市石景山区人民法院")
    init_court_tree(condition="裁判日期:2018-08-09 TO 2018-08-09")
