import React, { Component } from 'react';
import classNames from 'classnames';
import { validators } from 'investira.sdk';

import {
    TextField,
    Button,
    CircularProgress,
    Fieldset
} from 'investiraComponents';

import Style from './Login.module.scss';

class LoginCadastro extends Component {
    render() {
        const {
            step,
            values,
            onChange,
            onBlur,
            touched,
            helperText,
            isSubmitting
        } = this.props;

        const xHasError = validators.isEmpty(this.props.errors);

        let xClassFormRegister = classNames(Style.formRegister, {
            [Style.formRegisterBlock]: step === 1 || step === 2
        });

        let xClassPessoais = classNames(
            Style.pessoais,
            Style.fieldset,
            Style.fieldsetPersonal,
            {
                [Style.pessoaisOffset]: step === 0,
                [Style.pessoaisInset]: step === 1 || step === 2
            }
        );

        let xClassSeguranca = classNames(
            Style.seguranca,
            Style.fieldset,
            Style.fieldsetSecurity,
            {
                [Style.segurancaOffset]: step === 0,
                [Style.segurancaInset]: step === 1 || step === 2
            }
        );

        let xClassName = classNames(Style.formGroup, {
            [Style.inputNameOffset]: step === 0,
            [Style.inputNameInset]: step === 1 || step === 2
        });

        let xClassPassword = classNames(Style.formGroup, {
            [Style.inputPasswordOffset]: step === 0,
            [Style.inputPasswordInset]: step === 1 || step === 2
        });

        let xClassConfirmPassword = classNames(Style.formGroup, {
            [Style.inputConfirmPasswordOffset]: step === 0,
            [Style.inputConfirmPasswordInset]: step === 1 || step === 2
        });

        let xClassRegister = classNames(Style.formGroup, {
            [Style.btnRegisterOffset]: step === 0,
            [Style.btnRegisterInset]: step === 1 || step === 2
        });

        return (
            <div className={xClassFormRegister}>
                <Fieldset className={xClassPessoais}>
                    <div className={Style.fieldsetBody}>
                        <div className={xClassName}>
                            <TextField
                                type="text"
                                name="fullname"
                                label="Nome Completo"
                                onChange={onChange}
                                autoComplete="name"
                                onBlur={onBlur}
                                value={values.fullname || ''}
                                error={
                                    this.props.errors.fullname &&
                                    touched.fullname
                                        ? true
                                        : false
                                }
                                helperText={helperText.fullname}
                                fullWidth={true}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>
                </Fieldset>

                <Fieldset className={xClassSeguranca}>
                    <div className={Style.fieldsetBody}>
                        <div className={xClassPassword}>
                            <TextField
                                type="password"
                                name="registerPassword"
                                autoComplete="new-password"
                                label="Senha"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={values.registerPassword || ''}
                                error={
                                    this.props.errors.registerPassword &&
                                    touched.registerPassword
                                        ? true
                                        : false
                                }
                                helperText={helperText.registerPassword}
                                fullWidth={true}
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className={xClassConfirmPassword}>
                            <TextField
                                type="password"
                                name="confirmPassword"
                                autoComplete="new-password"
                                label="Confirme a Senha"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={values.confirmPassword || ''}
                                error={
                                    this.props.errors.confirmPassword &&
                                    touched.confirmPassword
                                        ? true
                                        : false
                                }
                                helperText={helperText.confirmPassword}
                                fullWidth={true}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>
                </Fieldset>

                <div className={xClassRegister}>
                    <div className={Style.buttonWrapper}>
                        <Button
                            color="primary"
                            variant="outlined"
                            fullWidth={true}
                            type="submit"
                            disabled={
                                isSubmitting || !xHasError ? true : false
                            }>
                            Cadastrar
                        </Button>
                        {isSubmitting && (
                            <CircularProgress
                                size={24}
                                className={Style.buttonProgress}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginCadastro;
