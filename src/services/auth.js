import {
    OAUTH_VERIFY_USERNAME,
    OAUTH_UPDATE_TOKEN,
    OAUTH_LOGIN,
    OAUTH_LOGOUT,
    OAUTH_REGISTER,
    OAUTH_PASSWORD_RESET,
    OAUTH_PASSWORD_RESET_VALIDATE,
    OAUTH_PASSWORD_RESET_CONFIRM
} from '../const/servicesURI';
import requestService from './requestService';
import { httpRequests } from 'investira.sdk';
import utils from '../utils';

const cancel = {
    verify: null
};

export const verify = (pProps = {}, pResolve, pReject) => {
    const { username, ...otherProps } = pProps;

    if (cancel.verify) {
        cancel.verify.cancel();
    }

    cancel.verify = httpRequests.cancelToken();

    const xProps = {
        ...otherProps,
        method: 'get',
        cancelToken: cancel.verify.token
    };

    return requestService(xProps, OAUTH_VERIFY_USERNAME + username)
        .then(rRes => {
            pResolve(rRes);
        })
        .catch(rErr => {
            utils.request.tracer(rErr, 'Error Service Auth Verify');
            pReject(rErr);
        });
};

export const refreshToken = (pProps = {}, pResolve, pReject) => {
    const { username, ...otherProps } = pProps;
    const xProps = {
        ...otherProps,
        method: 'patch'
    };

    return requestService(xProps, OAUTH_UPDATE_TOKEN)
        .then(rRes => {
            pResolve(rRes);
        })
        .catch(rErr => {
            utils.request.tracer(rErr, 'Error Service Auth RefreshToken');
            //TODO: O que fazer se o api/v1/auth falhar?
            pReject(rErr);
        });
};

export const login = (pProps = {}, pResolve, pReject) => {
    const xProps = {
        ...pProps,
        method: 'post'
    };

    return requestService(xProps, OAUTH_LOGIN)
        .then(rRes => {
            pResolve(rRes);
        })
        .catch(rErr => {
            utils.request.tracer(rErr, 'Error Service Auth Login');
            pReject(rErr);
        });
};

export const logout = (pProps = {}, pResolve, pReject) => {
    const xProps = {
        ...pProps,
        method: 'del'
    };

    return requestService(xProps, OAUTH_LOGOUT)
        .then(rRes => {
            pResolve(rRes);
        })
        .catch(rErr => {
            utils.request.tracer(rErr, 'Error Service Auth Logout');
            pReject(rErr);
        });
};

export const register = (pProps = {}, pResolve, pReject) => {
    const xProps = {
        ...pProps,
        method: 'post'
    };

    return requestService(xProps, OAUTH_REGISTER)
        .then(rRes => {
            pResolve(rRes);
        })
        .catch(rErr => {
            utils.request.tracer(rErr, 'Error Service Auth Register');
            pReject(rErr);
        });
};

export const registerConfirm = (pProps = {}, pResolve, pReject) => {
    const { code, ...otherProps } = pProps;
    const xProps = {
        ...otherProps,
        method: 'patch'
    };

    return requestService(xProps, OAUTH_REGISTER + code)
        .then(rRes => {
            pResolve(rRes);
        })
        .catch(rErr => {
            utils.request.tracer(rErr, 'Error Service Auth RegisterConfirm');
            pReject(rErr);
        });
};

export const passwordReset = (pProps = {}, pResolve, pReject) => {
    const xProps = {
        ...pProps,
        method: 'post'
    };

    return requestService(xProps, OAUTH_PASSWORD_RESET)
        .then(rRes => {
            pResolve(rRes);
        })
        .catch(rErr => {
            utils.request.tracer(rErr, 'Error Service Auth PasswordReset');
            pReject(rErr);
        });
};

export const passwordValidate = (pProps = {}, pResolve, pReject) => {
    const { code, ...otherProps } = pProps;
    const xProps = {
        ...otherProps,
        method: 'get'
    };

    return requestService(xProps, OAUTH_PASSWORD_RESET_VALIDATE + code)
        .then(rRes => {
            pResolve(rRes);
        })
        .catch(rErr => {
            utils.request.tracer(rErr, 'Error Service Auth PasswordValidate');
            pReject(rErr);
        });
};

export const passwordConfirm = (pProps = {}, pResolve, pReject) => {
    const { code, ...otherProps } = pProps;
    const xProps = {
        ...otherProps,
        method: 'patch'
    };

    return requestService(xProps, OAUTH_PASSWORD_RESET_CONFIRM + code)
        .then(rRes => {
            pResolve(rRes);
        })
        .catch(rErr => {
            utils.request.tracer(rErr, 'Error Service Auth PasswordConfirm');
            pReject(rErr);
        });
};

export default {
    verify,
    refreshToken,
    login,
    logout,
    register,
    registerConfirm,
    passwordReset,
    passwordValidate,
    passwordConfirm
};
