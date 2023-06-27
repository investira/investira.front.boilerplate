import { NOTIFICATIONS_AMOUNT_CHANGED, NOTIFICATIONS_AMOUNT_LOGOUT } from '../../const/actionsType';

export function acNotificationsAmountChanged(pData) {
    return {
        type: NOTIFICATIONS_AMOUNT_CHANGED,
        payload: pData
    };
}

export function acNotificationsAmountLogout() {
    return {
        type: NOTIFICATIONS_AMOUNT_LOGOUT
    };
}
