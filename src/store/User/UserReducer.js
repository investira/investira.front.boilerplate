import { USER_LOADED, USER_LOGOUT, USER_USERNAME_CHANGED } from '../../const/actionsType';

const INITIAL_STATE = {
    name: '',
    name_first: '',
    name_last: '',
    name_middle: '',
    username: '',
    usuario_id: null
};

const RESET_STATE = {
    ...INITIAL_STATE
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                ...action.payload
            };
        case USER_USERNAME_CHANGED:
            return {
                ...state,
                username: action.payload
            };
        case USER_LOGOUT:
            return {
                ...RESET_STATE
            };
        default:
            return state;
    }
}
