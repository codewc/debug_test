import re

_data = '[{\"RunEval\":\"w61ZS27CgzAQPQtRFsK2wqh6AcKUVcKOw5DDpcOIQhVJGxYNwpVDV1HDrl5MKcOlw6MEKMOYwpjDpEloEMO2fMOewrwxwoMtw5bCh3jCtz9FMsO+TDcvwqnCjMKPw6/Dj28yw7nDmB5ew6U2w5nDrcKZw6/DuSQgwpwWTyABw6IxVsOIPSTDsiDCryvCuhJqCwHDnsOBLATCqgfDhlBcMMKBw7zCkTDCiAEnwqADJMKAHcKkDsKewpAcUkIFIMKwEBwXPAjDgsONKkrCjsKnVH5FaSJXQUjCocOILsOGw7zDs0XCqcKVw5fDucOCw6nDh8KSMiHChMOPwrx8woJTw53Cp8Kaw6jCnsOJH8OXf8O/w6nCicKpw6FMwoM8NUPCgsKyWyNgXcOdKwzCrgdrw6DDlsOqw57DhFTDtcKmHy9Dw6XCqMObFMK1IGhzwrjDocK7BMOZwo/DkcOKYyfDrMKeGkPDlAbDq8O+w49gwoTDlVjDk0nDrMKnc8OSwrHDvsKcwoJpw4LCnTHCn2YdL8OKwrtpwpxFwpPDvG3DucKWw6JOThIbw5h5Z2deUwPDlUDDpsKIfsO1G24LwoHCnTh3X8OUWUtpw6Zlw67DmMOQwpLClcOew6XDhMKGZcK6wojDtsOhGAvDq8O2w7ZoAcKbwrclw4QuADTCv8Owwr1Owo7CrsKxwqQ5I8K2w7LColpTw5PCj1Ydw5LCiFPCrhvCvAHCisOgwowHw58=\",\"Count\":\"152\"}'
a = re.search(r'\d+', _data)
print(_data)
