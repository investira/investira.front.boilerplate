import { NOTIFICATIONS_VIEWED, NOTIFICATIONS_VIEWED_LOGOUT } from '../../const/actionsType';

export function acNotificationsView(pData) {
    return {
        type: NOTIFICATIONS_VIEWED,
        payload: pData
    };
}

export function acNotificationsViewLogout() {
    return {
        type: NOTIFICATIONS_VIEWED_LOGOUT
    };
}
