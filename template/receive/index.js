import { clickPipeProcessor, clickPipeLog } from '../assets/js/decorator';

import {
    THROTTLE_WAIT,
    SHARE_HOST,
    ACTIVITY_PATH,
    ANYLYSE_PREFIX,
} from '../assets/js/constant';

import config from '../config';

import {
    openProfile,
    openWork,
    invokeShare,
} from '../assets/js/communiateNA.js';

import throttle from 'lodash-decorators/throttle';

class Receives {
    constructor() {
        // code
    }

    /**
     * profile 跳转到作者详情页
     * @param  {Object]} options [description]
     */
    @throttle(THROTTLE_WAIT)
    @clickPipeLog({
        tagName: 'profile',
    })
    @clickPipeProcessor({
        ignoreMatchStatus: true,
        skipForceLogin: true,
    })
    profile(options) {
        openProfile({
            userId: options.data.userId || options.data.photo.userId,
            position: `${ANYLYSE_PREFIX}_profile`,
        });
    }

    /**
     * work 跳转到作品详情页
     * @param  {Object]} options [description]
     */
    @throttle(THROTTLE_WAIT)
    @clickPipeLog({
        tagName: 'work',
    })
    @clickPipeProcessor({
        skipForceLogin: true,
        ignoreMatchStatus: true,
    })
    work(options) {
        openWork({
            userId: options.data.userId || options.data.photo.userId,
            workId: options.data.photoId || options.data.photo.photoId,
        });
    }

    /**
     * share 分享
     * @param  {Object]} options [description]
     */
    @throttle(THROTTLE_WAIT)
    @clickPipeLog({
        tagName: 'share',
    })
    @clickPipeProcessor()
    share(options) {
        let siteUrl = `${SHARE_HOST}${ACTIVITY_PATH}?layoutType=1`;
        let caption = `正在参加#快手K歌之星#五一赛！`;
        let desc = '来帮我点赞助力吧！';

        invokeShare({
            caption,
            desc,
            siteUrl,
        });
    }


    /*
        navbar 左上角 返回
     */
    @clickPipeLog({
        tagName: 'back',
    })
    back() {
        // this.$router.back();
        ksBridge.popBack();
    }

    /*
        navbar 刷新
     */
    @clickPipeLog({
        tagName: 'fresh',
    })
    fresh() {
        // this.$router.go(0);
        location.reload();
    }

    /*
     * 跳转 uri
     */
    redirectUri(options) {
        this.$router.replace({
            path: options.data,
        });
    }

}

const receives = new Receives();

export default receives;
