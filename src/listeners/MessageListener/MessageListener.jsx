import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from 'investira.react.components';
import { acMessageClosed } from '../../store/actions';
import MessageDefault from './MessageDefault';
import MessageSuccess from './MessageSuccess';
import MessageError from './MessageError';
import MessageIntegration from './MessageIntegration';
import MessageNotification from './MessageNotification';

const MessageListener = props => {
    const { isOpen, data, duration, type } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const types = {
        default: MessageDefault,
        success: MessageSuccess,
        error: MessageError,
        chat: MessageNotification,
        integration: MessageIntegration
    };

    const Component = types[type];

    const doMessageClose = () => {
        dispatch(acMessageClosed());
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={isOpen}
            autoHideDuration={duration}
            onClose={doMessageClose}
            ContentProps={{
                'aria-describedby': 'message-id'
            }}>
            <Component doMessageClose={doMessageClose} data={data} />
        </Snackbar>
    );
};

MessageListener.displayName = 'MessageListener';

export default MessageListener;
