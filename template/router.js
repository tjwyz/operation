import Vue from 'vue';
import Router from 'vue-router';

import cloneDeep from 'lodash/cloneDeep';

// page components
import IndexPage from './modules/index/index';

import config from './config';

import store from './store';

import { invokeShare } from './assets/js/communiateNA.js';

import { wxShareConfig } from '@ks/wx-jssdk';

import {
    ANYLYSE_PREFIX,
    SHARE_HOST,
    ACTIVITY_PATH,
} from './assets/js/constant';

import { getQueryString } from './assets/js/utils';

Vue.use(Router);

// 微信二次分享url, 并且赋予了微信端内打开app的能力
wxShareConfig(
    {
        desc: config.meta.SHARE_DESC,
        title: config.meta.SHARE_DESC,
        imgUrl: config.meta.SHARE_AVATOR_URL,
        link: `${SHARE_HOST}${ACTIVITY_PATH}`,
    },
    {},
    ANYLYSE_PREFIX
);

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: `/index/`,
        },
        {
            name: 'index',
            path: '/index',
            component: IndexPage,
            meta: {
                title: '首页',
            },
        },
    ],
});

router.beforeEach((to, from, next) => {
    next();
});

// 不是一直展现, 与router有关,所以放到这
router.afterEach(to => {
    window.ksLog && window.ksLog.sendPV({
        from: getQueryString('from') || '',
    });

    const icon = 'custom';

    if (to.name.split('-')[0] === 'index') {
        ksBridge.setTopRightBtn({
            show: true, // 默认为true
            icon,
            iconUrl: {
                normal: 'https://ali.static.yximgs.com/s1/archive/i/common/60.png', // 默认按钮图片
                pressed: 'https://ali.static.yximgs.com/s1/archive/i/common/60.png', // 点击时按钮图片，未设置时使用normal的设置
            },
            onClick: () => {
                invokeShare({
                    caption: config.meta.SHARE_CAPTION,
                    desc: config.meta.SHARE_DESC,
                    siteUrl: `${SHARE_HOST}${ACTIVITY_PATH}`,
                });

                window.ksLog && window.ksLog.sendCountTag(`${ANYLYSE_PREFIX}_right_corner_share`);
            },
        });
    } else {
        ksBridge.setTopRightBtn({
            show: false,
        });
    }
});

export default router;
