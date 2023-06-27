import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { SliderField, Typography } from 'investira.react.components';
import InputField from './InputField';
import { useFormikContext } from 'formik';

const SliderInputField = memo(props => {
    const context = useFormikContext();
    const timeout = useRef(null);

    function handleChange(pName, pValue) {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }

        const { setFieldValue } = context;

        timeout.current = setTimeout(() => {
            setFieldValue(props.name, pValue);
            props.onChange && props.onChange(props.name, pValue, context);
        }, 300);
    }

    return (
        <div>
            <Typography id="non-linear-slider" variant="caption" color="textSecondary" gutterBottom>
                {props.label}
            </Typography>

            {props.variant === 'slider' && (
                <SliderField
                    min={0}
                    name={props.name}
                    max={props.max}
                    step={1}
                    value={props.value}
                    onChange={handleChange}
                    disabled={props.disabled}
                />
            )}

            {props.variant === 'input' && (
                <InputField
                    value={props.value}
                    name={props.name}
                    onChange={value => {
                        console.log(value);
                    }}
                    maxLength={props.maxLength}
                    disabled={props.disabled}
                />
            )}
        </div>
    );
});

SliderInputField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.number,
    max: PropTypes.number,
    variant: PropTypes.oneOf(['slider', 'input'])
};

SliderInputField.defaultProps = {
    label: '',
    value: 0,
    max: 100,
    variant: 'slider'
};

SliderInputField.displayName = 'SliderInputField';

export default SliderInputField;
