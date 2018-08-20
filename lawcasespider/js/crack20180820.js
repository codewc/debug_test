var str = 'D9D4E7F3DBE8894C19D617420CA337191FD68CFFE9DB6DD82D857010709EA26DE0772E19137A356A439AD313F91E586208E38FBC939BBC0F684E0BBD49C8844BAF946B20962328010DFD492AEC9A84F0F7184D7294C0743CE65A6F0C33C6B6715463B2839E1649CF4B91B334304155C7';

function unzip(b64Data) {
    var strData;
    // if (!window.atob) {
    //     //	strData	= $.base64.atob(b64Data)
    // } else {
    //     //	strData = atob(b64Data)
    // }
    var charData;
    if (!Array.prototype.map) {
        //  charData =iemap( strData.split(''),function (x) { return x.charCodeAt(0); },null);
    } else {
        //	charData = strData.split('').map(function (x) { return x.charCodeAt(0); });
    }
    strData = Base64_Zip.btou(RawDeflate.inflate(Base64_Zip.fromBase64(b64Data)));
    alert(Base64_Zip.fromBase64(b64Data))
    alert(RawDeflate.inflate(Base64_Zip.fromBase64(b64Data)))
    // var binData = new Uint8Array(charData);
    //  var data = pako.inflate(binData);
    //  strData = String.fromCharCode.apply(null, new Uint16Array(data));
    alert(strData)
    return strData;
}

var test_unzip = unzip;