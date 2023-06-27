import { AUTH_UPDATED, AUTH_LOGOUT, AUTH_STATUS_TOKEN_UPDATED } from '../../const/actionsType';
import { dates } from 'investira.sdk';

const INITIAL_STATE = {
    isLoggedIn: false,
    isFirstLogin: true,
    statusToken: null,
    lastAccess: ''
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_UPDATED:
            return {
                ...state,
                isFirstLogin: false,
                isLoggedIn: true,
                lastAccess: dates.toDate()
            };
        case AUTH_STATUS_TOKEN_UPDATED:
            return {
                ...state,
                statusToken: action.payload
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                isFirstLogin: false,
                statusToken: null,
                lastAccess: ''
            };

        default:
            return state;
    }
}
