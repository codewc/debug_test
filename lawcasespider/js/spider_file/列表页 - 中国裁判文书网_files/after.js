// var com = {};
// com.str = {
//     _KEY: "12345678900000001234567890000000",//32λ
//     _IV: "abcd134556abcedf",//16λ
//     Encrypt: function (str) {
//         var key = CryptoJS.enc.Utf8.parse(this._KEY);
//         var iv = CryptoJS.enc.Utf8.parse(this._IV);
//         var encrypted = '';
//         var srcs = CryptoJS.enc.Utf8.parse(str);
//         encrypted = CryptoJS.AES.encrypt(srcs, key, {
//             iv: iv,
//             mode: CryptoJS.mode.CBC,
//             padding: CryptoJS.pad.Pkcs7
//         });
//
//         return encrypted.ciphertext.toString();
//     },
//     Decrypt: function (str) {
//         var result = com.str.DecryptInner(str);
//         try {
//             var newstr = com.str.DecryptInner(result);
//             if (newstr != "") {
//                 result = newstr;
//             }
//         } catch (ex) {
//             var msg = ex;
//         }
//         return result;
//     },
//     DecryptInner: function (str) {
//         var key = CryptoJS.enc.Utf8.parse(this._KEY);
//         var iv = CryptoJS.enc.Utf8.parse(this._IV);
//         var encryptedHexStr = CryptoJS.enc.Hex.parse(str);
//         var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
//         var decrypt = CryptoJS.AES.decrypt(srcs, key, {
//             iv: iv,
//             mode: CryptoJS.mode.CBC,
//             padding: CryptoJS.pad.Pkcs7
//         });
//         var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
//         var result = decryptedStr.toString();
//         try {
//             result = Decrypt(result);
//         } catch (ex) {
//             var msg = ex;
//         }
//         return result;
//     }
// }

// 增加7道爬虫防御 段智峰 20180807
// 破解
function doc_id_helper(id, key) {
    var unzipid = unzip(id);
    com.str._KEY = key;
    var realid = com.str.Decrypt(unzipid);
    console.info(realid)
    console.info(typeof realid)
    document.getElementById("doc_id_result").innerText = realid.toString();
    return realid;
}

doc_id_helper('DcKNwrkNw4BACMOAVsOiwocrecO3Hykpw5xYwrLCnMOEU3vCtCQAeSUjwrZqw4syVg3CmsKUXFkCwq9NYsK0NlAgaMKOw5DCmcKrLMOFZsO3QAYMw6rCicOKwoVqI1oEw5VrNDLChBBSw6jCiMOYBsKnw58cNWYQX1TDscKRwqfDqMODw5jCkGDClwfCv2HDr3nDjgjDq8Ovw593w7/CqR3Dr8KPbMOzwr4Lw4BIw6jCl0hOw4HDtS/DlWDDuwBhYsOOTz8=', '3b79f9d87c6e450b98cfc1a4494a86d7')