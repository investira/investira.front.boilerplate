import { AUTH_LOGIN, AUTH_IS_FETCHING, AUTH_LOGIN_RESET } from '../../const/actionsType';

export function acAuthLogin(pData) {
    return {
        type: AUTH_LOGIN,
        payload: pData
    };
}

export function acAuthIsFetching(pIsFetching) {
    return {
        type: AUTH_IS_FETCHING,
        payload: pIsFetching
    };
}

export function acAuthLoginReset() {
    return {
        type: AUTH_LOGIN_RESET
    };
}
