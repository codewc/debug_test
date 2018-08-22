var unzip_helper = function unzip_helper(b64Data) {
    var strData;
    strData = unzip(b64Data)
    var strs = strData.split(';')
    str_length = strs.length
    result = ""
    for (i = 0; i < str_length; i++) {
        myjs = strs[i];
        if (myjs == "") {
            continue;
        }
        myjs = myjs.replace("()", "")
        console.info(i + "myjs=" + myjs)
        result = eval(myjs)
    }
    console.info(result.toString())
    res = result.toString().split('"')
    console.info(res[1])
    document.getElementById("doc_key").innerText = res[1];
    return res[1];
};

var unzip = function (b64Data) {
    var charData;
    if (!Array.prototype.map) {
        //  charData =iemap( strData.split(''),function (x) { return x.charCodeAt(0); },null);
    } else {
        //	charData = strData.split('').map(function (x) { return x.charCodeAt(0); });
    }
    strData = Base64_Zip.btou(RawDeflate.inflate(Base64_Zip.fromBase64(b64Data)));
    return strData;
};