from selenium import webdriver


# 解密doc用到的key值
def unzip_helper(b64Data):
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument("window-size=1024,768")
    chrome_options.add_argument("--no-sandbox")
    browser = webdriver.Chrome(chrome_options=chrome_options)
    # windows
    browser.get("file:///C:/Users/Administrator/PycharmProjects/debug_test/lawcasespider/js/helper.html")
    # linux
    # browser.get("file:////usr/local/wangchun/debug_test/lawcasespider/js/helper.html")
    try:
        browser.execute_script('unzip_helper("' + b64Data + '")')
    except  Exception as e:
        pass
    finally:
        ret = browser.find_element_by_id("doc_key").text;
        browser.quit()
    return ret


# 解密doc_id密文
def doc_id_helper(id, key):
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument("window-size=1024,768")
    chrome_options.add_argument("--no-sandbox")
    browser = webdriver.Chrome(chrome_options=chrome_options)
    # windows
    browser.get(
        "file:///C:/Users/Administrator/PycharmProjects/debug_test/lawcasespider/js/spider_file/%E5%88%97%E8%A1%A8%E9%A1%B5%20-%20%E4%B8%AD%E5%9B%BD%E8%A3%81%E5%88%A4%E6%96%87%E4%B9%A6%E7%BD%91.html")
    # linux
    # browser.get(
    #     "file:////usr/local/wangchun/debug_test/lawcasespider/js/spider_file/%E5%88%97%E8%A1%A8%E9%A1%B5%20-%20%E4%B8%AD%E5%9B%BD%E8%A3%81%E5%88%A4%E6%96%87%E4%B9%A6%E7%BD%91.html")
    try:
        browser.execute_script('doc_id_helper("' + id + '","' + key + '")')
    except  Exception as e:
        pass
    finally:
        ret = browser.find_element_by_id("doc_id_result").text;
        browser.quit()
    return ret
