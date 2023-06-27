import React from 'react';
import WebSocketProvider from './WebSocketProvider';

const WebSocketController = props => {
    return <WebSocketProvider>{props.children}</WebSocketProvider>;
};

WebSocketController.displayName = 'WebSocketController';

export default WebSocketController;
