/**
 * .....
 */

//接口请求
function ajaxhttp(url, params, token, callback) {
    $('.mengban').show();
    $.ajax({
        type: 'POST',
        url: url,
        timeout: 8000, //超时时间设置，单位毫秒
        async: true,
        beforeSend: function(XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('token', token),
                XMLHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        },
        data: {
            'xykj': params
        }, //参数之间用“,” 逗号隔开。
        error: function() {
            $('.mengban').hide();
        },
        success: function(data, status, xhr) {
            $('.mengban').hide();
            callback(data, status, xhr);
        },
        complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数
            if (status == 'timeout') { //超时,status还有success,error等值的情况　　
                new Toast({
                    context: $('body'),
                    message: '当前业务繁忙,请稍后再试.'
                }).show();
                $('.mengban').hide();
            }
        }
    });
}


/**
 * 根据性别code获取String
 */
function getStringSex(sexcode) {
    if (sexcode == '302001') {
        return '男';
    } else if (sexcode == '302003') {
        return '女';
    } else {
        return '未提供';
    }
}

/**
 * 根据性别String获取Code
 */
function getCodeSex(sexname) {
    if (sexname == '男') {
        return '302001';
    } else if (sexname == '女') {
        return '302003';
    } else {
        return '';
    }
}

/**
 * 根据学位code获取string
 */
function getEducation(educate) {
    var education = '';

    if (educate == '306013') {
        education = '';
    } else if (educate == '306014') {
        education = '';
    } else if (educate == '306015') {
        education = '';
    } else if (educate == '306016') {
        education = '本科';
    } else if (educate == '306017') {
        education = '硕研';
    } else if (educate == '306018') {
        education = '博研';
    } else if (educate == '306019') {
        education = '博士后';
    } else if (educate == '306020') {
        education = '其它';
    }
    return education;
}

/**
 * 根据医生职称code获取string
 */
function getJobTitle(zhichenghao) {
    var jobtitle = '';
    if (zhichenghao == '5252002') {
        jobtitle = '主任医师';
    } else if (zhichenghao == '5252016') {
        jobtitle = '全科主任医师';
    } else if (zhichenghao == '5252001') {
        jobtitle = '住院医师';
    } else if (zhichenghao == '5252008') {
        jobtitle = '全科医生';
    } else if (zhichenghao == '5252012') {
        jobtitle = '副主任医师';
    } else if (zhichenghao == '5252003') {
        jobtitle = '护师';
    } else if (zhichenghao == '5252004') {
        jobtitle = '主治医师';
    } else if (zhichenghao == '5252005') {
        jobtitle = '收费员';
    } else if (zhichenghao == '5252006') {
        jobtitle = '西医士';
    } else if (zhichenghao == '5252007') {
        jobtitle = '医师';
    } else if (zhichenghao == '5252009') {
        jobtitle = '检验师';
    } else if (zhichenghao == '5252010') {
        jobtitle = '药剂师';
    } else if (zhichenghao == '5252011') {
        jobtitle = '药剂士';
    } else if (zhichenghao == '5252013') {
        jobtitle = '主管医师';
    } else if (zhichenghao == '5252015') {
        jobtitle = '主任中医师';
    } else if (zhichenghao == '5252017') {
        jobtitle = '全科副主任';
    } else if (zhichenghao == '5252018') {
        jobtitle = '全科主任';
    } else if (zhichenghao == '5252019') {
        jobtitle = '护士';
    } else if (zhichenghao == '5252020') {
        jobtitle = '助理医师';
    } else if (zhichenghao == '5252021') {
        jobtitle = '医士';
    } else if (zhichenghao == '5252022') {
        jobtitle = '主任护师';
    } else if (zhichenghao == '5252023') {
        jobtitle = '主管护师';
    } else if (zhichenghao == '5252024') {
        jobtitle = '副主任护师';
    } else if (zhichenghao == '5252025') {
        jobtitle = '主任技师';
    } else if (zhichenghao == '5252026') {
        jobtitle = '中医师';
    } else if (zhichenghao == '5252027') {
        jobtitle = '主治中医师';
    } else if (zhichenghao == '5252028') {
        jobtitle = '副主任中医师';
    } else {
        jobtitle = '';
    }
    return jobtitle;
}

