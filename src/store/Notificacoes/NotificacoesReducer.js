import { NOTIFICATIONS_AMOUNT_CHANGED, NOTIFICATIONS_AMOUNT_LOGOUT } from '../../const/actionsType';

const INITIAL_STATE = {
    data: 0
};

const RESET_STATE = {
    ...INITIAL_STATE
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case NOTIFICATIONS_AMOUNT_CHANGED:
            return {
                ...state,
                data: action.payload
            };
        case NOTIFICATIONS_AMOUNT_LOGOUT:
            return {
                ...RESET_STATE
            };

        default:
            return state;
    }
}
