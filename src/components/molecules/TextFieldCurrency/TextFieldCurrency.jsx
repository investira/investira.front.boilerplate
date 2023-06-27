import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { TextField, InputCurrency, InputAdornment } from 'investira.react.components';

const TextFieldCurrency = memo(props => {
    const inputRef = useRef(null);

    function setCursorToEnd(pInput) {
        setTimeout(() => pInput.setSelectionRange(pInput.value.length, pInput.value.length), 0);
    }

    const handleFocus = e => {
        setCursorToEnd(inputRef.current);
        props.onFocus && props.onFocus(e);
    };

    return (
        <TextField
            inputRef={inputRef}
            value={props.value}
            disabled={props.disabled}
            onChange={props.onChange}
            onFocus={handleFocus}
            inputProps={{
                decimal: 2,
                formNoValidate: 'formnovalidate',
                maxLength: 15,
                ...props.inputProps,
                pattern: '[0-9]*'
            }}
            fullWidth
            InputProps={{
                sx: {
                    color: 'primary.main',
                    '&::after': {
                        border: '0'
                    },
                    '&::before': {
                        borderBottom: '0 !important'
                    },
                    fontSize: '2rem',
                    fontWeight: 600
                },
                startAdornment: (
                    <InputAdornment
                        position="start"
                        sx={{
                            '& > p': {
                                fontSize: '2rem',
                                fontWeight: 600,
                                color: props.disabled ? 'secondary.lightness' : 'primary.main',
                                padding: '4px  0 5px'
                            }
                        }}>
                        R$
                    </InputAdornment>
                ),
                ...props.InputProps,
                inputComponent: InputCurrency
            }}
        />
    );
});

TextFieldCurrency.propTypes = {};

export default TextFieldCurrency;
