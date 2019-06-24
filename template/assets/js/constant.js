import config from '../../config';

export const THROTTLE_WAIT = 1000;

export const WORKS_PAGE_SIZE = 15;

export const DAY_MS = 1000 * 60 * 60 * 24;

export const ANYLYSE_PREFIX = 'oper_{{name}}';

export const VIEW_HEIGHT
  = window.innerHeight || document.documentElement.clientHeight;

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

export const KWAI_HOST = `${config.env.KWAI_HOST[env]}`;
export const SHARE_HOST = `${config.env.SHARE_HOST[env]}`;
export const SHARE_HOSTNAME = SHARE_HOST.split('//')[1];
export const ACTIVITY_PATH = '/activity/{{name}}/';
