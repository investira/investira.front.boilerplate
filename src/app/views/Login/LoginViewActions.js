import { responses } from 'investira.sdk';
import { browsers, renders } from 'investiraLib';
import { authService } from '../../services/authService';
import { acAuthLogin, acMessageTextChanged } from '../../actions';
import MESSAGES from '../../const/messages';

const errorHandling = (pResp, pDispatch, pCallback) => {
    const xStatusCode = responses.getStatusCode(pResp);

    switch (xStatusCode) {
        case 500:
            pDispatch(
                acMessageTextChanged({
                    message: MESSAGES.SERVER.ERROR,
                    duration: renders.getTimeFromTextLength(MESSAGES.SERVER.ERROR.length)
                })
            );
            break;
        case 401:
            pDispatch(
                acMessageTextChanged({
                    message: MESSAGES.LOGIN.PASSWORD_WRONG,
                    duration: renders.getTimeFromTextLength(MESSAGES.LOGIN.PASSWORD_WRONG.length)
                })
            );
            break;
        default:
            pDispatch(
                acMessageTextChanged({
                    message: MESSAGES.GENERIC.ERROR,
                    duration: renders.getTimeFromTextLength(MESSAGES.GENERIC.ERROR.length)
                })
            );
            break;
    }

    pCallback();
};

const successHandling = (pResp, pDispatch, pCallback) => {
    pDispatch(acAuthLogin(responses.getObjData(pResp)));
    //pDispatch(acUserData(responses.getObjData(pResp)));
    pCallback();
};

const resolveCallback = (pResp, pDispatch, pCallback) => {
    if (pResp.status === 200) {
        successHandling(pResp, pDispatch, pCallback);
    }
};

const rejectCallback = (pError, pDispatch, pCallback, pCallbackError) => {
    errorHandling(pError, pDispatch, pCallback);

    pCallback();
    pCallbackError();
};

export function doLogin(formData, pCallback, pError) {
    return dispatch => {
        browsers.isOnline()
            ? authService({
                  method: 'POST',
                  endpoint: 'login',
                  data: {
                      username: formData.username,
                      password: formData.password
                  }
              })
                  .then(rRes => {
                      resolveCallback(rRes, dispatch, pCallback);
                  })
                  .catch(rErr => {
                      rejectCallback(rErr, dispatch, pCallback, pError);
                  })
            : LoginPasswordOfflineMessage(dispatch, pCallback);
    };
}

export function LoginMessageOffline() {
    return dispatch => {
        dispatch(
            acMessageTextChanged({
                message: MESSAGES.STATUS.OFFLINE,
                duration: renders.getTimeFromTextLength(MESSAGES.STATUS.OFFLINE.length)
            })
        );
    };
}

export function LoginRegisterMessageError() {
    return dispatch => {
        dispatch(
            acMessageTextChanged({
                message: MESSAGES.GENERIC.ERROR,
                duration: renders.getTimeFromTextLength(MESSAGES.GENERIC.ERROR.length)
            })
        );
    };
}

export function LoginMessage(pMessage) {
    return dispatch => {
        dispatch(
            acMessageTextChanged({
                message: pMessage,
                duration: renders.getTimeFromTextLength(pMessage.length)
            })
        );
    };
}

const LoginPasswordOfflineMessage = (pDispatch, pCallback) => {
    pDispatch(
        acMessageTextChanged({
            message: MESSAGES.STATUS.OFFLINE,
            duration: renders.getTimeFromTextLength(MESSAGES.STATUS.OFFLINE.length)
        })
    );
    pCallback();
};
