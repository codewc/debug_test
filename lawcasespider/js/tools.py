import execjs

import remote_post_util
import time

execjs.eval("""'red yellow blue'.split(' ')""")
js = '''
var createGuid = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};
var guid = function() {
    return createGuid() + createGuid() + "-" + createGuid() + "-" + createGuid() + createGuid() + "-" + createGuid() + createGuid() + createGuid();
}

'''
guid = execjs.compile(js).call('guid')
print(guid)

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
# WSLX = "文书类型:判决书"
AJLX = "案件类型:民事案件"
WSLX = "文书类型:判决书"
CPRQ = "2018-08-08"

# print(vl5x)
uuid = execjs.compile(wen_shu_js).call('guid')


vjkl5 = remote_post_util.post_get_vjkl5(uuid)
update_vjkl5 = False
i = 1;
while (True):
    if update_vjkl5:
        vjkl5 = remote_post_util.post_get_vjkl5(uuid)
        update_vjkl5 = False
    vl5x = execjs.compile(wen_shu_js).call('getkey', vjkl5)
    uuid = execjs.compile(wen_shu_js).call('guid')
    number = remote_post_util.post_get_number(guid=uuid, vjkl5=vjkl5, AJLX=AJLX, WSLX=WSLX, CPRQ=CPRQ)
    ret = remote_post_util.post_list_context(guid=uuid, vl5x=vl5x, vjkl5=vjkl5, number=number, AJLX=AJLX, WSLX=WSLX,
                                             CPRQ=CPRQ,Index=1)
    if ret != '[check]' and ret != 'remind' and ret != 'remind key':
        break
    if i % 20 == 0:
        update_vjkl5 = True
    time.sleep(10)
