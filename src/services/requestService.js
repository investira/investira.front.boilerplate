import { httpRequests, validators } from 'investira.sdk';
import store from '../store';
import utils from '../utils';

export const requestService = (pProps, pUrl, pRetries = 1, pDelay = 5000) => {
    const xToken = store.getState().authLogin.accessToken;

    let xProps = {
        url: pUrl,
        ...(!validators.isNull(pProps.cancelToken) && { cancelToken: pProps.cancelToken }),
        headers: {
            ...pProps.headers,
            ...(xToken && { Authorization: `Bearer ${xToken}` })
        },
        ...(!validators.isEmpty(pProps.params) && {
            params: {
                ...pProps.params,
                ...(!validators.isEmpty(pProps.params.pesquisa) && {
                    pesquisa: decodeURI(pProps.params.pesquisa)
                })
            }
        }),
        ...(!validators.isEmpty(pProps.data) && { data: pProps.data }),
        timeout: pProps.timeout || 24000
    };

    const xMethod = pProps.method ? pProps.method.toLowerCase() : 'get';

    const xRequest = {
        get: httpRequests.requestGET,
        post: httpRequests.requestPOST,
        patch: httpRequests.requestPATCH,
        delete: httpRequests.requestDELETE
    };

    return utils.request.retry(
        pNewToken => {
            // const xToken = store.getState().authLogin.accessToken;
            xProps = {
                ...xProps,
                headers: {
                    ...xProps.headers,
                    ...(!validators.isEmpty(pNewToken) && { Authorization: `Bearer ${pNewToken}` })
                }
            };

            return xRequest[xMethod](xProps);
        },
        pRetries,
        pDelay
    );
};

export default requestService;
