import { USER_LOADED, USER_LOGOUT, USER_USERNAME_CHANGED, USER_PHOTO_CHANGED } from '../ActionsType';

const INITIAL_STATE = {
    name: '',
    name_first: '',
    name_last: '',
    name_middle: '',
    username: '',
    usuario_id: null,
    photo: ''
};

export default function(state = INITIAL_STATE, action) {
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
        case USER_PHOTO_CHANGED:
            return {
                ...state,
                photo: action.payload
            };
        case USER_LOGOUT:
            return {
                ...state,
                name: '',
                name_first: '',
                name_last: '',
                name_middle: '',
                username: '',
                usuario_id: null,
                photo: ''
            };

        default:
            return state;
    }
}
