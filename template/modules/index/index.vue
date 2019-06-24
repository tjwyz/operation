<template>
    <div class="page-app index">
        <div @click="click">click</div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import debounce from 'lodash/debounce';

import receives from '../../receive/index';

export default {
    name: 'index',

    data() {
        return {
            scrollTop: 0,
        };
    },
    computed: {
        ...mapGetters([
            'globalState',
        ]),
        ...mapState({
            isInKwai: state => state.isInKwai,
            activityData: state => state.activityData,
        }),

    },
    components: {

    },

    watch: {

    },

    created() {
        this.$eventHub.$on('event', this.callback);

        if (!this.globalState.inited) {
            // 获取活动数据
            this.$store.dispatch('fetchActivity', {
                afterLoad: [],
            });
        }

    },

    mounted() {
        window.addEventListener(
            'scroll',
            debounce(this.handleScroll, 50, { maxWait: 400 })
        );
    },

    beforeDestroy() {
        this.$eventHub.$off('event', this.callback);

        window.removeEventListener('scroll', this.handleScroll);
    },

    methods: {
        callback(data) {
            receives[data.eventName].bind(this)(data.options);
        },
        handleScroll() {

        },
        click() {
            // this.$store.commit('toast', {
            //     text: '123',
            // });
        }
    },
};
</script>

<style lang="less" scoped>
@import '../../assets/css/common.less';
.page-app {
    padding-top: 1.6rem;
    color: #000;
}
</style>
