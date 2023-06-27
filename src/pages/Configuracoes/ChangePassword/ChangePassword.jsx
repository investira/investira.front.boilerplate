import React, { memo, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { browsers } from 'investira.react.lib';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
    Typography,
    Box,
    Success,
    PasswordField,
    withDialog,
    NavBar,
    Stack,
    LoadingButton
} from 'investira.react.components';
import { RouteBackButton } from '../../../components/molecules';
import { MainTemplate } from '../../../components/templates';
import withResponseHandling from '../../../hoc/withResponseHandling';
import services from '../../../services';

import Style from './ChangePassword.module.scss';

const CHANGE_PASSWORD_SCHEMA = Yup.object().shape({
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

const ChangePassword = memo(props => {
    // Constants
    const _isMounted = useRef(false);
    const timeout = useRef(null);

    // States
    const [updated, setUpdated] = useState(false);

    // Methods

    function changePassword(pValues, pActions) {
        if (browsers.isOnline()) {
            const xReqAttrs = {
                data: {
                    password: pValues.registerPassword,
                    password_confirm: pValues.confirmPassword
                }
            };

            services.user.updatePassword(
                xReqAttrs,
                rRes => {
                    if (rRes.status === 200) {
                        handleSuccess(() => {
                            pActions.setSubmitting(false);
                            pActions.resetForm();
                        });
                    }
                },
                rErr => {
                    props.responseErrorHandling(rErr, {
                        err400: () => pActions.setSubmitting(false),
                        err500: () => pActions.setSubmitting(false)
                    });
                }
            );
        } else {
            props.offline();
        }
    }

    // Handlers

    function handleSubmit(pValues, pActions) {
        changePassword(pValues, pActions);
    }

    function handleSuccess(pCallback) {
        clearTimeout(timeout.current);
        setUpdated(true);
        pCallback && pCallback();

        timeout.current = setTimeout(() => {
            setUpdated(false);
        }, 2000);
    }

    function handleExited() {
        props.onBack && props.onBack();
    }

    // Effects

    useEffect(() => {
        _isMounted.current = true;

        return () => {
            _isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (updated) {
            props.onOpenDialog({
                title: {
                    label: ' ',
                    onclose: handleExited
                },
                content: (
                    <Stack spacing={2}>
                        <Success startAnimation={true} width={100} height={100} />
                        <Typography variant={'h6'} color={'textPrimary'} align={'center'}>
                            Senha alterada com sucesso!
                        </Typography>
                    </Stack>
                )
            });
        }
    }, [updated]);

    // Render

    return (
        <MainTemplate>
            <NavBar
                center={
                    <Typography variant={'h6'} color={'textPrimary'}>
                        Configurações
                    </Typography>
                }
                left={<RouteBackButton />}
            />
            <div id={props.id} className={Style.root}>
                <div className={Style.header}>
                    <Typography variant={'h5'} color={'textPrimary'} gutterBottom>
                        Alterar senha
                    </Typography>
                </div>
                <div className={Style.body}>
                    <Formik
                        initialValues={{
                            registerPassword: '',
                            confirmPassword: ''
                        }}
                        validationSchema={CHANGE_PASSWORD_SCHEMA}
                        onSubmit={handleSubmit}>
                        {({ values, errors, touched, handleBlur, handleChange, isSubmitting }) => {
                            return (
                                <Form className={Style.form} noValidate>
                                    <div className={Style.fieldset}>
                                        <div className={Style.formGroup}>
                                            <PasswordField
                                                name="registerPassword"
                                                label="Nova Senha"
                                                autoComplete={'new-password'}
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
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                            />
                                        </div>
                                        <div className={Style.formGroup}>
                                            <PasswordField
                                                name="confirmPassword"
                                                label="Confirme a Nova Senha"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                autoComplete={'new-password'}
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
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <Box sx={{ my: 1.5, py: 1 }}>
                                        <LoadingButton
                                            variant="contained"
                                            type="submit"
                                            disabled={
                                                isSubmitting || errors.confirmPassword
                                                    ? true
                                                    : false || values.confirmPassword === ''
                                            }
                                            loading={isSubmitting}
                                            fullWidth>
                                            Alterar
                                        </LoadingButton>
                                    </Box>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </MainTemplate>
    );
});

ChangePassword.propTypes = {
    id: PropTypes.string,
    onBack: PropTypes.func,
    onOpenDialog: PropTypes.func,
    offline: PropTypes.func,
    responseErrorHandling: PropTypes.func
};

ChangePassword.defaultProps = {
    id: 'change-password'
};

ChangePassword.displayName = 'ChangePassword';

export default withResponseHandling(withDialog(ChangePassword));
