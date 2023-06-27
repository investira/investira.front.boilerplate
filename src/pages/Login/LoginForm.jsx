import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { VALIDATIONS } from '../../const';
import LoginCadastro from './LoginCadastro';
import LoginPassword from './LoginPassword';
import LoginUsername from './LoginUsername';
import Style from './Login.module.scss';

const SIGN_IN_SCHEMA = Yup.object().shape({
    username: Yup.string()
        .email(`${VALIDATIONS.INVALID_EMAIL}`)
        .required(`${VALIDATIONS.REQUIRED}`),
    password: Yup.string()
        .matches(/^(?=.*[a-z])/, `${VALIDATIONS.ATLEAST_LETTER}`)
        .matches(/^(?=.*[A-Z])/, `${VALIDATIONS.ATLEAST_CAPITAL_LETTER}`)
        .matches(/^(?=.*[0-9])/, `${VALIDATIONS.ATLEAST_NUMBER}`)
        .min(6, `${VALIDATIONS.TOO_SHORT}`)
        .required(`${VALIDATIONS.REQUIRED}`)
});

const REGISTER_SCHEMA = Yup.object().shape({
    username: Yup.string()
        .email(`${VALIDATIONS.INVALID_EMAIL}`)
        .required(`${VALIDATIONS.REQUIRED}`),
    fullname: Yup.string()
        .min(3, `${VALIDATIONS.ATLEAST_3_CARACT}`)
        .required(`${VALIDATIONS.REQUIRED}`),
    // lastname: Yup.string().required('Obrigatório'),
    registerPassword: Yup.string()
        .matches(/^(?=.*[a-z])/, `${VALIDATIONS.ATLEAST_LETTER}`)
        .matches(/^(?=.*[A-Z])/, `${VALIDATIONS.ATLEAST_CAPITAL_LETTER}`)
        .matches(/^(?=.*[0-9])/, `${VALIDATIONS.ATLEAST_NUMBER}`)
        .min(6, `${VALIDATIONS.TOO_SHORT}`)
        .required(`${VALIDATIONS.REQUIRED}`),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('registerPassword')], `${VALIDATIONS.PASSWORDS_MUST_MATCH}`)
        .required(`${VALIDATIONS.REQUIRED}`)
});

const LoginForm = memo(props => {
    // Refs
    const loginPasswordRef = useRef();

    // Methods
    function errorPasswordFocus() {
        const xFormPassword = loginPasswordRef.current;
        const xInputPassword = xFormPassword.querySelector('input');
        xInputPassword.focus();
    }

    // Handlers
    function handleLoginOrRegister(pUserExists, pValues, pFormikActions) {
        if (pUserExists) {
            props.handleLogin(
                pValues,
                () => pFormikActions.setSubmitting(false),
                errorPasswordFocus
            );
        } else {
            props.handleRegister(pValues, sent => {
                pFormikActions.setSubmitting(false);
                sent && pFormikActions.resetForm();
            });
        }
    }

    function handleFormSubmit(values, actions) {
        const { userExist } = props;
        handleLoginOrRegister(userExist, values, actions);
    }

    const { step, username, userExist, handleNext } = props;

    return (
        <div className={Style.formArea}>
            <div className={Style.signInForm}>
                <Formik
                    initialValues={{
                        username: props.username || '',
                        password: '',
                        fullname: '',
                        registerPassword: '',
                        confirmPassword: ''
                    }}
                    initialErrors={{
                        username: ''
                    }}
                    validationSchema={userExist ? SIGN_IN_SCHEMA : REGISTER_SCHEMA}
                    onSubmit={handleFormSubmit}>
                    {({
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
                            <Form className={Style.form} noValidate>
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
                                    //touched={touched}
                                    verify={props.verify}
                                />

                                {userExist ? (
                                    <LoginPassword
                                        forwardedRef={loginPasswordRef}
                                        step={step}
                                        username={username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        handleSetField={setFieldValue}
                                        handleSubmit={handleSubmit}
                                        values={values}
                                        errors={errors}
                                        touched={touched}
                                        isSubmitting={isSubmitting}
                                    />
                                ) : (
                                    <LoginCadastro
                                        step={step}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values}
                                        touched={touched}
                                        errors={errors}
                                        helperText={errors}
                                        isSubmitting={isSubmitting}
                                    />
                                )}
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
});

LoginForm.propTypes = {
    step: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    userExist: PropTypes.bool.isRequired,
    handleNext: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
    handleRegister: PropTypes.func.isRequired,
    verify: PropTypes.func.isRequired
};

LoginForm.defaultProps = {
    step: 1,
    username: '',
    userExist: false
};

LoginForm.displayName = 'LoginForm';

export default LoginForm;
