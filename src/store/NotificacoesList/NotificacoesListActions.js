import {
    NOTIFICATIONS_CHANGED,
    NOTIFICATIONS_IS_FETCHING,
    NOTIFICATIONS_LIST_LOGOUT
} from '../../const/actionsType';

export function acNotificationsChanged(pData) {
    return {
        type: NOTIFICATIONS_CHANGED,
        payload: pData
    };
}

export function acNotificationsIsFetching(pData) {
    return {
        type: NOTIFICATIONS_IS_FETCHING,
        payload: pData
    };
}

export function acNotificationsLogout() {
    return {
        type: NOTIFICATIONS_LIST_LOGOUT
    };
}
