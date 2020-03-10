import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { responses } from 'investira.sdk';
import { browsers } from 'investiraLib';
import { MESSAGES } from '../../const';
import { authService } from '../../services/authService';
import { acMessageTextChanged, acUserChangeUsername } from '../../actions';
import { LoginMessageOffline } from './LoginViewActions';
import { TextField, Button, CircularProgress } from 'investiraComponents';
import { InputAdornment, Icon } from 'investiraComponents';
import Style from './Login.module.scss';

class LoginUsername extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isChecking: false
        };
    }

    errorHandling() {
        this.props.acMessageTextChanged({
            message: MESSAGES.GENERIC.ERROR,
            duration: 4000
        });
    }

    successHandling(pResp) {
        // true: cadastrado/verificado
        // false: cadastrado/não-verificado
        // null: não-cadastrado/não-verificado

        if (pResp.data.verified === null) {
            this.props.handleNext(false, this.props.values.username);
        } else if (pResp.data.verified === true) {
            this.props.handleNext(true, this.props.values.username);
        } else {
            this.props.acMessageTextChanged({
                message: MESSAGES.LOGIN.UNVERIFIED,
                duration: 4000
            });
        }
    }

    rejectCallback(pError) {
        this.props.acMessageTextChanged({
            message: MESSAGES.SERVER.ERROR,
            duration: 4000
        });

        this.setState({
            isChecking: false
        });
    }

    resolveCallback(pResp) {
        if (responses.getStatusCode(pResp) === 200) {
            this.successHandling(pResp);
        } else {
            this.errorHandling(pResp);
        }

        this.setState({
            isChecking: false
        });
    }

    verifyUsername() {
        this.setState({
            isChecking: true
        });
        browsers.isOnline()
            ? authService({
                  endpoint: 'verify',
                  username: this.props.values.username
              })
                  .then(rRes => {
                      this.props.acUserChangeUsername(this.props.values.username);
                      this.resolveCallback(rRes);
                  })
                  .catch(rErr => {
                      if (rErr.status === 400) {
                          this.props.handleNext(false, this.props.values.username);

                          this.setState({
                              isChecking: false
                          });
                      } else {
                          this.rejectCallback(rErr);
                      }
                  })
            : this.setState(
                  {
                      isChecking: false
                  },
                  this.props.LoginMessageOffline()
              );
    }

    nextStep = () => {
        this.setState({
            isChecking: true
        });

        this.verifyUsername();
    };

    handleKeyPress = pEvent => {
        if (pEvent.charCode === 32) {
            pEvent.preventDefault();
        }
    };

    componentDidUpdate(prevProps) {
        if (prevProps.username === '' && this.props.username) {
            this.props.handleSetField('username', this.props.username);
        }
    }

    render() {
        const { step, handleChange, handleBlur, values, touched, errors } = this.props;

        var xClassUsername = classNames(Style.formGroup, {
            [Style.inputUsernameInset]: step === 0,
            [Style.inputUsernameOffset]: step === 1 || step === 2
        });

        var xClassNext = classNames(Style.formGroup, {
            [Style.btnNextInset]: step === 0,
            [Style.btnNextOffset]: step === 1 || step === 2
        });

        return (
            <div className={Style.formUsername}>
                <div className={xClassUsername}>
                    <TextField
                        type="email"
                        name="username"
                        label="Email"
                        autoComplete={'username'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyPress={e => this.handleKeyPress(e)}
                        value={values.username || ''}
                        error={errors.username && touched.username ? true : false}
                        helperText={errors.username}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Icon iconName={'mail'} size="21" className={Style.inputIcon} />
                                </InputAdornment>
                            )
                        }}
                        InputLabelProps={{
                            shrink: true
                        }}
                        disabled={this.state.isChecking}
                    />
                </div>

                <div className={xClassNext}>
                    <div className={Style.buttonWrapper}>
                        <Button
                            color="primary"
                            variant="outlined"
                            fullWidth={true}
                            type="submit"
                            disabled={
                                this.state.isChecking || errors.username
                                    ? true
                                    : false || values.username === ''
                                    ? true
                                    : false
                            }
                            onClick={this.nextStep}>
                            Próximo
                        </Button>
                        {this.state.isChecking && (
                            <CircularProgress size={24} className={Style.buttonProgress} />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            LoginMessageOffline,
            acMessageTextChanged,
            acUserChangeUsername
        },
        dispatch
    );
}

export default connect(null, mapDispatchToProps)(LoginUsername);

//export default LoginUsername;
