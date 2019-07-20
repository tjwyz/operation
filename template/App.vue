<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'app',

    data() {
        return {};
    },
};
</script>

<style lang="less">
@import './assets/css/common.less';

* {
    margin: 0;
    padding: 0;
    box-sizing: content-box;
    outline: 0;
    -webkit-tap-highlight-color: transparent;

    -webkit-touch-callout: none;
    -moz-touch-callout: none;
    -ms-touch-callout: none;
    touch-callout: none;
}

body {
    font-family: 'Helvetica Neue', Helvetica, Arial, 'PingFang SC',
        'Hiragino Sans GB', 'Heiti SC', 'Microsoft YaHei', 'WenQuanYi Micro Hei',
        sans-serif;

    color: #fff;

    background: @bgColor;
}

ul {
    list-style: none;
    padding: 0;
}

a {
    text-decoration: none;
}

img {
    pointer-events: none;
}

</style>
