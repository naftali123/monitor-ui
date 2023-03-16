import { API as GLOBAL_API } from '../../../../config';

export const API = {
    ...GLOBAL_API,
    MONITOR: {
        ADD_URL: '/monitor/url',
        ADD_URL_LIST: '/monitor/url-list',
        GET_ACTIVITY_HISTORY: '/monitor/urls/activity-history/:label',
        REMOVE_URL: '/monitor',
        REMOVE_URL_LIST: '/monitor/list',
        GET_ALL_URLS: '/monitor/all-urls/:limit',
    }
};