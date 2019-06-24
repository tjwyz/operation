import {
    toLogin,
    openH5,
} from './communiateNA';

import {
    KWAI_HOST,
    ACTIVITY_PATH,
    ANYLYSE_PREFIX,
} from '../../assets/js/constant';

import config from '../../config';

const clickPipeProcessor = function (options) {
    return function (target, name, descriptor) {
        const original = descriptor.value;

        if (typeof original === 'function') {

            descriptor.value = function (...args) {
                // 端内
                if (this.globalState.isInKwai) {

                    if (!options || options && !options.ignoreMatchStatus) {
                        // 提示比赛已结束
                        if (this.globalState.isOver) {

                            // 在修饰器中就不用mapMutations了,也能用但有些丑略
                            this.$store.commit('toast', {
                                text: config.meta.OVER_TIP,
                            });

                            return;
                        }

                        // 提示比赛未开始
                        if (this.globalState.isPrepare) {
                            this.$store.commit('toast', {
                                text: config.meta.PREPARE_TIP,
                            });

                            return;
                        }

                        // 提示比赛已下线
                        if (this.globalState.isOffline) {
                            this.$store.commit('toast', {
                                text: config.meta.OFFLINE_TIP,
                            });

                            return;
                        }
                    }

                    const skipForceLogin = options && !!options.skipForceLogin;

                    // 未登录，跳转到登录
                    if (!this.globalState.isLogin && !skipForceLogin) {
                        toLogin(data => {
                            if (+data.result === 1) {
                                openH5(`${KWAI_HOST}${ACTIVITY_PATH}?layoutType=1`);
                            } else {
                                this.$store.commit('toast', {
                                    text: '尚未登录，请返回首页登录后参与~',
                                });
                            }
                        });

                        return;
                    }

                    try {
                        const res = original.apply(this, args);

                        return res;
                    } catch (e) {
                        // not a function
                    }
                }
                // 端外
                if (!this.globalState.isInKwai) {
                    let kwaiCbUri = `${KWAI_HOST}${ACTIVITY_PATH}`;
                    openH5(`${kwaiCbUri}?layoutType=1`);
                }
            };
        }

        return descriptor;
    };
};

/**
 * clickPipeLog 点击日志
 * @param  {...ArrayLike} logParams function parameter
 * @return {function} decorator
 */
const clickPipeLog = function (...logParams) {
    return function (target, name, descriptor) {

        const original = descriptor.value;

        if (typeof original === 'function') {
            descriptor.value = function (...args) {
                const res = original.apply(this, args);
                if (logParams.length > 0
                    && logParams[0].tagName
                    && args[0]
                    && !args[0].prevenClickLogSend) {
                    let logKey = `${ANYLYSE_PREFIX}_${logParams[0].tagName}`;

                    if (args.length > 0
                        && args[0].logData) {
                        const logData = args[0].logData;
                        for (const [key, value] of Object.entries(logData)) {
                            logKey += `_${key}_${value}`;
                        }
                    }

                    window.ksLog && window.ksLog.sendCountTag(logKey);
                }

                return res;
            };
        }

        return descriptor;
    };
};

export {
    clickPipeProcessor,
    clickPipeLog,
};