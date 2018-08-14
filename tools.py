import execjs

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

keyjs = "";
md5 = "";
base64 = ""
with open("tes.js") as f:
    keyjs = f.read()
with open("md5.js") as f:
    md5 = f.read()
with open("base64.js") as f:
    base64 = f.read()
#https://wangye.org/tools/scripts/eval/
execjs.compile(keyjs)
execjs.compile(base64)
de_1 = execjs.compile(md5).call('de_1')
de_2 = execjs.compile(md5).call('de_2')
print(de_1)
print(de_2)