//根据时间获取星期
function getWeek(workTime) {
    var week = '';
    switch (new Date(workTime).getDay()) {
        case 0:
            week = '星期日';
            return week;
            break;
        case 1:
            week = '星期一';
            return week;
            break;
        case 2:
            week = '星期二';
            return week;
            break;
        case 3:
            week = '星期三';
            return week;
            break;
        case 4:
            week = '星期四';
            return week;
            break;
        case 5:
            week = '星期五';
            return week;
            break;
        case 6:
            week = '星期六';
            return week;
            break;
        default:
            break;
    }
}

var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子
var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X
function IdCardValidate(idCard) {
    idCard = trim(idCard.replace(/ /g, '')); //去掉字符串头尾空格
    if (idCard.length == 15) {
        return isValidityBrithBy15IdCard(idCard); //进行15位身份证的验证
    } else if (idCard.length == 18) {
        var a_idCard = idCard.split(''); // 得到身份证数组
        if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) { //进行18位身份证的基本验证和第18位的验证
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

/**
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param a_idCard 身份证号码数组
 * @return
 */
function isTrueValidateCodeBy18IdCard(a_idCard) {
    var sum = 0; // 声明加权求和变量
    if (a_idCard[17].toLowerCase() == 'x') {
        a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
    }
    for (var i = 0; i < 17; i++) {
        sum += Wi[i] * a_idCard[i]; // 加权求和
    }
    valCodePosition = sum % 11; // 得到验证码所位置
    if (a_idCard[17] == ValideCode[valCodePosition]) {
        return true;
    } else {
        return false;
    }
}

/**
 * 验证18位数身份证号码中的生日是否是有效生日
 * @param idCard 18位书身份证字符串
 * @return
 */
function isValidityBrithBy18IdCard(idCard18) {
    var year = idCard18.substring(6, 10);
    var month = idCard18.substring(10, 12);
    var day = idCard18.substring(12, 14);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 这里用getFullYear()获取年份，避免千年虫问题
    if (temp_date.getFullYear() != parseFloat(year) ||
        temp_date.getMonth() != parseFloat(month) - 1 ||
        temp_date.getDate() != parseFloat(day)) {
        return false;
    } else {
        return true;
    }
}

/**
 * 验证15位数身份证号码中的生日是否是有效生日
 * @param idCard15 15位书身份证字符串
 * @return
 */
function isValidityBrithBy15IdCard(idCard15) {
    var year = idCard15.substring(6, 8);
    var month = idCard15.substring(8, 10);
    var day = idCard15.substring(10, 12);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
    if (temp_date.getYear() != parseFloat(year) ||
        temp_date.getMonth() != parseFloat(month) - 1 ||
        temp_date.getDate() != parseFloat(day)) {
        return false;
    } else {
        return true;
    }
}

//去掉字符串头尾空格
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
}

/**
 * 根据证件String获取证件code
 */
function getCardTypeCode(cardType) {
    var cardTypeCode = '';
    if (cardType == '居民身份证') {
        cardTypeCode = '5418001';
    } else if (cardType == '港澳台居民身份证') {
        cardTypeCode = '5418002';
    } else if (cardType == '护照') {
        cardTypeCode = '5418004';
    } else if (cardType == '军官证') {
        cardTypeCode = '5418005';
    } else if (cardType == '士兵证') {
        cardTypeCode = '5418007';
    } else if (cardType == '驾驶证') {
        cardTypeCode = '5418008';
    } else if (cardType == '其他') {
        cardTypeCode = '5418009';
    } else if (cardType == '居民身份证*') {
        cardTypeCode = '5418001';
    } else if (cardType == '往来港澳通行证') {
        cardTypeCode = '5418011';
    }
    return cardTypeCode;
}

/**
 * 根据证件code获取证件String
 */
function getCardTypeString(cardType) {
    var cardTypeString = '';
    if (cardType == '5418001') {
        cardTypeString = '居民身份证';
    } else if (cardType == '5418002') {
        cardTypeString = '港澳台居民身份证';
    } else if (cardType == '5418004') {
        cardTypeString = '护照';
    } else if (cardType == '5418005') {
        cardTypeString = '军官证';
    } else if (cardType == '5418007') {
        cardTypeString = '士兵证';
    } else if (cardType == '5418008') {
        cardTypeString = '驾驶证';
    } else if (cardType == '5418009') {
        cardTypeString = '其他';
    } else if (cardType == '5418011') {
        cardTypeString = '往来港澳通行证';
    }
    return cardTypeString;
}

/*根据出生日期算出年龄*/
function jsGetAge(strBirthday) {
    var returnAge;
    var strBirthdayArr = strBirthday.split('-');
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];

    d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    if (nowYear == birthYear) {
        returnAge = 0; //同年 则为0岁
    } else {
        var ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
            if (nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay; //日之差
                if (dayDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            } else {
                var monthDiff = nowMonth - birthMonth; //月之差
                if (monthDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            }
        } else {
            returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
        }
    }

    return returnAge; //返回周岁年龄

}

/**
 * 模仿android里面的Toast效果，主要是用于在不打断程序正常执行的情况下显示提示数据
 * @param config
 * @return
 */
var Toast = function(config) {
    this.context = config.context == null ? $('body') : config.context; //上下文
    this.message = config.message; //显示内容
    this.time = config.time == null ? 3000 : config.time; //持续时间
    this.left = config.left; //距容器左边的距离
    this.top = config.top; //距容器上方的距离
    this.init();
};
var msgEntity;
Toast.prototype = {
    //初始化显示的位置内容等
    init: function() {
        $('#toastMessage').remove();
        //设置消息体
        var msgDIV = new Array();
        msgDIV.push('<div id="toastMessage" style="width:10rem;text-align: center;margin: 0px auto;" >');
        msgDIV.push('<div style="font-size: 0.346rem;background: #6B6B6B;color:#FFFFFF;padding-left:0.6rem;padding-right:0.6rem;padding-top:0.266rem;padding-bottom:0.266rem;border-radius: 0.133rem;word-wrap:break-word;">' + this.message + '</div>');
        msgDIV.push('</div>');
        msgEntity = $(msgDIV.join('')).appendTo(this.context);
        //设置消息样式
        var left = '0.5rem';
        var bottom = this.bottom == null ? '40px' : this.bottom;
        msgEntity.css({ position: 'absolute', bottom: bottom, 'z-index': '99' });
        msgEntity.hide();
    },
    //显示动画
    show: function() {
        msgEntity.fadeIn(this.time / 2);
        msgEntity.fadeOut(this.time / 2);
    }

};

//根据url获取参数
function GetQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var l = decodeURI(window.location.search);
    var r = l.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//判断是否是微信浏览器
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

//获取当前时间，格式YYYY-MM-DD HH：mm:ss
function getNowFormatDateTime() {
    var now = new Date();

    var year = now.getFullYear(); //年
    var month = now.getMonth() + 1; //月
    var day = now.getDate(); //日

    var hh = now.getHours(); //时
    var mm = now.getMinutes(); //分
    var ss = now.getSeconds(); //秒

    var clock = year + '-';

    if (month < 10)
        clock += '0';

    clock += month + '-';

    if (day < 10)
        clock += '0';

    clock += day + ' ';

    if (hh < 10)
        clock += '0';

    clock += hh + ':';
    if (mm < 10) clock += '0';
    clock += mm + ':';

    if (ss < 10) clock += '0';
    clock += ss;
    return (clock);
}

//获取当前时间，格式YYYYMMDDHHmmss
function getNowFormatDateTimeS() {
    var now = new Date();

    var year = now.getFullYear(); //年
    var month = now.getMonth() + 1; //月
    var day = now.getDate(); //日

    var hh = now.getHours(); //时
    var mm = now.getMinutes(); //分
    var ss = now.getSeconds(); //秒

    var clock = year;

    if (month < 10)
        clock += '0';

    clock += month;

    if (day < 10)
        clock += '0';

    clock += day;

    if (hh < 10)
        clock += '0';

    clock += hh;
    if (mm < 10) clock += '0';
    clock += mm;

    if (ss < 10) clock += '0';
    clock += ss;
    return (clock);
}

//上传日志
function updateMonitor(model, versionName, userId, pageName, action, accessTime, network, os) {
    $.ajax({
        type: 'POST',
        url: '/hoffice/smsmember/memberLog.do?method=updateMonitor',
        async: true,
        dataType: 'json',
        data: {
            model: model,
            versionName: versionName,
            userId: userId,
            pageName: pageName,
            action: action,
            backTime: getNowFormatDateTime(),
            accessTime: accessTime,
            network: network,
            os: os
        }, //参数之间用“,” 逗号隔开。
        error: function() {
        },
        success: function(data) {

        }
    });
}

//数据加密
export function DataEncryption(arr1) {
    for (var i = 0; i < arr1.length; i++) {
        arr1[i] = arr1[i]
        .replace('password=', 'smspw=')
        .replace('passWord=', 'smspw=')
        .replace('memberid=', 'smsmi=')
        .replace('memberId=', 'smsmi=')
        .replace('userid=', 'smsui=')
        .replace('userId=', 'smsui=')
        .replace('cardNo=', 'smscn=')
        .replace('idno=', 'smsin=')
        .replace('openId=', 'smsoi=')
        .replace('new_password=', 'smsnpw=')
        .replace('memberUserId=', 'smsmui=')
        .replace('loginName=', 'smsln=');
    }
    var xykj = '';
    var nonce_str = createRandomStr();
    var appParResult = '';
    arr1.push('encryptedIdentifier=1');
    arr1.push('nonce_str=' + nonce_str);
    var arr2 = new Array();
    for (var i = 0; i < arr1.length; i++) {
        var arritem = arr1[i].split('=');
        if (arritem[1] == '' || arritem[1] == 'null' ||
            arritem[1] == undefined || arritem[1] == null) {
        } else {
            arr2.push(arr1[i]);
        }
    }
    var arr = getKeySort(arr2);
    for (var i = 0; i < arr.length; i++) {
        appParResult = appParResult + arr[i] + '&';
    }
    var sign = md5(appParResult).toUpperCase();
    var xykjString = appParResult + '&' + 'sign=' + sign;
    var base = new Base64();
    var xykj = base.encode(xykjString);
    return '!' + xykj + '!';
}

/**
 * 传入数组
 * 按字母顺序,升序
 * 冒泡排序
 */
function getKeySort(strArr) {
    var count = 0;
    var compareInt = 0;
    for (var i = 0; i < strArr.length; i++) {
        for (var j = 0; j < strArr.length - 1 - i; j++) {
            compareToIndexValue(strArr, compareInt, j);
            count++;
        }
    }
    return strArr;
}

/**
 *  根据首字母 排序,如果首字母相同则根据第二个字母排序...直到排出大小
 */
export function compareToIndexValue(arr, int, arrIndex) {
    if (arr[arrIndex].substring(int, int + 1) == arr[arrIndex + 1].substring(int, int + 1)) compareToIndexValue(arr, int + 1, arrIndex); //如果第一位相等,则继续比较第二个字符
    else if (arr[arrIndex].substring(int, int + 1) > arr[arrIndex + 1].substring(int, int + 1)) {
        var temp = arr[arrIndex + 1];
        arr[arrIndex + 1] = arr[arrIndex];
        arr[arrIndex] = temp;
    }
    /*else if(arr[arrIndex].substring(int,int+1) < arr[arrIndex + 1].substring(int,int+1)) return;*/
    return;
};

/**
 * 创建19位的随机数
 * @return
 */
export function createRandomStr() {
    var currTime = getNowFormatDateTimeS();
    //5位随机数
    var strRandom = buildRandom(5);
    //19位序列号,可以自行调整。
    var strReq = currTime + strRandom;
    return strReq;
};

export function buildRandom(length) {
    var num = 1;
    var random = Math.random().toFixed(5);
    if (random < 0.1) {
        random = random + 0.1;
    }
    for (var i = 0; i < length; i++) {
        num = num * 10;
    }
    return (random * num);
};

function Base64() {

    // private property
    var _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    // public method for encoding
    this.encode = function(input) {
        var output = '';
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    };

    // public method for decoding
    this.decode = function(input) {
        var output = '';
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    };

    // private method for UTF-8 encoding
    var _utf8_encode = function(string) {
        string = string.replace(/\r\n/g, '\n');
        var utftext = '';
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    };

    // private method for UTF-8 decoding
    var _utf8_decode = function(utftext) {
        var string = '';
        var i = 0;
        var c = 0;
        var c1 = 0;
        var c2 = 0;
        var c3 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    };
};

//自定义删除函数:
Array.prototype.remove = function(dx) {
    if (isNaN(dx) || dx > this.length) {
        return false;
    }
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[dx]) {
            this[n++] = this[i];
        }
    }
    this.length -= 1;
};

