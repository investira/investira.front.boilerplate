import classNames from 'classnames';
import { IconButton, Icon } from 'investira.react.components';
import { browsers, renders } from 'investira.react.lib';
import { validators, responses } from 'investira.sdk';
import PropTypes from 'prop-types';
import React, { memo, useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { MESSAGES } from '../../const';
import withResponseHandling from '../../hoc/withResponseHandling';
import services from '../../services';
import {
    acAuthLogin,
    acAuthIsFetching,
    acAuthSetLogin,
    acMessageTextChanged,
    acAuthUpdateStatusToken
} from '../../store/actions';
import Style from './Login.module.scss';
import LoginCadastroMessage from './LoginCadastroMessage';
import LoginForm from './LoginForm';
import LoginHeader from './LoginHeader';

const Login = memo(props => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const usernameStore = useSelector(state => state.user.username);

    // Constants
    const _isMounted = useRef(false);

    // States
    const [userExist, setUserExist] = useState(false);
    const [step, setStep] = useState(0);
    const [prevLocation, setPrevLocation] = useState('');
    const [username, setUsername] = useState('');
    const [title, setTitle] = useState('');
    const [openModal, setOpenModal] = useState(false);

    // Methods
    const goToStep = useCallback(
        (pStep, pLocation) => {
            setStep(pStep);
            setPrevLocation(pLocation ? pLocation : prevLocation);
        },
        [prevLocation]
    );

    const goToNextStep = useCallback(
        (pUserExist, pUsername) => {
            setUserExist(pUserExist);
            setUsername(pUsername);
            setTitle(pUserExist ? `Login` : `Cadastro`);

            if (pUserExist) {
                goToStep(1, 'password');
            } else {
                goToStep(2, 'register');
            }
        },
        [goToStep]
    );

    const isOfflineAction = useCallback(
        pCallback => {
            dispatch(
                acMessageTextChanged({
                    data: { message: MESSAGES.STATUS.OFFLINE },
                    duration: renders.getTimeFromTextLength(MESSAGES.STATUS.OFFLINE.length)
                })
            );
            pCallback && pCallback(false);
        },
        [props]
    );

    function doLogin(pFormData, pFormActions, pFormError) {
        dispatch(acAuthIsFetching(true));
        browsers.isOnline()
            ? services.auth.login(
                  {
                      data: {
                          username: pFormData.username,
                          password: pFormData.password
                      }
                  },
                  rRes => {
                      pFormActions && pFormActions.setSubmitting(false);
                      dispatch(acAuthIsFetching(false));

                      dispatch(acAuthLogin(responses.getObjData(rRes)));
                      dispatch(acAuthSetLogin());
                      dispatch(acAuthUpdateStatusToken('valid'));
                  },
                  rErr => {
                      pFormActions && pFormActions.setSubmitting(false);
                      dispatch(acAuthIsFetching(false));
                      props.responseErrorHandling(rErr);

                      pFormError && pFormError();
                  }
              )
            : isOfflineAction();
    }

    function doRegister(pValues, pCallback) {
        browsers.isOnline()
            ? services.auth.register(
                  {
                      data: {
                          username: pValues.username,
                          name: pValues.fullname,
                          password: pValues.registerPassword,
                          password_confirm: pValues.confirmPassword
                      }
                  },
                  rRes => {
                      handlOpenModal();
                      pCallback(true);
                  },
                  rErr => {
                      props.responseErrorHandling(rErr);
                      pCallback(false);
                  }
              )
            : isOfflineAction(pCallback);
    }

    const verifyUsername = useCallback(
        (pUsername, pCallback) => {
            browsers.isOnline()
                ? services.auth.verify(
                      {
                          username: pUsername
                      },
                      rRes => {
                          if (validators.isEmpty(rRes.data)) {
                              dispatch(
                                  acMessageTextChanged({
                                      data: { message: MESSAGES.LOGIN.UNVERIFIED },
                                      duration: renders.getTimeFromTextLength(
                                          MESSAGES.LOGIN.UNVERIFIED.length
                                      )
                                  })
                              );
                          } else {
                              goToNextStep(rRes.data.verified, pUsername);
                          }
                          pCallback && pCallback();
                      },
                      rErr => {
                          const xCallbacks = {
                              err400: () => goToNextStep(false, pUsername)
                          };
                          props.responseErrorHandling(rErr, xCallbacks);
                          pCallback && pCallback();
                      }
                  )
                : isOfflineAction(pCallback);
        },
        [goToNextStep, isOfflineAction, props]
    );

    // Handlers

    const handleNext = useCallback(
        (pUserExist, pUsername) => {
            goToNextStep(pUserExist, pUsername);
        },
        [goToNextStep]
    );

    function handleCloseModal() {
        setStep(0);
        setPrevLocation('');
        setUsername('');
        setOpenModal(false);
    }

    function handlOpenModal() {
        setOpenModal(true);
    }

    // Effects

    useEffect(() => {
        _isMounted.current = true;

        return () => {
            _isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        let xUsername = props.match.params.username || usernameStore;

        if (xUsername) {
            _isMounted.current && verifyUsername(xUsername);
        }
    }, [props.match.params.username, usernameStore, verifyUsername]);

    // Render

    const xClass = classNames(Style.root, {
        [Style.rootCadastro]: step === 2
    });

    if (isLoggedIn) {
        return <Redirect from="/login" to="/" />;
    }

    return (
        <>
            <div id={'loginview'} className={xClass}>
                <div className={Style.appBarArea}>
                    {step ? (
                        <IconButton
                            className={Style.arrowButton}
                            aria-label={'voltar'}
                            onClick={() => {
                                goToStep(0);
                            }}>
                            <Icon iconName={'arrow-previous'} color={'primary'} size={21} />
                        </IconButton>
                    ) : (
                        false
                    )}
                </div>

                <div className={Style.contentArea}>
                    <LoginHeader
                        step={step}
                        position={'username'}
                        title={title}
                        username={username}
                        prevLocation={prevLocation}
                    />

                    <LoginForm
                        step={step}
                        userExist={userExist}
                        username={username}
                        password={''}
                        handleLogin={doLogin}
                        handleRegister={doRegister}
                        handleNext={handleNext}
                        prevLocation={prevLocation}
                        verify={verifyUsername}
                    />
                </div>
            </div>
            <LoginCadastroMessage
                anchor={'bottom'}
                username={username}
                open={openModal}
                onClose={handleCloseModal}
            />
        </>
    );
});

Login.propTypes = {
    isLoggedIn: PropTypes.bool,
    responseErrorHandling: PropTypes.func,
    match: PropTypes.object,
    username: PropTypes.string
};

Login.defaultProps = {
    isLoggedIn: false,
    match: {},
    username: ''
};

Login.displayName = 'Login';

export default withResponseHandling(Login);
