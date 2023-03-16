import { API as GLOBAL_API } from '../../../../config';

export const API = {
    ...GLOBAL_API,
    USER: {
        SIGN_UP: '/users/sign-up',
        LOG_IN: '/users/login',
        SIGN_OUT: '/users/sign-out',
        GET_USER_BY_ID: '/users/:id',
        GET_USER_BY_EMAIL: '/users/email/:email',
    }
}