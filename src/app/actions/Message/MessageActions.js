import {
    MESSAGE_CLOSED,
    MESSAGE_CHANGED,
    MESSAGE_LOGOUT
} from '../ActionsType';

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

export function acMessageLogout(pData) {
    return {
        type: MESSAGE_LOGOUT
    };
}
