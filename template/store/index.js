import Vue from 'vue';
import Vuex from 'vuex';

import config from '../config';

import { getQueryString, getCookie } from '../assets/js/utils.js';

import { isInKwai, isAndroid } from '@/utils/device';

import { showToast } from '../assets/js/communiateNA';

import service from '../service/index';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        config,
        // ===== env =====
        // 在快手 app 中
        // isInKwai: true,
        // TODO
        isInKwai: isInKwai(),
        isAndroid: isAndroid(),
        // ===== env =====

        // ===== query =====
        // 活动标签 从 location 中的 query 中获取
        tag: getQueryString('tag'),
        tagId: getQueryString('tagId'),
        from: getQueryString('from'),
        // ===== query =====
        // 
        // ===== cookie =====
        appver: getCookie('appver'),
        // ===== cookie =====


        // 弹窗设置
        toast: {
            show: false,
            text: '',
        },

        // 活动状态
        activityData: {},
        inited: false,

        // 待执行队列
        fetchPool: [],
    },
    getters: {
        // 全局状态
        globalState: state => ({
            config: state.config,
            isInKwai: state.isInKwai,
            isAndroid: state.isAndroid,

            // 活动状态
            isPrepare: false ,
            isActive: true ,
            isOver: false ,
            isOffline: false ,
            // 是否登录
            isLogin: true,

            
            tag: state.tag,
            tagId: state.tagId,
            photoId: state.photoId,

            appver: state.appver,
        }),
    },
    mutations: {
        // activity state
        updateActivityData(state, options) {
            state.activityData = options.data;
            // 初始化过
            state.inited = true;
        },
        updateFetchPool(state, { type, value }) {
            const fetchPool = state.fetchPool;

            switch (type) {
                case 'add':
                    !fetchPool.includes(value) && fetchPool.push(value);
                    break;
                case 'remove':
                    fetchPool.splice(fetchPool.indexOf(value), 1);
                    break;
                default:
                    break;
            }

            state.fetchPool = fetchPool;
        },
        toast(state, { show = true, text }) {
            state.toast = {
                show,
                text
            }
        },

    },
    actions: {
        async fetchActivity({ commit, dispatch, state, getters }, options) {
            const data = await service
                .fetchActivity({
                })
                .catch(() => {
                    showToast(config.meta.NETWORK_ERROR_TEXT);
                });
            if (data && +data.result === 1) {
                commit('updateActivityData', {
                    data: data,
                });

                // 加载 后置接口
                if (
                    options
                    && options.afterLoad
                    && Array.isArray(options.afterLoad)
                    && options.afterLoad.length > 0
                ) {
                    options.afterLoad.forEach(item => {
                        dispatch(item, options);
                    });
                }
                // 加载 fetchPool 中的接口
                if (state.fetchPool.length > 0) {
                    state.fetchPool.forEach(item => {
                        dispatch(item, options);
                    });
                }
            } else {
                showToast(data.error_msg || config.meta.NETWORK_ERROR_TEXT);
            }
        },
        async fetchProvinces({ commit, state, dispatch }, options) {
            if (
                options
                && options.beforeLoad
                && Array.isArray(options.beforeLoad)
                && options.beforeLoad.length > 0
                // 还没初始化 先等等
                && !state.inited
            ) {
                options.beforeLoad.forEach(item => {
                    commit('updateFetchPool', {
                        type: 'add',
                        value: 'fetchProvinces',
                    });
                });

                return;
            }

            const data = await service
                .fetchProvinces({
                    activityId: state.activityData.activityId,
                })
                .catch(() => {
                    showToast(config.meta.NETWORK_ERROR_TEXT);
                });

            if (state.fetchPool.includes('fetchProvinces')) {
                commit('updateFetchPool', {
                    type: 'remove',
                    value: 'fetchProvinces',
                });
            }

            if (data && +data.result === 1) {
                commit('updateProvincesData', data.totalRankList);
            } else {
                showToast(data.error_msg || config.meta.NETWORK_ERROR_TEXT);
            }
        },
        async fetchProvinceInfo({ commit, state, getters }, options) {
            if (
                options
                && options.beforeLoad
                && Array.isArray(options.beforeLoad)
                && options.beforeLoad.length > 0
                // 还没初始化 先等等
                && !state.inited
            ) {
                options.beforeLoad.forEach(item => {
                    commit('updateFetchPool', {
                        type: 'add',
                        value: 'fetchProvinceInfo',
                    });
                });

                return;
            }

            const data = await service
                .fetchProvinceInfo({
                })
                .catch(() => {
                    showToast(config.meta.NETWORK_ERROR_TEXT);
                });

            if (state.fetchPool.includes('fetchProvinceInfo')) {
                commit('updateFetchPool', {
                    type: 'remove',
                    value: 'fetchProvinceInfo',
                });
            }

            if (data
                && +data.result === 1) {
                commit('updateProvinceInfoData', data);
            } else {
                showToast(data.error_msg || config.meta.NETWORK_ERROR_TEXT);
            }
        },
    },
});
