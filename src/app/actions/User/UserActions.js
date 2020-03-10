import { USER_LOADED, USER_USERNAME_CHANGED, USER_PHOTO_CHANGED, USER_LOGOUT } from '../ActionsType';

export function acUserData(pData) {
    return {
        type: USER_LOADED,
        payload: pData
    };
}

export function acUserChangeUsername(pData) {
    return {
        type: USER_USERNAME_CHANGED,
        payload: pData
    };
}

export function acUserChangePhoto(pData) {
    return {
        type: USER_PHOTO_CHANGED,
        payload: pData
    };
}

export function acUserLogout(pData) {
    return {
        type: USER_LOGOUT
    };
}
