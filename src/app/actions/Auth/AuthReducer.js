import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_TOKEN_UPDATED, AUTH_STATUS_TOKEN_UPDATED } from '../ActionsType';

const INITIAL_STATE = {
    accessToken: null,
    isLoggedIn: false,
    isFirstLogin: true,
    statusToken: null,
    expiresToken: null,
    lastAccess: ''
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_LOGIN:
            return {
                ...state,
                accessToken: action.payload.access_token,
                isFirstLogin: false,
                isLoggedIn: true,
                statusToken: 'valid',
                expiresToken: action.payload.expires,
                lastAccess: new Date()
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                accessToken: null,
                statusToken: null,
                expiresToken: null,
                lastAccess: ''
            };
        case AUTH_TOKEN_UPDATED:
            return {
                ...state,
                accessToken: action.payload.access_token,
                isLoggedIn: true,
                statusToken: action.payload.statusToken || 'valid',
                expiresToken: action.payload.expires
            };
        case AUTH_STATUS_TOKEN_UPDATED:
            return {
                ...state,
                statusToken: action.payload
                //expiresToken: action.payload.expires
            };
        default:
            return state;
    }
}
