import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
    Typography,
    TextField,
    Button,
    IconButton,
    CircularProgress,
    Icon
} from 'investira.react.components';
import { MESSAGES, VALIDATIONS, GENERIC } from '../../const';
import services from '../../services';
import { acMessageTextChanged } from '../../store/actions';
import { renders } from 'investira.react.lib';
import RememberPasswordEnd from './RememberPasswordEnd';
import Style from './RememberPassword.module.scss';

const ChangePasswordSchema = Yup.object().shape({
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

function RememberPassword(props) {
    const dispatch = useDispatch();
    const [validate, setValidate] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [username, setUsername] = useState('');

    function rememberPasswordMessage(pMessage) {
        dispatch(
            acMessageTextChanged({
                data: { message: pMessage },
                duration: renders.getTimeFromTextLength(pMessage.length)
            })
        );
    }

    /* TODO: Verificar conexão */
    const doResetPassword = pUsername => {
        setIsSending(true);

        services.auth.passwordReset(
            {
                data: {
                    username: pUsername
                }
            },
            rRes => {
                setIsSending(false);
                if (rRes.status === 201 || rRes.status === 200) {
                    props.history.push('/login');
                    rememberPasswordMessage(MESSAGES.LOGIN.PASSWORD_REQUEST_RESET);
                } else {
                    rememberPasswordMessage(MESSAGES.SERVER.ERROR);
                }
            },
            rErr => {
                setIsSending(false);
                rememberPasswordMessage(MESSAGES.SERVER.ERROR);
            }
        );
    };
    /* TODO: Verificar conexão */
    const doCodeValidate = pParams => {
        services.auth.passwordValidate(
            {
                code: pParams.code
            },
            rRes => {
                if (rRes.status !== 200) {
                    rememberPasswordMessage(MESSAGES.LOGIN.PASSWORD_RESET_EXPIRED);
                    props.history.push('/login');
                } else {
                    setValidate(true);
                    setUsername(rRes.data.data.payload.username);
                }
            },
            rErr => {
                rememberPasswordMessage(MESSAGES.SERVER.ERROR);
                props.history.push('/login');
            }
        );
    };
    /* TODO: Verificar conexão */
    const doChangePassword = (pValues, pCallback) => {
        services.auth.passwordConfirm(
            {
                code: props.match.params.code,
                data: {
                    password: pValues.registerPassword
                }
            },
            rRes => {
                if (rRes.status !== 200) {
                    rememberPasswordMessage(MESSAGES.GENERIC.ERROR);
                } else {
                    setOpenModal(true);
                }
                pCallback && pCallback();
            },
            rErr => {
                rememberPasswordMessage(MESSAGES.SERVER.ERROR);
                pCallback && pCallback();
            }
        );
    };

    const handleClose = () => {
        props.history.push(`/login/${username}`);
    };

    useEffect(() => {
        if (
            props.match.path !== '/change-password/:code' &&
            props.match.path !== '/reset-password/:username'
        ) {
            props.history.push('/login/');
        }

        props.match.path === '/change-password/:code' && doCodeValidate(props.match.params);
    }, []);

    const { match } = props;

    return (
        <>
            <div className={Style.root}>
                {match.path === '/change-password/:code' && validate ? (
                    <div className={Style.body}>
                        <Formik
                            initialValues={{
                                registerPassword: '',
                                confirmPassword: ''
                            }}
                            validationSchema={ChangePasswordSchema}
                            onSubmit={(values, actions) => {
                                values.username = match.params.username;
                                values.code = match.params.code;
                                doChangePassword(values, () => {
                                    actions.setSubmitting(false);
                                });
                            }}
                            render={({
                                values,
                                errors,
                                touched,
                                handleBlur,
                                handleChange,
                                handleSubmit,
                                isSubmitting
                            }) => {
                                return (
                                    <>
                                        <div className={Style.icon}>
                                            <svg
                                                id="key"
                                                x="0px"
                                                y="0px"
                                                width="100%"
                                                height="100%"
                                                viewBox="0 0 16 16">
                                                <path
                                                    style={{
                                                        fill: '#00dfa8'
                                                    }}
                                                    d="M3.787,12.582v0.814c0,0.293-0.107,0.48-0.347,0.648l-1.373,0.963c-0.241,0.168-0.453,0.203-0.729,0.104
                                                            l-0.766-0.279L3.787,12.582z M14.082,9.018c-1.888,1.322-4.434,0.971-5.929-0.713L0,14.014v-0.814c0-0.293,0.106-0.48,0.347-0.648
                                                            l7.231-5.062C6.487,5.504,7.023,2.975,8.92,1.646c2.033-1.424,4.845-0.928,6.268,1.104C16.611,4.783,16.115,7.594,14.082,9.018z
                                                                M14.368,3.324c-1.106-1.58-3.293-1.967-4.874-0.859C7.912,3.572,7.528,5.758,8.635,7.34c1.106,1.58,3.293,1.967,4.874,0.859
                                                            C15.091,7.092,15.476,4.904,14.368,3.324z"
                                                />
                                            </svg>
                                        </div>
                                        <Typography
                                            gutterBottom
                                            variant={'h5'}
                                            color={'primary'}
                                            align={'center'}>
                                            {GENERIC.REMEMBER_PASSWORD.NEW}
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant={'body2'}
                                            align={'center'}
                                            color={'textPrimary'}>
                                            {GENERIC.REMEMBER_PASSWORD.CREATE}
                                            <span className={Style.highlight}>
                                                {' '}
                                                {match.params.username}
                                            </span>
                                        </Typography>
                                        <form className={Style.form} onSubmit={handleSubmit}>
                                            <div className={Style.fieldset}>
                                                <div className={Style.formGroup}>
                                                    <TextField
                                                        type={'password'}
                                                        name={'registerPassword'}
                                                        label={GENERIC.REMEMBER_PASSWORD.SENHA}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.registerPassword}
                                                        error={
                                                            errors.registerPassword &&
                                                            touched.registerPassword
                                                                ? true
                                                                : false
                                                        }
                                                        helperText={errors.registerPassword}
                                                        fullWidth={true}
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                                <div className={Style.formGroup}>
                                                    <TextField
                                                        type={'password'}
                                                        name={'confirmPassword'}
                                                        label={GENERIC.REMEMBER_PASSWORD.CONFIRM}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.confirmPassword}
                                                        error={
                                                            errors.confirmPassword &&
                                                            touched.confirmPassword
                                                                ? true
                                                                : false
                                                        }
                                                        helperText={errors.confirmPassword}
                                                        fullWidth={true}
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                            </div>
                                            <div className={Style.formGroup}>
                                                <div className={Style.buttonWrapper}>
                                                    <Button
                                                        color={'primary'}
                                                        variant={'outlined'}
                                                        fullWidth
                                                        type={'submit'}
                                                        disabled={
                                                            isSubmitting || errors.confirmPassword
                                                                ? true
                                                                : false ||
                                                                  values.confirmPassword === ''
                                                        }>
                                                        {GENERIC.REMEMBER_PASSWORD.ENTRAR}
                                                    </Button>
                                                    {isSubmitting && (
                                                        <CircularProgress
                                                            size={24}
                                                            className={Style.buttonProgress}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </form>
                                    </>
                                );
                            }}
                        />
                    </div>
                ) : match.path === '/reset-password/:username' ? (
                    <>
                        <div className={Style.appBarArea}>
                            <IconButton
                                color={'primary'}
                                className={Style.button}
                                component={Link}
                                to={`/login/${props.match.params.username}`}>
                                <Icon size={21} iconName={'arrow-previous'} />
                            </IconButton>
                        </div>

                        <div className={Style.body}>
                            <div className={Style.icon}>
                                <svg
                                    id="padlock"
                                    x="0px"
                                    y="0px"
                                    width="100%"
                                    height="100%"
                                    viewBox="0 0 16 16">
                                    <path
                                        style={{ fill: '#00dfa8' }}
                                        d="M12.5,8V4.391C12.5,1.97,10.481,0,8,0S3.5,1.97,3.5,4.391V8h0c-1.105,0-2,0.895-2,2v6h11 c1.104,0,2-0.895,2-2V8H12.5z M4.5,4.391C4.5,2.521,6.07,1,8,1s3.5,1.521,3.5,3.391V8h-7V4.391z M13.5,14c0,0.552-0.449,1-1,1h-10 v-5c0-0.552,0.449-1,1-1h10V14z"
                                    />
                                </svg>
                            </div>
                            <div className={Style.content}>
                                <Typography
                                    gutterBottom
                                    variant={'h5'}
                                    color={'primary'}
                                    align={'center'}>
                                    {GENERIC.REMEMBER_PASSWORD.ALTERACAO}
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant={'body2'}
                                    align={'center'}
                                    color={'textPrimary'}>
                                    {GENERIC.REMEMBER_PASSWORD.INSTRUCOES}
                                    <span className={Style.highlight}>
                                        {' '}
                                        {match.params.username}
                                    </span>
                                </Typography>
                            </div>
                            <div className={Style.buttonEnviar}>
                                <div className={Style.buttonWrapper}>
                                    <Button
                                        color={'primary'}
                                        variant={'outlined'}
                                        fullWidth
                                        onClick={() => doResetPassword(match.params.username)}
                                        disabled={isSending}>
                                        {GENERIC.REMEMBER_PASSWORD.ENVIAR}
                                    </Button>
                                    {isSending && (
                                        <CircularProgress
                                            size={24}
                                            className={Style.buttonProgress}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={Style.body}>
                        <CircularProgress size={24} className={Style.buttonProgress} />
                    </div>
                )}
            </div>

            <RememberPasswordEnd anchor={'bottom'} open={openModal} onClose={handleClose} />
        </>
    );
}

RememberPassword.displayName = 'RememberPassword';

export default RememberPassword;
