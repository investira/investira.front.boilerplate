import React, { memo, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, InputCurrency, Typography } from 'investira.react.components';
import { useFormikContext } from 'formik';

const InputField = memo(props => {
    const [value, setValue] = useState(props.value);
    // Refs
    const timeout = useRef(null);

    const context = useFormikContext();

    function handleChange(pEvent, pValue) {
        const xValue = Number(pValue);
        setValue(xValue);

        if (timeout.current) {
            clearTimeout(timeout.current);
        }

        timeout.current = setTimeout(() => {
            props.onChange && props.onChange(props.name, pValue);
        }, 500);
    }

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    useEffect(() => {
        if (props.name) {
            context.setFieldValue(props.name, value);
        }
    }, [value]);

    return (
        <Input
            value={value}
            name={props.name}
            type="text"
            onChange={handleChange}
            fullWidth
            inputComponent={InputCurrency}
            startAdornment={
                <div style={{ marginRight: '8px' }}>
                    <Typography>R$ </Typography>
                </div>
            }
            inputProps={{
                pattern: '[0-9]*',
                decimal: 2,
                formNoValidate: 'formnovalidate',
                maxLength: props.maxLength
            }}
        />
    );
});

InputField.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    onChange: PropTypes.func
    // Deve haver mais, mas precisa inspecionar
};

InputField.defaultProps = {};

InputField.displayName = 'InputField';

export default InputField;
