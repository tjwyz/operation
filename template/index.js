import '@babel/polyfill';

import Vue from 'vue';
import VueLazyload from 'vue-lazyload';

import App from './App.vue';
import Toast from './components/centerToast.vue';
import Navbar from './components/navbar.vue';

import router from './router';
import store from './store/index';

import filters from './assets/js/filter';

import '@ks/ks-bridge';

import '@ks/sharp-ui/lib/themes/default/index.css';

import {
    Loading,
} from '@ks/sharp-ui';

import StartUp from './assets/js/startup';
StartUp();

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