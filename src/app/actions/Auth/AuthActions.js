import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_TOKEN_UPDATED,
    AUTH_STATUS_TOKEN_UPDATED
} from '../ActionsType';

export function acAuthLogin(pData) {
    return {
        type: AUTH_LOGIN,
        payload: pData
    };
}

export function acAuthLogout() {
    return {
        type: AUTH_LOGOUT
    };
}

export function acAuthUpdateStatusToken(pData) {
    return {
        type: AUTH_STATUS_TOKEN_UPDATED,
        payload: pData
    };
}

export function acAuthUpdateToken(pData) {
    return {
        type: AUTH_TOKEN_UPDATED,
        payload: pData
    };
}
