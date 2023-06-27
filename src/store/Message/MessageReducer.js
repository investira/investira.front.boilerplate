import { MESSAGE_CHANGED, MESSAGE_CLOSED, MESSAGE_LOGOUT } from '../../const/actionsType';

const INITIAL_STATE = {
    data: {},
    isOpen: false,
    duration: null,
    type: 'default'
};

const RESET_STATE = {
    ...INITIAL_STATE
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case MESSAGE_CHANGED:
            return {
                ...state,
                data: action.payload.data,
                isOpen: true,
                duration: action.payload.duration ? action.payload.duration : state.duration,
                type: action.payload.type ? action.payload.type : 'default'
            };
        case MESSAGE_CLOSED:
            return {
                ...state,
                data: {},
                isOpen: false,
                duration: null
            };
        case MESSAGE_LOGOUT:
            return {
                ...RESET_STATE
            };

        default:
            return state;
    }
}
