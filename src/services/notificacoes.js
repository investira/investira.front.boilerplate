import { NOTIFICACAO_LIST, NOTIFICACAO_RESPONDER } from '../const/servicesURI';
import requestService from './requestService';
import utils from '../utils';

// const cancel = {
//     list: null
// };

/**
 * Lista de notificações
 * @param {object} pProps
 * @param {function} pResolve
 * @param {function} pReject
 */
export const list = (pProps, pResolve, pReject) => {
    const xProps = {
        size: 100,
        ...pProps,
        method: 'get'
    };

    return requestService(xProps, NOTIFICACAO_LIST, 3)
        .then(rRes => {
            return pResolve(rRes);
        })
        .catch(rErr => {
            utils.request.tracer(rErr, 'Error Service Notificacoes List');
            return pReject(rErr);
        });
};

/**
 * Lista de notificações
 * @param {object} pProps
 * @param {function} pResolve
 * @param {function} pReject
 */
export const reply = (pProps, pResolve, pReject) => {
    const xProps = {
        ...pProps,
        method: 'post'
    };
    return requestService(xProps, NOTIFICACAO_RESPONDER)
        .then(rRes => {
            pResolve(rRes);
        })
        .catch(rErr => {
            utils.request.tracer(rErr, 'Error Service Notificacoes Reply');
            pReject(rErr);
        });
};

export default { list, reply };
