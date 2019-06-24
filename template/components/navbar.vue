<template>
    <div
        class="navbar"
        :class="navbarClassName"
        v-if="showNavbar"
    >
        <div class="wrapper">
            <div
                class="back-wrapper"
                @click="backHandler"
                v-if="showBack"
            >
                <div class="back"></div>
            </div>

            <div class="middle-wrapper">
                <div class="title">{{title}}</div>
            </div>
            
            <div
                class="share-wrapper"
                @click="shareHandler"
                :class="{'hide-share-icon': !showShare}"
            >
                <div class="share"></div>
            </div>
        </div>

        <div
            class="fresh"
            @click="freshHandler"
            v-if="showFresh"
        >
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'navbar',

    components: {
    },

    data() {
        return {};
    },

    computed: {
        ...mapGetters([
            'globalState',
        ]),
        ...mapState({
        }),

        isIndex() {
            return this.$route.name.includes('index');
        },


        showBack() {
            return this.globalState.isInKwai
                    || !this.globalState.isInKwai && !this.isIndex;
        },
        showShare() {
            return this.globalState.isInKwai;
        },
        showFresh() {
            return this.globalState.isInKwai && this.isIndex;
        },


        showNavbar() {
            return true;
        },

        navbarClassName() {
            if (this.isIndex) {
                return 'index-navbar';
            }
            return ['not-index-navbar', `bg-${this.$route.name}-navbar`];
        },

        title() {
            return this.$route.meta.title;
        },
    },

    created() {

    },

    methods: {
        backHandler() {
            this.$eventHub.$emit('event', {
                eventName: 'back',
                options: {
                    logData: {
                        pageName: this.$route.name,
                    },
                },
            });
        },
        shareHandler() {
            this.$eventHub.$emit('event', {
                eventName: 'share',
                options: {
                    logData: {
                        pageName: this.$route.name,
                    },
                },
            });
        },
        freshHandler() {
            this.$eventHub.$emit('event', {
                eventName: 'fresh',
            });
        },
    },
};
</script>

<style lang="less" scoped>
@import '../assets/css/common.less';

.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 11000;

    .wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;

        width: 100%;
        height: 100%;

        margin: 0 auto;
        padding: 0 .3rem 0 .2rem;
        box-sizing: border-box;
        height: 1rem;

        .middle-wrapper {
            margin: 0 auto;
        }

        .back-wrapper {
            .touchEnd();
        }

        .share-wrapper {
            .touchEnd();
        }

        .hide-share-icon {
            visibility: hidden;
        }


        .back,
        .share {
            background-size: 100%;
            background-repeat: no-repeat;
        }

        .back {
            width: 0.64rem;
            height: 0.64rem;
            background-image: url(../assets/img/back.png);
        }
        .share {
            width: 0.64rem;
            height: 0.64rem;
            background-image: url(../assets/img/share.png);
        }

        .title {
            font-size: 0.36rem;
            color: #000;
            text-align: center;
            font-weight: 500;
        }
    }

    .fresh {
        width: 0.64rem;
        height: 0.64rem;
        .touchEnd();
        position: fixed;
        right: 0.3rem;
        top: 1.5rem;
        background-image: url(../assets/img/fresh.png);
        background-size: cover;
    }
}

.not-index-navbar {

}


</style>