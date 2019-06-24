const substrLength = 12;

export default {
    substr12(value) {
        if (!value) {
            return '';
        }
        /* eslint-disable */
        const r = /[^\x00-\xff]/g;
        /* eslint-enable */

        if (value.replace(r, 'mm').length <= substrLength) {
            return value;
        }

        const m = Math.floor(substrLength / 2);

        for (let i = m; i < value.length; i++) {
            if (value.substr(0, i).replace(r, 'mm').length >= substrLength) {
                return value.substr(0, i) + '...';
            }
        }

        return value;
    },
    formatNumber(value, suffix = '') {
        if (value / 10000 >= 1) {
            const tenThousand = value / 10000;

            return `${tenThousand.toFixed(1)}w${suffix}`;
        }

        return value + suffix;
    },
};
