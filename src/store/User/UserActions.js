import { strings } from 'investira.sdk';
import { USER_LOADED, USER_USERNAME_CHANGED, USER_LOGOUT } from '../../const/actionsType';

export function acUserUpdate(pData) {
    const xName = strings.splitFullName(pData.name);

    const xData = {
        ...pData,
        name_first: xName.first,
        name_last: xName.last,
        name_middle: xName.middle
    };

    return {
        type: USER_LOADED,
        payload: xData
    };
}

export function acUserChangeUsername(pData) {
    return {
        type: USER_USERNAME_CHANGED,
        payload: pData
    };
}

export function acUserLogout() {
    return {
        type: USER_LOGOUT
    };
}
