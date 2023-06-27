import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { validators } from 'investira.sdk';
import {
    acWsConnectedChanged,
    acNotificationsChanged,
    acNotificationsAmountChanged
} from '../../store/actions';
import { countNewNotifications } from '../../utils/helpers';
import services from '../../services';
import WebSocketContext from './WebSocketContext';
import WebSocketClient from './WebSocketClient';
import usePrevious from '../../hooks/usePrevious';

const ENDPOINT = process.env.REACT_APP_WS_URI;

const WebSocketProvider = props => {
    const isVisible = useSelector(state => state.app.visibility);
    const accessToken = useSelector(state => state.authLogin.accessToken);
    const isOnline = useSelector(state => state.app.online);
    const isConnected = useSelector(state => state.websocket.connected);
    const notificacoes = useSelector(state => state.notificacoesList.data);
    const newNotificacoes = useSelector(state => state.newNotificacoes.data);
    const dispatch = useDispatch();

    const retryTimeout = useRef(null);
    const isMount = useRef(null);

    const prevVisibility = usePrevious(isVisible);

    const STATUS = [null, 'connecting', 'opened', 'ready', 'closed', 'disconnected'];

    const [wsStatus, setWsStatus] = useState(STATUS[0]);

    // 0 => null, 1 => connecting, 2 => opened, 3 => ready, 4 => closed, 5 => disconnected,
    const updateWsStatus = pStatus => {
        isMount.current && setWsStatus(STATUS[pStatus]);
    };

    const updateStoreConnection = pIsConnected => {
        dispatch(acWsConnectedChanged(pIsConnected));
    };

    /*
     * Notificações
     *
     */

    function notificacoesChanged(pData) {
        const xCurrentData = notificacoes;
        const xCurrentAmount = newNotificacoes;
        const xPayload = {
            data: pData
        };

        dispatch(acNotificationsChanged(xPayload));
        dispatch(
            acNotificationsAmountChanged(
                xCurrentAmount + countNewNotifications(pData, xCurrentData)
            )
        );
    }

    const onNotificationManager = pMessage => {
        const xNotificationsStore = notificacoes;
        const xKey = pMessage._rid;
        let xPayload = { ...xNotificationsStore, [xKey]: pMessage };

        notificacoesChanged(xPayload);
    };

    /*
     * Websocket
     *
     */

    // Controle quando a conexão foi encerrada
    const onClosed = async () => {
        updateStoreConnection(false);

        await services.info.read(
            {},
            rRes => {
                if (isMount.current) {
                    clearTimeout(retryTimeout.current);
                }
            },
            rErr => {
                // Se o token invalid não executar.
                clearTimeout(retryTimeout.current);
            }
        );

        updateWsStatus(4); //closed
    };

    // Controle quando foi conectado

    const onOpened = pToken => {
        updateWsStatus(2); //opened
    };

    // Controle quando foi descontectado

    const onDisconnected = async () => {
        updateStoreConnection(false);

        await services.info.read(
            {},
            rRes => {
                if (isMount.current) {
                    clearTimeout(retryTimeout.current);
                }
            },
            rErr => {
                // Se o token invalid não executar.
                clearTimeout(retryTimeout.current);
            }
        );

        updateWsStatus(5); //disconnected
    };

    // Gerencia nova mensagem
    function onMessage(pMessage) {
        const xMessage = JSON.parse(pMessage.data);
        const xIsNotification = xMessage.route === 'CT';

        const xMessageData = xMessage.data;

        if (xIsNotification) {
            onNotificationManager(xMessageData);
        }
    }

    const handleSend = (pMessage, pRoute) => {
        const xMessage = {
            route: pRoute,
            data: {
                ...pMessage
            }
        };
        WebSocketClient.send(xMessage);
    };

    const wsConnect = async pToken => {
        updateWsStatus(1); //connecting
        await WebSocketClient.connect({
            endpoint: ENDPOINT,
            accessToken: pToken,
            onOpen: () => onOpened(),
            onClose: e => onClosed(e),
            onError: e => onDisconnected(e),
            onMessage: onMessage
        });

        WebSocketClient.waitForSocketConnection(() => {
            updateWsStatus(3); //ready
            updateStoreConnection(true);
        });
    };

    const wsClose = async () => {
        WebSocketClient.close();
    };

    useEffect(() => {
        isMount.current = true;

        return () => {
            clearTimeout(retryTimeout.current);
            isMount.current = false;
            WebSocketClient.close();
        };
    }, []);

    // Tenta conectar toda vez que que os status da rede muda ou o token muda, caso já não esteja conectado
    // Aqui tem um bug caso adicone o "isConnected" como atributo para ser escutado
    useEffect(() => {
        const xStatus = pStatus => {
            return pStatus === STATUS[0] || pStatus === STATUS[4] || pStatus === STATUS[5];
        };

        if (!isConnected && isOnline && xStatus(wsStatus)) {
            clearTimeout(retryTimeout.current);

            retryTimeout.current = setTimeout(() => {
                wsConnect(accessToken);
            }, 2000);
        }
    }, [isOnline, accessToken, wsStatus]);

    // Fecha a conexão atual assim que retornar para aba ou app
    useEffect(() => {
        if (
            !validators.isNull(prevVisibility) &&
            prevVisibility === 'hidden' &&
            isVisible === 'visible'
        ) {
            wsClose();
        }
    }, [isVisible, prevVisibility]);

    return (
        <WebSocketContext.Provider value={{ send: handleSend }}>
            {props.children}
        </WebSocketContext.Provider>
    );
};

export default WebSocketProvider;
