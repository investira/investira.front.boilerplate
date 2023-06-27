import { MESSAGE_CLOSED, MESSAGE_CHANGED, MESSAGE_LOGOUT } from '../../const/actionsType';

export function acMessageClosed() {
    return {
        type: MESSAGE_CLOSED
    };
}

export function acMessageTextChanged(pData) {
    return {
        type: MESSAGE_CHANGED,
        payload: pData
    };
}

export function acMessageLogout() {
    return {
        type: MESSAGE_LOGOUT
    };
}
