import authService from '../../services/authService';
import userService from '../../services/userService';

import {
    acAuthLogout,
    acAuthUpdateToken,
    acAuthUpdateStatusToken,
    acMessageTextChanged,
    acMessageClosed,
    acAppSetConectionState,
    acAppSetVisibilityState,
    acUserData
} from '../../actions';

import { validators, responses } from 'investira.sdk';
import { browsers } from 'investiraLib';

export function verifyTokenExpires(pExpiresToken) {
    const xCurrentDate = new Date().getTime();
    const xExpiresDate = new Date(pExpiresToken).getTime();

    return xCurrentDate > xExpiresDate;
}

export function doUpdateToken(pCurrentToken, pExpiresToken, pStatusToken) {
    if (verifyTokenExpires(pExpiresToken) || pStatusToken === 'invalid') {
        return dispatch => {
            dispatch(acAuthUpdateStatusToken('updating'));

            authService({
                endpoint: 'update',
                method: 'PATCH',
                headers: {
                    Authorization: pCurrentToken
                }
            })
                .then(rRes => {
                    const xNewToken = responses.getObjData(rRes, 'access_token');
                    const xData = {
                        access_token: xNewToken,
                        statusToken: pCurrentToken !== xNewToken ? 'renew' : 'valid',
                        expires: responses.getObjData(rRes, 'expires')
                    };

                    if (validators.isEmpty(responses.getObjData(rRes))) {
                        console.log('Resposta vazia');
                        dispatch(acAuthLogout());
                    } else {
                        dispatch(acAuthUpdateToken(xData));
                    }
                })
                .catch(rErr => {
                    console.log('Erro na requisição');
                    console.log('doUpdateToken', rErr);
                    dispatch(acAuthLogout());
                });
        };
    } else {
        return {
            type: 'NO_EXPIRED'
        };
    }
}

export function getUserData(pAccessToken) {
    return dispatch => {
        userService({
            endpoint: 'read',
            method: 'get',
            headers: {
                Authorization: pAccessToken
            }
        })
            .then(rRes => {
                dispatch(acUserData(rRes.data));
            })
            .catch(rErr => {
                dispatch(acAuthLogout());
            });
    };
}

export function updateStatusToken(pValue) {
    return dispatch => {
        dispatch(acAuthUpdateStatusToken(pValue));
    };
}

export function doMessageClose() {
    return dispatch => {
        dispatch(acMessageClosed());
    };
}

export const updateStatusConection = () => {
    let xConection = browsers.isOnline();
    return dispatch => {
        dispatch(acAppSetConectionState(xConection));

        if (xConection === false) {
            dispatch(
                acMessageTextChanged({
                    message:
                        'Sem conexão com a Internet. O Wi-fi ou Rede de Dados do celular devem estar ativos.',
                    duration: null
                })
            );
        } else {
            dispatch(acMessageClosed());
        }
    };
};

export const updateStatusTabVisibility = () => {
    return dispatch => {
        dispatch(acAppSetVisibilityState(document.visibilityState));
    };
};
