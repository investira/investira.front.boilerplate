import React from 'react';
import { renders } from 'investira.react.lib';
import { useDispatch } from 'react-redux';
import { acMessageTextChanged } from '../store/actions';
import { validators } from 'investira.sdk';
import { MESSAGES } from '../const';

/**
 * Tratamento dos errors da resposta http
 * Recebe o erro http e realiza as ações necessárias e callbacks
 *
 * @param {object} pErr Objeto contendo status, code e ref
 * @param {object} pCallbacks Objeto contento das funcões de callback de acordo com o contexto:
 * - pCallbacks keys: err500, err400, err401, err404
 */

const responseErrorManager = (pDispatch, pErr, pCallbacks = {}) => {
    const xErrCode = pErr.code || pErr.error?.code;

    if (validators.isNull(xErrCode)) {
        return serverError(pDispatch, 500, pCallbacks);
    }

    if (!validators.isEmpty(xErrCode)) {
        // Erros do lado do servidor
        if (xErrCode.status >= 500) {
            return serverError(pDispatch, xErrCode.status, pCallbacks);
        }

        // Senha inválida
        if (xErrCode.status === 401 && Number(xErrCode.ref) === 103) {
            return messageError(pDispatch, MESSAGES.LOGIN.PASSWORD_WRONG);
        }

        // Request cancelado
        if (xErrCode.status === 404 && Number(xErrCode.ref) === 1) {
            return requestCanceledError(pDispatch, pCallbacks);
        }

        // Erros do lado do cliente
        if (xErrCode.status >= 400 && xErrCode.status < 500) {
            return clientError(pDispatch, xErrCode.status, pCallbacks);
        }
    } else {
        return internalError(pDispatch, xErrCode, pCallbacks);
    }
};

// Tratamento quando um resquest é cancelado
const requestCanceledError = (pDispatch, pCallbacks) => {
    return pDispatch => {
        pDispatch({
            type: 'REQUEST_CANCELED'
        });
        pCallbacks.canceled && pCallbacks.canceled();
    };
};

// Tratamento de erros do cliente
const clientError = (pDispatch, pStatus, pCallbacks) => {
    switch (pStatus) {
        case 400:
            if (pCallbacks.err400) {
                pCallbacks.err400();
                return ignoredError(pDispatch, '400');
            } else {
                console.log('clientError messageError');
                return messageError(pDispatch, MESSAGES.GENERIC.ERROR);
            }

        case 401: // Define status token para invalid, forçando a renovação
            return authError(pDispatch, '401');

        case 404:
            if (pCallbacks.err404) {
                pCallbacks.err404();
                return ignoredError(pDispatch);
            } else {
                return messageError(pDispatch, MESSAGES.GENERIC.ERROR);
            }
        default:
            return messageError(pDispatch, MESSAGES.GENERIC.ERROR);
    }
};

// Tratamento de erros do servidor
const serverError = (pDispatch, pStatus, pCallbacks) => {
    switch (pStatus) {
        case 500:
            if (pCallbacks.err500) {
                pCallbacks.err500();
                return ignoredError(pDispatch, '500');
            } else {
                return messageError(pDispatch, MESSAGES.SERVER.NO_RESPONSE);
            }
        default:
            return messageError(pDispatch, MESSAGES.GENERIC.ERROR);
    }
};

// Qualquer erro que chegue no catch do request e que não seja um erro http
const internalError = (pDispatch, pErr, pCallbacks) => {
    pDispatch({
        type: 'INTERNAL_ERROR'
    });
    console.error(
        'Este não é um erro de resposta. Provavelmente ocorrido no .then() da promise',
        pErr
    );
    pCallbacks.errInternal && pCallbacks.errInternal();
};

// Ignora o erro
const ignoredError = (pDispatch, pStatus = '') => {
    pDispatch({
        type: `ERROR_${pStatus}_IGNORED`
    });
};

const authError = (pDispatch, pStatus = '') => {
    pDispatch({
        type: `ERROR_${pStatus}_AUTH`
    });
};

// Dispara uma mensagem de erro
const messageError = (pDispatch, pMessage) => {
    pDispatch(
        acMessageTextChanged({
            data: { message: pMessage },
            duration: renders.getTimeFromTextLength(pMessage.length),
            type: 'error'
        })
    );
};

// HOC
const withResponseHandling = Component => {
    function WrapComponentWithResponseHandling(props) {
        const dispatch = useDispatch();
        const handleErrorRender = pError => {
            if (pError) {
                throw new Error(pError);
            }
        };

        const handleErrorResponse = (pErr, pCallbacks) => {
            responseErrorManager(dispatch, pErr, pCallbacks);
        };

        return (
            <Component
                {...props}
                responseErrorHandling={handleErrorResponse}
                errorRender={handleErrorRender}
            />
        );
    }

    return WrapComponentWithResponseHandling;
};

export default withResponseHandling;
