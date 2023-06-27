import {
    APP_CONNECTION_CHANGED,
    APP_LOCATION_CHANGED,
    APP_VISIBILITY_CHANGED,
    APP_THEME_CHANGED,
    APP_LOGOUT
} from '../../const/actionsType';

export function acAppChangeLocation(pData) {
    return {
        type: APP_LOCATION_CHANGED,
        payload: pData
    };
}

export function acAppSetConectionState(pData) {
    return {
        type: APP_CONNECTION_CHANGED,
        payload: pData
    };
}

export function acAppSetVisibilityState(pData) {
    return {
        type: APP_VISIBILITY_CHANGED,
        payload: pData
    };
}

export function acAppChangeTheme(pData) {
    return {
        type: APP_THEME_CHANGED,
        payload: pData
    };
}

export function acAppLogout() {
    return {
        type: APP_LOGOUT
    };
}
