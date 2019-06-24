<template>
    <div
        class="center-toast"
        v-show="show"
    >
        <div
            class="text"
            v-html="text"
        ></div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {

    name: 'center-toast',

    props: {

    },

    computed: mapState({
        show: state => state.toast.show,
        text: state => state.toast.text,
    }),

    data() {
        return {

        };
    },

    methods: {
        hideToast() {
            this.$store.commit('toast', {
                text: '',
                show: false,
            });
        },
    },

    updated() {
        this.$el.addEventListener('animationend', this.hideToast);
        this.$el.addEventListener('webkitAnimationEnd', this.hideToast);
    },

    beforeDestroy() {
        this.$el.removeEventListener('animationend', this.hideToast);
        this.$el.removeEventListener('webkitAnimationEnd', this.hideToast);
    },
};
</script>

<style lang="less" scoped>
    .center-toast {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 10000;

        animation-name: fade-out;
        animation-duration: 1s;
        animation-delay: 2s;
        animation-iteration-count: 1;
        animation-timing-function: linear;
        animation-fill-mode: forwards;

        display: flex;
        align-items: center;
        justify-content: center;

        .text {
            font-size: 0.3rem;
            letter-spacing: 0.01rem;

            line-height: 1.4;

            max-width: 4.5rem;

            padding: 0.1rem 0.2rem;

            background-color: rgba(0, 0, 0, .6);

            border-radius: 0.1rem;

            max-width: 4rem;

            text-align: center;
        }
    }

    @keyframes fade-out {
        0% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }
</style>
