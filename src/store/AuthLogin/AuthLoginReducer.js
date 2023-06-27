import { AUTH_LOGIN, AUTH_IS_FETCHING, AUTH_LOGIN_RESET } from '../../const/actionsType';

const INITIAL_STATE = {
    accessToken: null,
    expiresToken: null,
    isFetching: false
};

const RESET_STATE = {
    ...INITIAL_STATE
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_LOGIN:
            return {
                ...state,
                accessToken: action.payload.access_token,
                expiresToken: action.payload.expires
            };
        case AUTH_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            };
        case AUTH_LOGIN_RESET:
            return {
                ...RESET_STATE
            };
        default:
            return state;
    }
}
