import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import withResponseHandling from '../../hoc/withResponseHandling';

const StoreListener = memo(props => {
    const webSocketConnected = useSelector(state => state.websocket.connected);

    useEffect(() => {
        // Quando o socket conectar
        if (webSocketConnected) {
            console.info('WebSocket conectado');
        }
    }, [webSocketConnected]);

    return null;
});

StoreListener.displayName = 'StoreListener';

export default withResponseHandling(StoreListener);
