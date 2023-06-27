import { validators } from 'investira.sdk';
class WebSocketClient {
    static instance = null;
    callbacks = {};

    static getInstance() {
        if (!WebSocketClient.instance) WebSocketClient.instance = new WebSocketClient();
        return WebSocketClient.instance;
    }

    constructor() {
        this.socketRef = null;
    }

    addCallbacks = (...callbacks) => (this.callbacks = { ...callbacks });

    connect = pConfig => {
        const path = `${pConfig.endpoint}?param=${pConfig.accessToken}`;

        this.socketRef = new WebSocket(path);
        this.socketRef.accessToken = pConfig.accessToken;
        this.socketRef.onopen = () => {
            pConfig.onOpen();
        };

        this.socketRef.onmessage = e => {
            // const xMessages = store.getState().chatMessages.receivers;
            // setTimeout(() => {
            pConfig.onMessage(e);
            // }, 0);
        };

        this.socketRef.onerror = e => {
            pConfig.onError(e);
        };

        this.socketRef.onclose = () => {
            pConfig.onClose();
        };
    };

    close = () => {
        this.socketRef && this.socketRef.close();
    };

    send = pData => {
        if (!validators.isUndefined(pData)) {
            const socket = this.socketRef;
            // const recursion = this.send;
            // setTimeout(() => {
            if (socket.readyState === 1) {
                this.socketRef.send(JSON.stringify(pData));
            } else {
                console.log('erro no send.');
                // setTimeout(() => {
                //     recursion();
                // }, 2000);
            }
            // }, 0);
        }
    };

    state = () => this.socketRef.readyState;

    // Aguarda o estado o socket estar pronto e disponível
    // Realiza uma verificação após 2 segundos
    waitForSocketConnection = callback => {
        const socket = this.socketRef;
        // const recursion = this.waitForSocketConnection;
        // clearTimeout(this.timeout);
        // this.timeout =
        setTimeout(() => {
            if (socket.readyState === 1) {
                // console.log('Connection is made');
                if (callback != null) {
                    callback();
                }
                //return;
            } else {
                console.log('wait for connection...');
                //recursion(callback);
            }
        }, 2000);
    };
}

export default WebSocketClient.getInstance();
