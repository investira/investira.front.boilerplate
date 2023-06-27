import { USER_PHOTO_CHANGED, USER_PHOTO_LOGOUT } from '../../const/actionsType';

const INITIAL_STATE = {
    data: ''
};

const RESET_STATE = {
    ...INITIAL_STATE
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case USER_PHOTO_CHANGED:
            return {
                ...state,
                userPhoto: action.payload
            };
        case USER_PHOTO_LOGOUT:
            return {
                ...RESET_STATE
            };

        default:
            return state;
    }
}
