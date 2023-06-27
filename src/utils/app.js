import store from '../store';

import {
    acAuthIsFetching,
    acAuthLogout,
    acAuthUpdateStatusToken,
    acAuthLoginReset,
    acAppLogout,
    acUserPhotoLogout,
    acUserLogout,
    acNotificationsAmountLogout,
    acNotificationsViewLogout,
    acNotificationsLogout,
    acWsLogout
} from '../store/actions';

const logout = () => {
    const { dispatch } = store;

    dispatch(acNotificationsLogout());
    dispatch(acNotificationsAmountLogout());
    dispatch(acNotificationsViewLogout());
    dispatch(acAppLogout());
    dispatch(acAuthLogout());
    dispatch(acAuthIsFetching(false));
    dispatch(acAuthLoginReset());
    dispatch(acAuthUpdateStatusToken(null));
    dispatch(acWsLogout());
    dispatch(acUserPhotoLogout());
    /* Limpar o reducer do usuário deverá sempre ser o último, 
        caso contrario o usuario_id se perderá antes de resetar os outros reducers */
    dispatch(acUserLogout());
};

export default { logout };
