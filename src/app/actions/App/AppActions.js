import {
    APP_CONNECTION_CHANGED,
    APP_VISIBILITY_CHANGED,
    APP_MENU_CHANGED,
    APP_THEME_CHANGED,
    APP_LOGOUT
} from '../ActionsType';

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

export function acAppSetMenuState(pData) {
    return {
        type: APP_MENU_CHANGED,
        payload: pData
    };
}

export function acAppChangeTheme(pData) {
    return {
        type: APP_THEME_CHANGED,
        payload: pData
    };
}

export function acAppLogout(pData) {
    return {
        type: APP_LOGOUT
    };
}
