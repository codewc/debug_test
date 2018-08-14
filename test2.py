import urllib.request
import re
import http.cookiejar
import execjs
# pip install PyExecJS
import uuid

# 随机生成guid
guid = uuid.uuid4()
print("guid:" + str(guid))
fh = open("./base64.js", "r")
js1 = fh.read()
fh.close()
fh = open("./md5.js", "r")
js2 = fh.read()
fh.close()
fh = open("./getkey.js", "r")
js3 = fh.read()
fh.close()
# 将完整js代码都加载进来
js_all = js1 + js2 + js3
# 在生成的CookieJar添加到opner中
cjar = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cjar))
# Referer常用于反爬，指来源网址
opener.addheaders=[("Referer","http://wenshu.court.gov.cn/list/list/?sorttype=1&conditions=searchWord+1+AJLX++%E6%A1%88%E4%BB%B6%E7%B1%BB%E5%9E%8B:%E5%88%91%E4%BA%8B%E6%A1%88%E4%BB%B6&conditions=searchWord+2018+++%E8%A3%81%E5%88%A4%E5%B9%B4%E4%BB%BD:2018&conditions=searchWord+%E4%B8%8A%E6%B5%B7%E5%B8%82+++%E6%B3%95%E9%99%A2%E5%9C%B0%E5%9F%9F:%E4%B8%8A%E6%B5%B7%E5%B8%82urllib.request.install_opener(opener)#用户代理池import")]
randomuapools=[ "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.22 Safari/537.36 SE 2.X MetaSr 1.0", "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Maxthon 2.0)",]
#访问首页
urllib.request.urlopen("0):" rel="nofollow" target="_blank">http://wenshu.court.gov.cn/list/list/?sorttype=1&conditions=searchWord+1+AJLX++%E6%A1%88%E4%BB%B6%E7%B1%BB%E5%9E%8B:%E5%88%91%E4%BA%8B%E6%A1%88%E4%BB%B6&conditions=searchWord+2018+++%E8%A3%81%E5%88%A4%E5%B9%B4%E4%BB%BD:2018&conditions=searchWord+%E4%B8%8A%E6%B5%B7%E5%B8%82+++%E6%B3%95%E9%99%A2%E5%9C%B0%E5%9F%9F:%E4%B8%8A%E6%B5%B7%E5%B8%82.read().decode("utf-8","ignore#将Cookie中的vjkl5字段提取出来pat="vjkl5=(.*?)s"vjkl5=re.compile(pat,re.S).findall(str(cjar))if(len(vjkl5)>0):") vjkl5=vjkl5[0]else: vjkl5=0print("vjkl5:"+str(vjkl5))#将js代码中的旧Cookie的值替换为新的vjkl5的值js_all=js_all.replace("ce7c8849dffea151c0179187f85efc9751115a7b",str(vjkl5))#使用python执行js代码，请提前安装好对应模块（在命令行中执行pip install pyexejs）compile_js=execjs.compile(js_all)#获得vl5x字段值vl5x=compile_js.call("getKey")print("vl5x:"+str(vl5x))url="http://wenshu.court.gov.cn/List/ListContent#for循环，切换第1页到10页for" i in range(0,10):try: #从GetCode中获取number字段值 codeurl="http://wenshu.court.gov.cn/ValiCode/GetCode" #上面提到，GetCode中，只要guid一个字段，将其获取到 codedata=urllib.parse.urlencode({ "guid":guid, }).encode('utf-8') codereq = urllib.request.Request(codeurl,codedata) codereq.add_header('User-Agent',random.choice(uapools)) codedata=urllib.request.urlopen(codereq).read().decode("utf-8","ignore") #print(codedata) #构造请求的参数 postdata =urllib.parse.urlencode({ "Param":"案件类型:刑事案件,裁判年份:2018,法院地域:上海市", "Index":str(i+1), "Page":"20", "Order":"法院层级", "Direction":"asc", "number":str(codedata), "guid":guid, "vl5x":vl5x, }).encode('utf-8')
#直接发送POST请求
req = urllib.request.Request(url,postdata)
req.add_header('User-Agent',random.choice(uapools))
# #获得ListContent中的文书ID值
data=urllib.request.url
open(req).read().decode("utf-8","ignore")
pat='文书ID.?".?"(.*?)."' allid=re.compile(pat).findall(data) print(allid) except Exception as err: print(err)
