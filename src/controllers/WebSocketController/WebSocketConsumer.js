import React, { memo } from 'react';
import WebSocketContext from './WebSocketContext';

const WebSocketConsumer = memo(props => {
    return (
        <WebSocketContext.Consumer>
            {values => {
                return React.Children.map(props.children, child => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, { ...values });
                    }
                    return null;
                });
            }}
        </WebSocketContext.Consumer>
    );
});

export default WebSocketConsumer;
