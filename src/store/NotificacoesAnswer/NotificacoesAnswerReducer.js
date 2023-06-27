import { NOTIFICATIONS_VIEWED, NOTIFICATIONS_VIEWED_LOGOUT } from '../../const/actionsType';
import { dates } from 'investira.sdk';

const INITIAL_STATE = {
    viewedAt: null
};

const RESET_STATE = {
    ...INITIAL_STATE
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case NOTIFICATIONS_VIEWED:
            return {
                ...state,
                viewedAt: dates.toDate()
            };
        case NOTIFICATIONS_VIEWED_LOGOUT:
            return {
                ...RESET_STATE
            };
        default:
            return state;
    }
}
