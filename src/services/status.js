import { STATUS_URL } from '../const/servicesURI';
import { httpRequests } from 'investira.sdk';
import requestService from './requestService';
import utils from '../utils';

export const cancel = {
    read: null,
    readtest: null
};

export const read = (pProps = {}, pResolve, pReject) => {
    if (cancel.read) {
        cancel.read.cancel();
    }

    cancel.read = httpRequests.cancelToken();

    const xProps = {
        ...pProps,
        cancelToken: cancel.read.token
    };

    return requestService(xProps, STATUS_URL, 3, 2400)
        .then(rRes => {
            return pResolve && pResolve(rRes);
        })
        .catch(rErr => {
            utils.request.tracer(rErr, 'Error Service Status Read Test');
            return pReject && pReject(rErr);
        });
};

export const readtest = (pProps = {}, pResolve, pReject) => {
    if (cancel.readtest) {
        cancel.readtest.cancel();
    }

    cancel.readtest = httpRequests.cancelToken();

    const xProps = {
        ...pProps,
        cancelToken: cancel.readtest.token
    };

    return requestService(xProps, `${STATUS_URL}2`, 3, 2400)
        .then(rRes => {
            return pResolve && pResolve(rRes);
        })
        .catch(rErr => {
            utils.request.tracer(rErr, 'Error Service Status Read Test');
            return pReject && pReject(rErr);
        });
};

export default { read, readtest, cancel };
