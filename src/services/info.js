import { INFO_URL } from '../const/servicesURI';

import requestService from './requestService';
import utils from '../utils';

export const read = (pProps = {}, pResolve, pReject) => {
    return requestService(pProps, INFO_URL, 3, 2400)
        .then(rRes => {
            return pResolve && pResolve(rRes);
        })
        .catch(rErr => {
            utils.request.tracer(rErr, 'Error Service Info Read');
            return pReject && pReject(rErr);
        });
};

export default { read };
