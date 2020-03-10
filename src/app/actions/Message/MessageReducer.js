import {
    MESSAGE_CHANGED,
    MESSAGE_CLOSED,
    MESSAGE_LOGOUT
} from '../ActionsType';

const INITIAL_STATE = {
    _messageText: '',
    _messageOpen: false,
    _messageDuration: null
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case MESSAGE_CHANGED:
            return {
                ...state,
                _messageText: action.payload.message,
                _messageOpen: true,
                _messageDuration: action.payload.duration
                    ? action.payload.duration
                    : state._messageDuration
            };
        case MESSAGE_CLOSED:
            return {
                ...state,
                _messageText: '',
                _messageOpen: false
            };
        case MESSAGE_LOGOUT:
            return {
                ...state,
                _messageText: '',
                _messageOpen: false,
                _messageDuration: null
            };

        default:
            return state;
    }
}
