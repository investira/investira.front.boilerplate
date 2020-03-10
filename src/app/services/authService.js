import {
    OAUTH_VERIFY_USERNAME,
    OAUTH_REGISTER_CODE_VALIDATE,
    OAUTH_UPDATE_TOKEN,
    OAUTH_LOGIN,
    OAUTH_LOGOUT,
    OAUTH_REGISTER,
    OAUTH_PASSWORD_RESET,
    OAUTH_PASSWORD_RESET_VALIDATE,
    OAUTH_PASSWORD_RESET_CONFIRM
} from './servicesURI';

import baseService from './baseService';

export const authService = pProps => {
    const xEndpoints = {
        verify: OAUTH_VERIFY_USERNAME + pProps.username,
        update: OAUTH_UPDATE_TOKEN,
        login: OAUTH_LOGIN,
        logout: OAUTH_LOGOUT
    };

    return baseService(pProps, xEndpoints);
};

export default authService;
