import React, { memo, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { InputAdornment, Icon, TextField, SubmitButton } from 'investira.react.components';
import withResponseHandling from '../../hoc/withResponseHandling';

import Style from './Login.module.scss';

const LoginUsername = memo(props => {
    // Refs
    const textRef = useRef();

    // State
    const [isChecking, setIsChecking] = useState(false);

    // Methods

    function nextStep() {
        setIsChecking(true);

        props.verify(props.values.username, () => setIsChecking(false));
    }

    // Handlers

    function handleKeyPress(pEvent) {
        if (pEvent.charCode === 32) {
            pEvent.preventDefault();
        }
    }

    // Effects

    useEffect(() => {
        props.handleSetField('username', props.username);
    }, [props.username]);

    useEffect(() => {
        textRef.current.focus();
    }, []);

    // Render

    const { step, handleChange, handleBlur, values, errors } = props;

    const xClassUsername = classNames(Style.formGroup, {
        [Style.inputUsernameInset]: step === 0,
        [Style.inputUsernameOffset]: step === 1 || step === 2
    });

    const xClassNext = classNames(Style.formGroup, {
        [Style.btnNextInset]: step === 0,
        [Style.btnNextOffset]: step === 1 || step === 2
    });

    return (
        <div className={Style.formUsername}>
            <div className={xClassUsername}>
                <TextField
                    inputRef={textRef}
                    type={'email'}
                    name={'username'}
                    label="Email"
                    autoComplete={'username'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyPress={handleKeyPress}
                    value={values.username}
                    error={Boolean(errors.username)}
                    helperText={errors.username}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position={'end'}>
                                <Icon iconName={'mail'} size={18} className={Style.inputIcon} />
                            </InputAdornment>
                        )
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                    disabled={isChecking}
                />
            </div>

            <div className={xClassNext}>
                <SubmitButton
                    onClick={nextStep}
                    fullWidth={true}
                    variant={'outlined'}
                    disabled={isChecking}>
                    Próximo
                </SubmitButton>
            </div>
        </div>
    );
});

LoginUsername.propTypes = {
    step: PropTypes.number.isRequired,
    username: PropTypes.string,
    values: PropTypes.object,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    errors: PropTypes.object,
    touched: PropTypes.object,
    handleSetField: PropTypes.func
};

LoginUsername.defaultProps = {
    step: 0,
    values: {},
    errors: {},
    username: ''
};

LoginUsername.displayName = 'LoginUsername';

export default withResponseHandling(LoginUsername);
