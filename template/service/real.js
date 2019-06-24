import axios from './axios';

const defaultFetchOptions = {
    timeout: 10000,
    headers: {
        'Content-type': 'application/json; charset=utf-8',
    },
    withCredentials: true,
};


const fetchActivity = async function fetchActivity(options) {
    const data = await axios({
        method: 'post',
        url: '/rest/wd/activity/karaoke/startup',
        ...defaultFetchOptions,
        data: options,
    });

    return data;
};

export default {
    fetchActivity,
};