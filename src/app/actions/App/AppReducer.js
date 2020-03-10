import {
    APP_CONNECTION_CHANGED,
    APP_LOCATION_CHANGED,
    APP_VISIBILITY_CHANGED,
    APP_MENU_CHANGED,
    APP_THEME_CHANGED,
    APP_LOGOUT
} from '../ActionsType';

const INITIAL_STATE = {
    online: false,
    visibility: 'visible',
    location: 'root',
    theme: 'theme-primary',
    menu: false,
    push_allowed: false
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case APP_LOCATION_CHANGED:
            return {
                ...state,
                location: action.payload
            };
        case APP_CONNECTION_CHANGED:
            return {
                ...state,
                online: action.payload
            };
        case APP_VISIBILITY_CHANGED:
            return {
                ...state,
                visibility: action.payload
            };
        case APP_MENU_CHANGED:
            return {
                ...state,
                menu: action.payload
            };
        case APP_THEME_CHANGED:
            return {
                ...state,
                theme: action.payload
            };
        case APP_LOGOUT:
            return {
                ...state
            };
        default:
            return state;
    }
}
