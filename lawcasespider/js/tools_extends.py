from selenium import webdriver
import config


def get_browser():
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument("window-size=1024,768")
    chrome_options.add_argument("--no-sandbox")
    browser = webdriver.Chrome(chrome_options=chrome_options)
    return browser


# 解密doc用到的key值
def unzip_helper(b64Data, browser):
    try:
        browser.get(config.unzip_helper_html)
        browser.execute_script('unzip_helper("' + b64Data + '")')
    except  Exception as e:
        pass
    finally:
        ret = browser.find_element_by_id("doc_key").text
    return ret


# 解密doc_id密文
def doc_id_helper(id, key, browser):
    # windows
    browser.get(config.doc_id_helper_html)
    try:
        browser.execute_script('doc_id_helper("' + id + '","' + key + '")')
    except Exception as e:
        pass
    finally:
        ret = browser.find_element_by_id("doc_id_result").text
    return ret