//数据解密
export function DataDecryption(data) {
    var base = new Base64();
    data = data.substring(1, data.length - 1);
    var result = base.decode(data);
    var results = result
    .replace('"smssi"', '"sessionId"')
    .replace('"smsmui"', '"memberUserId"')
    .replace('"smsnpw"', '"new_password"')
    .replace('"smsoi"', '"openId"')
    .replace('"smsin"', '"idno"')
    .replace('"smscn"', '"cardNo"')
    .replace('"smsui"', '"userId"')
    .replace('"smsmi"', '"memberId"')
    .replace('"smspw"', '"password"')
    .replace('"smsln"', '"loginName"');
    result = eval('(' + results + ')');
    return result;
};

export function md5(string) {
    function md5_RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function md5_AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function md5_F(x, y, z) {
        return (x & y) | ((~x) & z);
    }

    function md5_G(x, y, z) {
        return (x & z) | (y & (~z));
    }

    function md5_H(x, y, z) {
        return (x ^ y ^ z);
    }

    function md5_I(x, y, z) {
        return (y ^ (x | (~z)));
    }

    function md5_FF(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };

    function md5_GG(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };

    function md5_HH(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };

    function md5_II(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };

    function md5_ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    function md5_WordToHex(lValue) {
        var WordToHexValue = '',
            WordToHexValue_temp = '',
            lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = '0' + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };

    function md5_Utf8Encode(string) {
        string = string.replace(/\r\n/g, '\n');
        var utftext = '';
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7,
        S12 = 12,
        S13 = 17,
        S14 = 22;
    var S21 = 5,
        S22 = 9,
        S23 = 14,
        S24 = 20;
    var S31 = 4,
        S32 = 11,
        S33 = 16,
        S34 = 23;
    var S41 = 6,
        S42 = 10,
        S43 = 15,
        S44 = 21;
    string = md5_Utf8Encode(string);
    x = md5_ConvertToWordArray(string);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = md5_HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = md5_AddUnsigned(a, AA);
        b = md5_AddUnsigned(b, BB);
        c = md5_AddUnsigned(c, CC);
        d = md5_AddUnsigned(d, DD);
    }
    return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d)).toLowerCase();
};
