import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { TextField, Button, CircularProgress } from 'investiraComponents';
import { InputAdornment, Icon, IconButton } from 'investiraComponents';
import Style from './Login.module.scss';

class LoginPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPassword: false
        };

        this.formPasswordRef = React.createRef();
    }

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    handleMouseDownPassword = e => {
        e.preventDefault();
    };

    render() {
        const { step, username, values, onChange, onBlur, errors, touched, isSubmitting } = this.props;

        var xClassPassword = classNames(Style.formGroup, {
            [Style.inputPasswordOff]: step === 0,
            [Style.inputPasswordIn]: step === 1 || step === 2
        });

        var xClassDone = classNames(Style.formGroup, {
            [Style.btnDoneInset]: step === 1 || step === 2,
            [Style.btnDoneOffset]: step === 0
        });

        var xClassRemember = classNames(Style.formGroup, {
            [Style.btnRememberInset]: step === 1 || step === 2,
            [Style.btnRememberOffset]: step === 0
        });

        return (
            <div id={'formPassword'} className={Style.formPassword} ref={this.formPasswordRef}>
                <div className={xClassPassword}>
                    <TextField
                        type={!this.state.showPassword ? 'password' : 'text'}
                        name="password"
                        label="Senha"
                        autoComplete={'current-password'}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={values.password}
                        error={errors.password && touched.password ? true : false}
                        helperText={errors.password}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}>
                                        {!this.state.showPassword ? (
                                            <Icon
                                                key={'eye_off'}
                                                iconName={'eye_off'}
                                                size="21"
                                                className={Style.inputIcon}
                                            />
                                        ) : (
                                            <Icon key={'eye'} iconName={'eye'} size="21" className={Style.inputIcon} />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        disabled={isSubmitting}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </div>
                <div className={xClassDone}>
                    <div className={Style.buttonWrapper}>
                        <Button
                            color="primary"
                            variant="outlined"
                            fullWidth={true}
                            type="submit"
                            disabled={
                                isSubmitting || errors.password ? true : false || values.password === '' ? true : false
                            }>
                            Entrar
                        </Button>
                        {isSubmitting && <CircularProgress size={24} className={Style.buttonProgress} />}
                    </div>
                </div>
                <div className={xClassRemember}>
                    <Button
                        color="primary"
                        fullWidth
                        size={'small'}
                        component={Link}
                        to={`/reset-password/${username}`}>
                        Esqueci minha senha
                    </Button>
                </div>
            </div>
        );
    }
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators(
//         {
//             LoginMessageOffline,
//         },
//         dispatch
//     );
// }

// export default connect(
//     null,
//     mapDispatchToProps
// )(LoginPassword);

export default LoginPassword;
