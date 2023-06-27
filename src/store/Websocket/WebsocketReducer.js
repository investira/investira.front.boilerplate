import { WS_NOTIFICATION_CHANGED, WS_CONNECTED_CHANGED, WS_LOGOUT } from '../../const/actionsType';
import { dates } from 'investira.sdk';

const INITIAL_STATE = {
    notificacoes: {
        data: {},
        updatedAt: null
    },
    connected: false
};

const RESET_STATE = {
    ...INITIAL_STATE
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case WS_NOTIFICATION_CHANGED:
            return {
                ...state,
                notificacoes: {
                    ...state.notificacoes,
                    data: action.payload,
                    updatedAt: dates.toDate()
                }
            };
        case WS_CONNECTED_CHANGED:
            return {
                ...state,
                connected: action.payload
            };
        case WS_LOGOUT:
            return {
                ...RESET_STATE
            };

        default:
            return state;
    }
}
