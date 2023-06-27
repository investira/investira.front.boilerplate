import {
    USER_READ,
    USER_READ_USERNAME,
    USER_UPDATE,
    USER_UPDATE_PASSWORD,
    USER_FAVORITE_LIST,
    USER_FAVORITE_UPDATE,
    USER_SUMMARY_LIST,
    USER_SUMMARY_UPDATE
} from '../const/servicesURI';
import { CONFIGS_FAVORITOS, CONFIGS_RESUMOS } from '../enums';
import { validators, httpRequests } from 'investira.sdk';
import requestService from './requestService';
import utils from '../utils';

const cancel = {
    favoriteUpdate: null
};

export const read = (pProps = {}, pResolve, pReject) => {
    return requestService(pProps, USER_READ, 3)
        .then(rRes => {
            return pResolve(rRes);
        })
        .catch(rErr => {
            utils.request.tracer(rErr, 'Error Service User Read');
            return pReject(rErr);
        });
};

export const readUsername = (pProps = {}, pResolve, pReject) => {
    const { username, ...otherProps } = pProps;
    const xProps = {
        ...otherProps
    };

    return requestService(xProps, USER_READ_USERNAME + username)
        .then(rRes => {
            pResolve(rRes);
        })
        .catch(rErr => {
            utils.request.tracer(rErr, 'Error Service User ReadUsername');
            pReject(rErr);
        });
};

export const update = (pProps = {}, pResolve, pReject) => {
    const xProps = {
        ...pProps,
        method: 'patch'
    };

    return requestService(xProps, USER_UPDATE)
        .then(rRes => {
            pResolve(rRes);
        })
        .catch(rErr => {
            utils.request.tracer(rErr, 'Error Service User Update');
            pReject(rErr);
        });
};

export const updatePassword = (pProps = {}, pResolve, pReject, pFinally) => {
    const xProps = {
        ...pProps,
        method: 'patch'
    };

    return requestService(xProps, USER_UPDATE_PASSWORD)
        .then(rRes => {
            pResolve(rRes);
        })
        .catch(rErr => {
            utils.request.tracer(rErr, 'Error Service User UpdatePassword');
            pReject(rErr);
        })
        .finally(() => {
            pFinally && pFinally();
        });
};

export const favoriteUpdate = (pData = {}, pResolve, pReject) => {
    if (cancel.favoriteUpdate) {
        cancel.favoriteUpdate.cancel();
    }

    cancel.favoriteUpdate = httpRequests.cancelToken();

    const xProps = {
        data: { rotas_favoritas: pData },
        method: 'patch',
        cancelToken: cancel.favoriteUpdate.token
    };

    return requestService(xProps, USER_FAVORITE_UPDATE, 3)
        .then(rRes => {
            pResolve && pResolve(rRes);
        })
        .catch(rErr => {
            utils.request.tracer(rErr, 'Error Service User favoriteUpdate');
            pReject && pReject(rErr);
        });
};

export const favoriteList = (pProps = {}, pResolve, pReject) => {
    return requestService(pProps, USER_FAVORITE_LIST, 3)
        .then(rRes => {
            if (!validators.isEmpty(rRes.data)) {
                return pResolve(rRes);
            }

            return favoriteUpdate({ ...CONFIGS_FAVORITOS }, pResolve, pReject)
                .then(rRes => {
                    return pResolve(rRes);
                })
                .catch(rErr => {
                    return pReject(rErr);
                });
        })
        .catch(rErr => {
            utils.request.tracer(rErr, 'Error Service User FavoriteList');
            return pReject(rErr);
        });
};

export const summaryUpdate = (pData = {}, pResolve, pReject) => {
    if (cancel.favoriteUpdate) {
        cancel.favoriteUpdate.cancel();
    }

    cancel.favoriteUpdate = httpRequests.cancelToken();

    const xProps = {
        data: { resumos: pData },
        method: 'patch',
        cancelToken: cancel.favoriteUpdate.token
    };

    return requestService(xProps, USER_SUMMARY_UPDATE, 3)
        .then(rRes => {
            pResolve && pResolve(rRes);
        })
        .catch(rErr => {
            utils.request.tracer(rErr, 'Error Service User summaryUpdate');
            pReject && pReject(rErr);
        });
};

export const summaryList = (pProps = {}, pResolve, pReject) => {
    return requestService(pProps, USER_SUMMARY_LIST, 3)
        .then(rRes => {
            if (!validators.isEmpty(rRes.data)) {
                return pResolve(rRes);
            }

            return summaryUpdate({ ...CONFIGS_RESUMOS }, pResolve, pReject)
                .then(rRes => {
                    return pResolve(rRes);
                })
                .catch(rErr => {
                    return pReject(rErr);
                });
        })
        .catch(rErr => {
            utils.request.tracer(rErr, 'Error Service User summaryList');
            return pReject(rErr);
        });
};

export default {
    read,
    readUsername,
    update,
    updatePassword,
    favoriteList,
    favoriteUpdate,
    summaryList,
    summaryUpdate
};
