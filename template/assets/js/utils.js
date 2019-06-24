import {
    VIEW_HEIGHT,
} from './constant';

export function isToday(targetStamp, sourceStamp = +new Date()) {
    return new Date(sourceStamp).setHours(0, 0, 0, 0) === new Date(targetStamp).setHours(0, 0, 0, 0);
}

/*
 * getQueryString 获取 query
 */
export function getQueryString(name) {
    /* eslint-disable */
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);

    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    /* eslint-enable */
}

export function getCookie(name) {
    if (document.cookie.length > 0) {
        let c_start; let c_end;
        c_start = document.cookie.indexOf(name + '=');
        if (c_start !== -1) {
            c_start = c_start + name.length + 1;
            c_end = document.cookie.indexOf(';', c_start);
            if (c_end === -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
        return '';
    }
    return '';
}

// left 版本大于 right  返回 true
export function compareVer(left, right) {
    left = String(left);
    right = String(right);

    const leftArr = left.split(',');
    const rightArr = right.split(',');
    if (leftArr.length === 0) {return false;}

    let flag = true;

    leftArr.forEach((item, index) => {
        if ( rightArr[index] !== undefined && leftArr[index] >= rightArr[index]) {
            // empty
        } else if (rightArr[index] === undefined) {
            // empty
        } else {
            flag = false;
        }
    });
    return flag;
}


/*
 * getScrollTop 获取 scrollTop
 */
export function getScrollTop() {
    return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
}

/*
 * documentRemainDistance 获取 文档距离底部高度
 */
export function documentRemainDistance() {
    const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    const documentHeight = document.body.clientHeight || document.documentElement.offsetHeight;

    return documentHeight - scrollTop - VIEW_HEIGHT;
}

/**
 * formatMinutes 将秒转换成分钟
 * @param  {Number} s 秒数
 * @return {String}  <分钟>:秒数
 */
export function formatMinutes(s) {
    let minutes = Math.floor(s / 60);
    const seconds = Math.floor(s % 60);

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    if (seconds < 10) {
        return `${minutes}:0${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

/**
 * timeDown 倒计时
 * @param  {Number} second 差值 s 数
 * @return {String}        X天X时X分钟X秒
 */
export function timeDown(second) {
    second = Math.floor(second);

    let day = ''; let hour = ''; let
        minute = '';

    if (second >= 86400) {
        day = Math.floor(second / 86400) + '天';
        second = second % 86400;

        if (parseInt(day, 10) >= 1) {
            return day;
        }

        if (second === 0) {
            return `${day}00小时00分钟00秒`;
        }
    }

    if (second >= 3600) {
        hour = Math.floor(second / 3600);

        if (hour < 10) {
            if (day === '') {
                hour = `${hour}小时`;
            } else {
                hour = `0${hour}小时`;
            }
        } else {
            hour = `${hour}小时`;
        }

        second = second % 3600;

        if (second === 0) {
            return `${day}${hour}00分钟00秒`;
        }
    } else if (day !== '') {
        hour = '00小时';
    }

    if (second >= 60) {
        minute = Math.floor(second / 60);

        if (minute < 10) {
            if (hour === '') {
                minute = `${minute}分钟`;
            } else {
                minute = `0${minute}分钟`;
            }
        } else {
            minute = `${minute}分钟`;
        }

        second = second % 60;

        if (second === 0) {
            return `${day}${hour}${minute}00秒`;
        }
    } else if (hour !== '') {
        minute = '00分钟';
    }

    if (second < 10) {
        if (minute === '') {
            second = `${second}秒`;
        } else {
            second = `0${second}秒`;
        }
    } else {
        second = `${second}秒`;
    }

    return day + hour + minute + second;
}

