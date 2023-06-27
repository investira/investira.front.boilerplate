import {
    NOTIFICATIONS_CHANGED,
    NOTIFICATIONS_IS_FETCHING,
    NOTIFICATIONS_LIST_LOGOUT
} from '../../const/actionsType';
import { dates } from 'investira.sdk';

const INITIAL_STATE = {
    data: {},
    updatedAt: null,
    isFetching: false
};

const RESET_STATE = {
    ...INITIAL_STATE
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case NOTIFICATIONS_CHANGED:
            return {
                ...state,
                data: action.payload.data,
                updatedAt: dates.toDate()
            };
        case NOTIFICATIONS_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            };
        case NOTIFICATIONS_LIST_LOGOUT:
            return {
                ...RESET_STATE
            };
        default:
            return state;
    }
}
