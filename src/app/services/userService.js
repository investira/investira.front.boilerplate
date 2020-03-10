import {
    USER_READ,
    USER_READ_USERNAME,
    USER_UPDATE,
    USER_UPDATE_PASSWORD
} from './servicesURI';

import baseService from './baseService';

export const userService = pProps => {
    const xEndpoints = {
        read: USER_READ,
        'read-username': USER_READ_USERNAME + pProps.username,
        update: USER_UPDATE,
        'update-password': USER_UPDATE_PASSWORD
    };

    return baseService(pProps, xEndpoints);
};

export default userService;
