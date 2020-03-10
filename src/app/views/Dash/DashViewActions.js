import { acAuthLogout } from '../../actions';

export function logout() {
    return dispatch => {
        dispatch(acAuthLogout());
    };
}
