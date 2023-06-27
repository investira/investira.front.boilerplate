import {
    acAuthLogout,
    acAuthLoginReset,
    acAppLogout,
    acUserPhotoLogout,
    acUserLogout,
    acWsLogout
} from '../store/actions';

export const logout = dispatch => {
    dispatch(acAppLogout());
    dispatch(acAuthLogout());
    dispatch(acAuthLoginReset());
    dispatch(acUserPhotoLogout());
    dispatch(acWsLogout());
    /* Limpar o reducer do usuário deverá sempre ser o último, 
        caso contrario o usuario_id se perderá antes de resetar os outros reducers */
    dispatch(acUserLogout());
};

export default { logout };
