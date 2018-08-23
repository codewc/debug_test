# -*- mode: python -*-

block_cipher = None


added_files = [
         ('C:\\Users\\Administrator\\PycharmProjects\\debug_test\\lawcasespider\\js\\*.js', '.' ),
         ('C:\\Users\\Administrator\\PycharmProjects\\debug_test\\lawcasespider\\js\\*.html', '.' ),
         ('C:\\Users\\Administrator\\PycharmProjects\\debug_test\\lawcasespider\\js\\*.exe', '.' ),
         ]
a = Analysis(['tools.py'],
             pathex=['C:\\Users\\Administrator\\PycharmProjects\\debug_test\\lawcasespider\\js'],
             binaries=[],
             datas=added_files,
             hiddenimports=[],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          exclude_binaries=True,
          name='tools',
          debug=False,
          strip=False,
          upx=True,
          console=True )
coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas,
               strip=False,
               upx=True,
               name='tools')
