import { validators } from 'investira.sdk';
import store from '../store';
import services from '../services';
import app from '../utils/app';

import { acAuthIsFetching, acAuthLogin, acAuthUpdateStatusToken } from '../store/actions';

/**
 * Realiza uma nova tentativa request em caso de erro com um númemro total de tentativas
 *
 * @constructor
 * @param {Function} pAction Função a ser executada
 * @param {Number} pRetries Número máximo de tentativas
 * @param {Number} pDelay Intervalo de tempo entre cada tentativa
 * @return {Promise}
 */

//let updatedToken = null;

export const mock = new Promise((res, rej) => {
    setTimeout(() => {
        res('resposta');
    }, 2000);
});

export const tracer = (pErr, pMessage) => {
    const TRACER_ENABLED = process.env.REACT_APP_TRACER_ENABLED;

    if (TRACER_ENABLED) {
        const xErrCode = pErr.code || pErr.error?.code;

        // Request cancelado
        if (xErrCode && xErrCode.status === 404 && Number(xErrCode.ref) === 1) {
            return;
        }

        console.info(pErr.message, xErrCode);
        console.trace(pErr, pMessage);
    }
};

export const retry = async (pFn, pRetries, pDelay) => {
    let xToken = store.getState().authLogin.accessToken;
    let xStatusToken = store.getState().auth.statusToken;

    // Passthrough sempre que o token não existir
    if (validators.isNull(xToken)) {
        return new Promise((pResolve, pReject) => {
            pFn(xToken).then(pResolve).catch(pReject);
        });
    }

    return new Promise((pResolve, pReject) => {
        pFn(xToken)
            .then(pResolve)
            .catch(async rErr => {
                const xErrCode = rErr.code || rErr.error?.code;

                // Erro de autenticação
                if (xErrCode && xErrCode.status === 401 && Number(xErrCode.ref) === 105) {
                    // Se o token estiver expirado, atualiza o token
                    store.dispatch(acAuthIsFetching(true));
                    store.dispatch(acAuthUpdateStatusToken('updating'));

                    await services.auth.refreshToken(
                        {},
                        rRes => {
                            console.log('Token atualizado');
                            xToken = rRes.data.access_token;

                            store.dispatch(acAuthLogin(rRes.data));
                            store.dispatch(acAuthIsFetching(false));
                            store.dispatch(acAuthUpdateStatusToken('valid'));
                        },
                        rErr => {
                            tracer(rErr, 'Erro ao atualizar token');
                            if (
                                rErr.code.status === 400 &&
                                (xStatusToken === 'updating' || xStatusToken === 'valid')
                            ) {
                                return;
                            }

                            app.logout();
                            pReject && pReject(rErr);
                            return;
                        }
                    );
                }

                // Evita realizar nova tentativa quando o request é cancelado
                if (xErrCode && xErrCode.status === 404 && Number(xErrCode.ref) === 1) {
                    pReject(rErr);
                    return;
                }

                setTimeout(() => {
                    // Verifica se esgotou a quantidade de tentativas
                    if (pRetries === 1) {
                        store.dispatch(acAuthIsFetching(false));
                        pReject(rErr);
                        return;
                    }

                    // Realiza nova tentativa
                    retry(pFn, pRetries - 1, pDelay).then(pResolve, pReject);
                }, pDelay);
            });
    });
};

export default { retry, mock, tracer };
