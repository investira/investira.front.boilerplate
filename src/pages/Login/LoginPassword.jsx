import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Button, SubmitButton, PasswordField } from 'investira.react.components';
import { GENERIC } from '../../const';

import Style from './Login.module.scss';

const LoginPassword = memo(props => {
    // Render

    const { step, username, values, onChange, onBlur, errors, touched, isSubmitting } = props;

    const xClassPassword = classNames(Style.formGroup, {
        [Style.inputPasswordOff]: step === 0,
        [Style.inputPasswordIn]: step === 1 || step === 2
    });

    const xClassDone = classNames(Style.formGroup, {
        [Style.btnDoneInset]: step === 1 || step === 2,
        [Style.btnDoneOffset]: step === 0
    });

    const xClassRemember = classNames(Style.formGroup, {
        [Style.btnRememberInset]: step === 1 || step === 2,
        [Style.btnRememberOffset]: step === 0
    });

    return (
        <div id={'formPassword'} className={Style.formPassword} ref={props.forwardedRef}>
            <div className={xClassPassword}>
                <PasswordField
                    name={'password'}
                    label="Senha"
                    autoComplete={'current-password'}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={values.password}
                    error={errors.password && touched.password ? true : false}
                    helperText={errors.password}
                    fullWidth
                    disabled={isSubmitting}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </div>
            <div className={xClassDone}>
                <SubmitButton
                    fullWidth={true}
                    variant={'outlined'}
                    disabled={isSubmitting}
                    isSubmitting={isSubmitting}>
                    Entrar
                </SubmitButton>
            </div>
            <div className={xClassRemember}>
                <Button
                    color={'primary'}
                    fullWidth
                    size={'small'}
                    component={Link}
                    to={`/reset-password/${username}`}>
                    {GENERIC.REMEMBER_PASSWORD.FORGOT_PASSWORD}
                </Button>
            </div>
        </div>
    );
});

LoginPassword.propTypes = {
    step: PropTypes.number,
    username: PropTypes.string,
    values: PropTypes.object,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    errors: PropTypes.object,
    touched: PropTypes.object,
    isSubmitting: PropTypes.bool,
    handleSetField: PropTypes.func,
    handleSubmit: PropTypes.func,
    forwardedRef: PropTypes.object,
    biometryActivated: PropTypes.bool
};

LoginPassword.defaultProps = {
    step: 0,
    username: '',
    values: {},
    errors: {},
    touched: {},
    isSubmitting: false,
    forwardedRef: {},
    biometryActivated: false
};

LoginPassword.displayName = 'LoginPassword';

export default LoginPassword;
