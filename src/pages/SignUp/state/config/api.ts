import { API as GLOBAL_API } from '../../../../config';

export const API = {
    ...GLOBAL_API,
    USER: {
        LOCAL_SIGNUP: '/users/local/signup',
        LOCAL_LOGIN: '/users/local/login',
        LOGOUT: '/users/logout',
        REFRESH_TOKEN: '/users/refresh',
        GET_USER_BY_ID: '/users/:id',
        GET_USER_BY_EMAIL: '/users/email/:email',
    }
}