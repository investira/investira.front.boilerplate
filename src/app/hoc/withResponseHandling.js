import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { acMessageTextChanged, acAuthUpdateStatusToken } from '../actions';
import { validators } from 'investira.sdk';
import MESSAGES from '../const/messages';

const handlers = {
    mount: (pToken, pAction, pCompName) => {
        //console.log('mount', pToken, pAction);
        if (pToken.statusChanged && pToken.isUpdated) {
            try {
                pAction();
            } catch (err) {
                console.error(pCompName, `Nenhuma ação definida`, err);
            }
        }
    },
    userAction: (pToken, pAction, pCompName) => {
        //console.log('userAction', pToken, pAction);
        if (pToken.accessChanged && pToken.current === 'renew') {
            try {
                pAction && pAction();
            } catch (err) {
                console.error(pCompName, `Nenhuma ação definida`, err);
            }
        }
    }
};

// Realiza nova tentativa caso o token tenha sido atualizado durante a montagem;

// Realiza nova tentativa caso o token esteja inválido na ação do usuário;

/**
 * Tratamento dos errors da resposta http
 * Recebe o erro http e realiza as ações necessárias e callbacks
 *
 * @param {object} pErr Objeto contendo status, code e ref
 * @param {object} pCallbacks Objeto contento das funcões de callback de acordo com o contexto:
 * - pCallbacks keys: err500, err400, err401, err404
 */

const responseErrorManager = (pErr, pCallbacks = {}, pComponentName) => {
    //console.log(pErr);
    //console.log(pCallbacks);

    // Request cancelado
    if (!validators.isEmpty(pErr.code)) {
        if (pErr.code.status === 404 && Number(pErr.code.ref) === 1) {
            return requestCanceledError(pCallbacks);
        }
        if (pErr.code.status >= 500) {
            return serverError(pErr.status, pCallbacks);
        }
    } else if (!validators.isEmpty(pErr.error)) {
        // Erros do lado do cliente
        if (pErr.status >= 400 && pErr.status < 500) {
            return clientError(pErr.status, pCallbacks);
        }
        // Erros do lado do servidor
        if (pErr.status >= 500) {
            return serverError(pErr.status, pCallbacks);
        }
    } else {
        return internalError(pErr, pCallbacks);
    }
};

// Erro quando um resquest é cancelado
const requestCanceledError = pCallbacks => {
    return dispatch => {
        dispatch({
            type: 'REQUEST_CANCELED'
        });
        pCallbacks.canceled && pCallbacks.canceled();
    };
};

// Erros do cliente
const clientError = (pStatus, pCallbacks, pComponentName) => {
    switch (pStatus) {
        case 400:
            if (pCallbacks.err400) {
                pCallbacks.err400();
                return ignoreError('400');
            } else {
                return messageError(MESSAGES.GENERIC.ERROR);
            }

        case 401: // Define status token para invalid, forçando a renovação
            return dispatch => {
                dispatch(acAuthUpdateStatusToken('invalid'));
            };
        case 404:
            if (pCallbacks.err404) {
                pCallbacks.err404();
                return ignoreError();
            } else {
                return messageError(MESSAGES.GENERIC.ERROR);
            }
        default:
            return messageError(MESSAGES.GENERIC.ERROR);
    }
};

// Erros do servidor
const serverError = (pStatus, pCallbacks) => {
    switch (pStatus) {
        case 500:
            if (pCallbacks.err500) {
                pCallbacks.err500();
                return ignoreError('500');
            } else {
                return messageError(MESSAGES.SERVER.NO_RESPONSE);
            }
        default:
            return messageError(MESSAGES.GENERIC.ERROR);
    }
};

// Qualquer erro que chegue no cacth do request e que não seja um erro de reposta
const internalError = (pErr, pCallbacks) => {
    return dispatch => {
        dispatch({
            type: 'INTERNAL_ERROR'
        });
        pCallbacks.errInternal && pCallbacks.errInternal();
        console.error('Este erro pode ter sido gerado em uma função interna no ".then()" da promessa.', pErr);
    };
};

const ignoreError = (pStatus = '') => {
    return dispatch => {
        dispatch({
            type: `ERROR_${pStatus}_IGNORED`
        });
    };
};

const messageError = (pMessage, pDuration = 4000) => {
    return dispatch => {
        dispatch(acMessageTextChanged({ message: pMessage, duration: pDuration }));
    };
};

const customMessage = (pMessage, pCallback) => {
    pCallback && pCallback();
    return messageError(pMessage);
};

// Dispara mensagem de offline
const offline = pCallback => {
    if (pCallback) {
        pCallback();
        return ignoreError('OFFLINE');
    } else {
        return messageError(MESSAGES.STATUS.OFFLINE);
    }
};

// Decorator
const withResponseHandling = Component => {
    const wrapComponent = props => {
        //console.log(props);

        const handleErrorRender = pError => {
            if (pError) {
                throw new Error(pError);
            }
        };

        const handleRetry = (pPrevProps, pAction) => {
            const xToken = {
                prev: pPrevProps.statusToken,
                current: props.statusToken,
                statusChanged: pPrevProps.statusToken !== props.statusToken,
                accessChanged: pPrevProps.accessToken !== props.accessToken,
                isUpdated: pPrevProps.statusToken === 'updating' && props.statusToken === 'valid'
            };

            return {
                mount: () => handlers.mount(xToken, pAction),
                userAction: () => handlers.userAction(xToken, pAction)
            };
        };

        const isValidToken = pAction => {
            if (props.statusToken === 'valid') {
                pAction && pAction();
            }
        };

        const responseErrorHandling = (pErr, pCallbacks) => {
            props.responseErrorManager(pErr, pCallbacks, props.name);
        };

        return (
            <Component
                {...props}
                responseErrorHandling={responseErrorHandling}
                retry={handleRetry}
                errorRender={handleErrorRender}
                isValidToken={isValidToken}
            />
        );

        //Add propTypes
    };

    return connect(mapStateToProps, mapDispatchToProps)(wrapComponent);
};

const mapStateToProps = state => {
    return {
        accessToken: state.auth.accessToken,
        statusToken: state.auth.statusToken,
        server: state.server.status
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            responseErrorManager,
            offline,
            customMessage
        },
        dispatch
    );
};

export default withResponseHandling;
