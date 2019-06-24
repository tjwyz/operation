import {
    isInKwai,
} from '@/utils/device';

import {
    ANYLYSE_PREFIX,
    SHARE_HOSTNAME,
} from './constant';

import config from '../../config';

import {
    openOrDownload,
} from '@ks/open-app';

const IS_IN_KWAI = isInKwai();

/**
 * showToast 显示toast
 * tip {String} 文本
 * type {String} 类型: success|error(default)
 */
export function showToast(tip, type = 'error') {
    if (IS_IN_KWAI) {
        ksBridge.showToast({
            text: tip,
            type,
        });

        return;
    }
}

export function toLogin(cb) {
    if (IS_IN_KWAI) {
        ksBridge.login({
            callback: cb,
        });

        return;
    }
}

// 分享
export function invokeShare(options) {
    ksBridge.commonShare({
        param: {
            platform: ['timeline', 'weixin', 'qq', 'weibo', 'qz', 'copylink', 'imfriend', 'imfriend_list'],
            siteName: SHARE_HOSTNAME,
            type: 'image',
            imgUrl: config.meta.SHARE_AVATOR_URL,
            caption: options.caption,
            desc: options.desc,
            siteUrl: options.siteUrl,
        },
        callback: () => {},
    });
}

// 打开schema
export function openSchema(schema) {
    /* eslint-disable max-len */
    openOrDownload({
        schemeUrl: schema,
        position: `${ANYLYSE_PREFIX}_k`,
    });
}

// postVideo
export function postVideo() {
    ksBridge.postVideo({
        param: {
            magicFaceId: 3833,
            magicName: '告白气球',
            returnToWeb: true,
            showNativeTagPage: false,
            activity: JSON.stringify({
                activityId: 245,
            }),
        },
        complete: res => {
            if (res.result == 1
                && res.data.progress == 100) {
                // code
            }
        },
    });
}

// 打开 profile
export function openProfile(options) {
    openOrDownload({
        schemeUrl: `kwai://profile/${options.userId}`,
        position: options.position,
    });
}

// 打开 work
export function openWork(options) {
    openOrDownload({
        schemeUrl: `kwai://work/${options.workId}?userId=${options.userId}`,
        position: `${ANYLYSE_PREFIX}_work_photoId_${options.workId}`,
    });
}

// 打开 web 页面
export function openH5(url) {
    openOrDownload({
        schemeUrl: `kwai://webview?url=${encodeURIComponent(url)}`,
        position: `${ANYLYSE_PREFIX}_open_h5`,
    });
}
