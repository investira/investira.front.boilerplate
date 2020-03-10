import { httpRequests } from 'investira.sdk';

export const baseService = (pProps, pEndpoints) => {
    let xAuthorization = {};
    const xUrlEndpoint = pEndpoints;

    if (pProps.headers && pProps.headers.Authorization) {
        xAuthorization = {
            Authorization: `Bearer ${pProps.headers.Authorization}`
        };
    }

    const xProps = {
        url: xUrlEndpoint[pProps.endpoint],
        cancelToken: pProps.cancelToken,
        headers: {
            ...pProps.headers,
            ...xAuthorization
        },
        params: { ...pProps.params },
        data: { ...pProps.data }
    };

    const xMethod = pProps.method ? pProps.method.toLowerCase() : 'get';

    const xRequest = {
        get: httpRequests.requestGET,
        post: httpRequests.requestPOST,
        patch: httpRequests.requestPATCH,
        delete: httpRequests.requestDELETE
    };

    return xRequest[xMethod](xProps);
};

export default baseService;
