from selenium import webdriver


# 解密doc用到的key值
def unzip_helper(b64Data):
    browser = webdriver.PhantomJS()
    browser.get("file:///C:/Users/Administrator/PycharmProjects/debug_test/lawcasespider/js/helper.html")
    try:
        browser.execute_script('unzip_helper("' + b64Data + '")')
    except  Exception as e:
        pass
    finally:
        ret = browser.find_element_by_id("doc_key").text;
        browser.close()
    return ret


# 解密doc_id密文
def doc_id_helper(id, key):
    browser = webdriver.PhantomJS()
    browser.get(
        "file:///C:/Users/Administrator/Desktop/%E5%88%97%E8%A1%A8%E9%A1%B5%20-%20%E4%B8%AD%E5%9B%BD%E8%A3%81%E5%88%A4%E6%96%87%E4%B9%A6%E7%BD%91.html")
    try:
        browser.execute_script('doc_id_helper("' + id + '","' + key + '")')
    except  Exception as e:
        pass
    finally:
        ret = browser.find_element_by_id("doc_id_result").text;
        browser.close()
    return ret
