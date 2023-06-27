import React from 'react';
import store from '../store';
import { renders } from 'investira.react.lib';
import { MESSAGE_CHANGED } from '../const/actionsType';

const withMessage = Component => {
    function WrapComponent(props) {
        function dispatchMessage(pData, pType) {
            const xPayload = {
                type: MESSAGE_CHANGED,
                payload: {
                    data: pData,
                    duration: renders.messageDuration(pData.message),
                    type: pType
                }
            };

            store.dispatch(xPayload);
        }

        const handleMessage = pMsg => {
            dispatchMessage({ message: pMsg }, 'default');
        };

        const handleMessageNotification = pData => {
            dispatchMessage(pData, 'chat');
        };

        const handleMessageIntegration = (pMsg = 'Sincronismo iniciado.') => {
            dispatchMessage({ message: pMsg }, 'integration');
        };

        const handleMessageSuccess = pMsg => {
            dispatchMessage({ message: pMsg }, 'success');
        };

        const handleMessageError = pMsg => {
            dispatchMessage({ message: pMsg }, 'error');
        };

        const xProps = {
            ...props,
            onMessage: handleMessage,
            onMessageNotification: handleMessageNotification,
            onMessageIntegration: handleMessageIntegration,
            onMessageSuccess: handleMessageSuccess,
            onMessageError: handleMessageError
        };

        return <Component {...xProps} />;
    }

    return WrapComponent;
};

export default withMessage;
