import { INFO_CHANGED, INFO_LOGOUT } from '../../const/actionsType';

export function acInfoChange(pData) {
    return {
        type: INFO_CHANGED,
        payload: pData
    };
}

export function acInfoLogout() {
    return {
        type: INFO_LOGOUT
    };
}
