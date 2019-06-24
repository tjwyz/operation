const meta = {
    TITLE: 'K歌之星守擂赛',
    NETWORK_ERROR_TEXT: '网络问题，请稍后重试',
    NOT_SUPPORT_TIP: '需更新至最新版才能参赛哦！',
    PREPARE_TIP: '比赛即将开始',
    OVER_TIP: '比赛已结束',
    OFFLINE_TIP: '比赛已下线',
    SHARE_CAPTION: '#快手K歌之星#大赛开始啦！',
    SHARE_DESC: '按照活动要求发布作品，就能领6快币哟！本期使用合唱模式进行参赛，奖励还能翻倍哟>>',
    SHARE_AVATOR_URL: 'https://ali.static.yximgs.com/udata/pkg/fe/51.d7dfb8ea.png',
};

const env = {
    KWAI_HOST: {
        development: 'http://lx.test.gifshow.com',
        production: 'https://app.m.kuaishou.com',
    },
    SHARE_HOST: {
        development: 'http://lx.test.gifshow.com',
        production: 'https://app.viviv.com',
    },
};


// 配置文件
export default {
    meta,
    env,
};
