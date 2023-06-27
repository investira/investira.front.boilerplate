import { USER_PHOTO_CHANGED, USER_PHOTO_LOGOUT } from '../../const/actionsType';

export function acUserChangePhoto(pData) {
    return {
        type: USER_PHOTO_CHANGED,
        payload: pData
    };
}

export function acUserPhotoLogout() {
    return {
        type: USER_PHOTO_LOGOUT
    };
}
