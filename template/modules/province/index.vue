<template>
    <div class="main-wrapper">
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';

import receives from '../../receive/index';

export default {
    name: 'province',
    components: {
    },
    data() {
        return {

        };
    },
    beforeCreate() {

    },
    computed: {
        ...mapGetters([
            'globalState',
        ]),
    },
    mounted() {
        this.$eventHub.$on('event', this.callback);

        if (!this.globalState.inited) {
            // 获取活动数据
            this.$store.dispatch('fetchActivity');
        }
        this.$store.dispatch('fetchProvinceInfo', {
            beforeLoad: [
                {
                    action: 'fetchActivity',
                },
            ],
        });
    },
    beforeDestroy() {
        this.$eventHub.$off('event', this.callback);
    },

    beforeRouteEnter(to, from, next) {
        next(() => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        });
    },

    methods: {
        callback(data) {
            receives[data.eventName].bind(this)(data.options);
        },
    },
};
</script>
<style lang="less">

</style>
