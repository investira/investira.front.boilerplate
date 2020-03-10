import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browsers } from 'investiraLib';
import { authService } from '../../services/authService';
import classNames from 'classnames';
import LoginHeader from './LoginHeader';
import LoginForm from './LoginForm';
import { acMessageTextChanged } from '../../actions';
import { renders } from 'investiraLib';
import { MESSAGES } from '../../const';
import LoginCadastroMessage from './LoginCadastroMessage';
import { IconButton, Icon } from 'investiraComponents';

import {
    doLogin,
    LoginRegisterMessageError,
    LoginMessageOffline,
    LoginMessage
} from './LoginViewActions';

import Style from './Login.module.scss';
import { validators } from 'investira.sdk';

class Login extends Component {
    constructor(props) {
        super(props);

        this._isMounted = false;

        this.state = {
            userExist: false,
            step: 0,
            prevLocation: '',
            username: '',
            title: 'Login',
            openModal: false
        };
    }

    goToStep = (pStep, pLocation) => {
        this.setState({
            step: pStep,
            prevLocation: pLocation ? pLocation : this.state.prevLocation
        });
    };

    handleNext = (pUserExist, pUsername) => {
        this.setState({
            userExist: pUserExist,
            username: pUsername
        });

        if (pUserExist) {
            this.goToStep(1, 'password');
        } else {
            this.props.LoginMessage(MESSAGES.LOGIN.USER_NOT_EXIST);
        }
    };

    handleCloseModal = () => {
        this.setState(
            {
                step: 0,
                prevLocation: '',
                username: ''
            },
            () =>
                this.setState({
                    openModal: false
                })
        );
    };

    handlOpenModal = () => {
        this.setState({
            openModal: true
        });
    };

    isOfflineAction = pCallback => {
        this.props.LoginMessageOffline();
        pCallback(false);
    };

    /*TODO: Mover para LoginViewActions */
    doRegister = (pValues, pCallback) => {
        browsers.isOnline()
            ? authService({
                  method: 'POST',
                  endpoint: 'register',
                  data: {
                      username: pValues.username,
                      name: pValues.fullname,
                      password: pValues.registerPassword,
                      password_confirm: pValues.confirmPassword
                  }
              })
                  .then(rRes => {
                      this.handlOpenModal();
                      pCallback(true);
                  })
                  .catch(rErr => {
                      this.props.LoginRegisterMessageError();
                      pCallback(false);
                  })
            : this.isOfflineAction(pCallback);
    };

    verifyUsername(pUsername) {
        authService({
            endpoint: 'verify',
            username: pUsername
        })
            .then(rRes => {
                if (validators.isEmpty(rRes.data)) {
                    this.props.LoginMessage(MESSAGES.LOGIN.UNVERIFIED);
                } else {
                    this.handleNext(rRes.data.verified, pUsername);
                }
            })
            .catch(rErr => {
                this.props.LoginMessage(MESSAGES.GENERIC.ERROR);
            });
    }

    componentDidMount() {
        this._isMounted = true;

        let xUsername = this.props.match.params.username;

        if (xUsername) {
            this._isMounted && this.verifyUsername(xUsername);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { doLogin, isLoggedIn } = this.props;

        var xClass = classNames(Style.root, {
            [Style.rootCadastro]: this.state.step === 2
        });

        // Verifica se esta logado
        if (!isLoggedIn) {
            //Tela de login
            return (
                <>
                    <div id="loginview" className={xClass}>
                        <div className={Style.appBarArea}>
                            {this.state.step ? (
                                <IconButton
                                    className={Style.arrowButton}
                                    aria-label="voltar"
                                    onClick={() => {
                                        this.goToStep(0);
                                    }}>
                                    <Icon iconName="arrow-previous" color={'primary'} size="21" />
                                </IconButton>
                            ) : (
                                false
                            )}
                        </div>

                        <div className={Style.contentArea}>
                            <LoginHeader
                                step={this.state.step}
                                position={'username'}
                                title={this.state.title}
                                username={this.state.username}
                                prevLocation={this.state.prevLocation}
                            />

                            <LoginForm
                                step={this.state.step}
                                userExist={this.state.userExist}
                                username={this.state.username}
                                password={''}
                                handleLogin={doLogin}
                                handleNext={this.handleNext}
                                prevLocation={this.state.prevLocation}
                            />
                        </div>
                    </div>
                    <LoginCadastroMessage
                        anchor="bottom"
                        username={this.state.username}
                        open={this.state.openModal}
                        onClose={this.handleCloseModal}
                    />
                </>
            );
        } else {
            return <Redirect from="/login" to="/" />;
        }
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            doLogin,
            LoginRegisterMessageError,
            acMessageTextChanged,
            LoginMessageOffline,
            LoginMessage
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
