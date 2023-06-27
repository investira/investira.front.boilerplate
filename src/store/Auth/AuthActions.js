import {
    AUTH_UPDATED,
    AUTH_LOGOUT,
    AUTH_STATUS_TOKEN_UPDATED,
    AUTH_TOKEN_NO_EXPIRED
} from '../../const/actionsType';

export function acAuthSetLogin() {
    return {
        type: AUTH_UPDATED
    };
}

export function acAuthUpdateStatusToken(pData) {
    return {
        type: AUTH_STATUS_TOKEN_UPDATED,
        payload: pData
    };
}

export function acAuthTokenNoExpired() {
    return {
        type: AUTH_TOKEN_NO_EXPIRED
    };
}

export function acAuthLogout() {
    return {
        type: AUTH_LOGOUT
    };
}
