/**
 * 移动设备嗅探
 * @author Liuming
 * @date 2016-07-28
 */
import { getCookie } from './utils';

var ua = navigator.userAgent;

export function isIOS() {
    return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

export function isAndroid() {
    return ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
}
export function getIOSVersion() {
    if (!isIOS()) {
        return false;
    }
    var match = ua.match(/OS (\d+)_(\d+)_?(\d+)?/);
    if (!match || match.length < 3) {
        return false;
    }
    var version = parseFloat(parseInt(match[1], 10) + 0.1 * match[2]);
    if (version > 0) {
        return version;
    }
    return false;
}
export function isInKwai() {
    return /Kwai\/|Kwai_Lite\/|Kwai_Pro\//i.test(ua) || getCookie('appver').length > 0;
}

export function isInWeChat() {
    return /MicroMessenger/i.test(ua);
}
export function isInEnterpriseWeChat() {
    // 企业微信
    return / wxwork\//i.test(ua);
}
export function isInWeibo() {
    return /Weibo/i.test(ua);
}
export function isInQQ() {
    return / QQ\//i.test(ua);
}
export function isInQzone() {
    return /Qzone\//i.test(ua);
}
export function isInTBS() {
    // 腾讯浏览服务(Tencent Browser Service) 简称TBS
    return / TBS\//i.test(ua);
}
export function isInQQWebBrowser() {
    return /MQQBrowser/i.test(ua) && !isInWeChat() && !isInQQ() && !isInQzone() && !isInTBS();
}
export function isInBaidu() {
    // 百度手机客户端
    return / baiduboxapp\//i.test(ua);
}
export function isInUC() {
    // UC浏览器
    return / UCBrowser\//i.test(ua);
}
export function isInXiaomi() {
    return / XiaoMi\//i.test(ua);
}
export function isInKakaoTalk() {
    // KaKaoTalk
    return /KAKAOTALK/i.test(ua);
}
export function isInPinterest() {
    // Pinterest
    return /Pinterest\//i.test(ua);
}
export function isInZalo() {
    // Zalo
    return /Zalo/i.test(ua);
}
export function supportUniversalLink() {
    return getIOSVersion() >= 9;
}
export function getBrowserDesc() {
    if (isInQQ()) {
        return 'qq';
    }
    if (isInWeChat()) {
        return 'wechat';
    }
    if (isInQzone()) {
        return 'qzone';
    }
    if (isInWeibo()) {
        return 'weibo';
    }
    if (isInBaidu()) {
        return 'baidu';
    }
    if (isInUC()) {
        return 'uc';
    }
    if (isIOS()) {
        return 'ios';
    }
    if (isAndroid()) {
        return 'android';
    }

    return '';
}
export function getDeviceHeightAndWidth() {
    var result = {
        dph: window && window.screen && window.screen.availHeight || 1,
        dpw: window && window.screen && window.screen.availWidth || 1
    };
    if (window.devicePixelRatio !== undefined) {
        result.dph *= window.devicePixelRatio;
        result.dpw *= window.devicePixelRatio;
    }
    return result;
}
