import { INFO_CHANGED, INFO_LOGOUT } from '../../const/actionsType';

const INITIAL_STATE = {};

const RESET_STATE = {
    ...INITIAL_STATE
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case INFO_CHANGED:
            return {
                ...state,
                ...action.payload
            };
        case INFO_LOGOUT:
            return {
                ...RESET_STATE
            };
        default:
            return state;
    }
}
