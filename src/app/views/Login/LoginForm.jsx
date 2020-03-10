import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import LoginCadastro from './LoginCadastro';
import LoginPassword from './LoginPassword';
import LoginUsername from './LoginUsername';
import Style from './Login.module.scss';

const SigninSchema = Yup.object().shape({
    username: Yup.string()
        .email('Formato de email inválido')
        .required('Obrigatório'),
    password: Yup.string()
        .matches(/^(?=.*[a-z])/, 'Ao menos uma letra minúscula')
        .matches(/^(?=.*[A-Z])/, 'Ao menos uma letra maiúscula')
        .matches(/^(?=.*[0-9])/, 'Ao menos um número')
        .min(6, 'Muito curta')
        .required('Obrigatório')
});

const RegisterSchema = Yup.object().shape({
    username: Yup.string()
        .email('Formato de email inválido')
        .required('Obrigatório'),
    fullname: Yup.string()
        .min(3, 'Ao menos 3 caracteres')
        .required('Obrigatório'),
    // lastname: Yup.string().required('Obrigatório'),
    registerPassword: Yup.string()
        .matches(/^(?=.*[a-z])/, 'Ao menos uma letra minúscula')
        .matches(/^(?=.*[A-Z])/, 'Ao menos uma letra maiúscula')
        .matches(/^(?=.*[0-9])/, 'Ao menos um número')
        .min(6, 'Muito curta')
        .required('Obrigatório'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('registerPassword')], 'A senhas devem ser iguais')
        .required('Obrigatório')
});

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.loginPasswordRef = React.createRef();
    }

    goStep = pStep => {
        this.setState({ step: pStep });
    };

    errorPasswordFocus = () => {
        const xFormPassword = this.loginPasswordRef.current.formPasswordRef.current;
        const xInputPassword = xFormPassword.querySelector('input');
        xInputPassword.focus();
    };

    handleLoginOrRegister = (pUserExists, pValues, pFormikActions) => {
        if (pUserExists) {
            this.props.handleLogin(
                pValues,
                () => pFormikActions.setSubmitting(false),
                this.errorPasswordFocus
            );
        } else {
            this.props.handleRegister(pValues, sent => {
                pFormikActions.setSubmitting(false);
                sent && pFormikActions.resetForm();
                //sent === true && actions.resetForm();
            });
        }
    };

    render() {
        const { step, username, userExist, handleNext } = this.props;

        return (
            <div className={Style.formArea}>
                <div className={Style.signInForm}>
                    <Formik
                        initialValues={{
                            username: '',
                            password: '',
                            fullname: '',
                            registerPassword: '',
                            confirmPassword: ''
                        }}
                        validationSchema={userExist ? SigninSchema : RegisterSchema}
                        onSubmit={(values, actions) => {
                            this.handleLoginOrRegister(userExist, values, actions);
                        }}
                        render={({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                            setFieldValue
                        }) => {
                            return (
                                <form
                                    className={Style.form}
                                    onSubmit={handleSubmit}
                                    autoComplete={'off'}>
                                    <LoginUsername
                                        username={username}
                                        userExist={userExist}
                                        step={step}
                                        handleNext={handleNext}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        handleSetField={setFieldValue}
                                        values={values}
                                        errors={errors}
                                        touched={touched}
                                    />

                                    {userExist && (
                                        <LoginPassword
                                            ref={this.loginPasswordRef}
                                            step={step}
                                            username={username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            isSubmitting={isSubmitting}
                                        />
                                    )}
                                </form>
                            );
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default LoginForm;
