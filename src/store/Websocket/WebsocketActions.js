import { WS_NOTIFICATION_CHANGED, WS_CONNECTED_CHANGED, WS_LOGOUT } from '../../const/actionsType';

export function acWsNotificationsChanged(pData) {
    return {
        type: WS_NOTIFICATION_CHANGED,
        payload: pData
    };
}

export function acWsConnectedChanged(pBool) {
    return {
        type: WS_CONNECTED_CHANGED,
        payload: pBool
    };
}

export function acWsLogout() {
    return {
        type: WS_LOGOUT
    };
}
