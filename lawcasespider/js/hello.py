import time
import logging
import remote_post_util

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s',
                    datefmt='%a, %d %b %Y %H:%M:%S', )
while True:
    print('hello')
    logging.info('hello')
    logging.info(remote_post_util.my_headers)
    raise Exception("hbaabab")
    time.sleep(10)
