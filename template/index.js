import '@babel/polyfill';

import Vue from 'vue';
import FastClick from 'fastclick';
import VueLazyload from 'vue-lazyload';

import App from './App.vue';
import Toast from './components/centerToast.vue';
import Navbar from './components/navbar.vue';

import router from './router';
import store from './store/index';

import filters from './assets/js/filter';

import {
    ANYLYSE_PREFIX,
} from './assets/js/constant';

import '@ks/ks-bridge';

import '@ks/sharp-ui/lib/themes/default/index.css';

import {
    Loading,
} from '@ks/sharp-ui';

import StartUp from './assets/js/startup';
StartUp();


ksBridge.setPageTitle({
    title: '',
});
// 1 表示状态栏文字设置成白色，0 表示设置成黑色
ksBridge.setStatusBarStyle({
    style: 1,
});

//
ksBridge.setMiddleSlideBack({
    enabled: false,
});
ksBridge.setSlideBack({
    enabled: false,
});

// 全屏模式 native 按钮为透明 用户会看到h5按钮样式
ksBridge.setTopLeftBtn({
    show: true, // 默认为true
    icon: 'custom',
    iconUrl: {
        normal: 'https://ali.static.yximgs.com/s1/archive/i/common/60.png', // 默认按钮图片
        pressed: 'https://ali.static.yximgs.com/s1/archive/i/common/60.png', // 点击时按钮图片，未设置时使用normal的设置
    },
    onClick: () => {
        window.ksLog && window.ksLog.sendCountTag(`${ANYLYSE_PREFIX}_left_corner_back`);
        ksBridge.popBack();
    },
});


Vue.use(Loading);

Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue();

Vue.use(VueLazyload, {
    preLoad: 1,
    error: require('./assets/img/placeholder.png'),
    loading: require('./assets/img/placeholder.png'),
    attempt: 3,
    listenEvents: ['scroll'],
});

for (const [key, value] of Object.entries(filters)) {
    Vue.filter(key, value);
}

FastClick.attach(document.body);

if (process.env.NODE_ENV !== 'production') {
    const vConsole = require('vconsole');
    new vConsole();
}

new Vue({
    el: '#app',
    router,
    store,
    components: {
        App,
    },
    render: c => c(App),
});

new Vue({
    store,
    render: h => h(Toast),
}).$mount('#toast');

new Vue({
    router,
    store,
    render: h => h(Navbar),
}).$mount('#navbar');