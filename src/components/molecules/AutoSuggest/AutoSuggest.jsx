import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';

import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import { useFormikContext } from 'formik';

import { TextField, Autocomplete } from 'investira.react.components';
import { validators } from 'investira.sdk';

const AutoSuggest = memo(props => {
    const [value, setValue] = React.useState(null);

    const optionLabel = option => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
            return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
            return option.inputValue;
        }
        // Regular option
        return option.label;
    };

    const defaultProps = {
        options: props.data,
        getOptionLabel: option => optionLabel(option)
    };

    function handleChange(pEvent, pNewValue) {
        if (typeof pNewValue === 'string') {
            setValue({
                label: pNewValue
            });
        } else if (pNewValue && pNewValue.inputValue) {
            setValue({
                label: pNewValue.inputValue
            });
        } else {
            setValue(pNewValue);
        }
    }

    const formikContext = useFormikContext();

    let setFieldValue = null;

    if (!validators.isNull(formikContext)) {
        setFieldValue = formikContext.setFieldValue;
    }

    useEffect(() => {
        if (setFieldValue && !validators.isNull(value?.label)) {
            setFieldValue(props.name, value.label);
        }
    }, [value]);

    const { errors, values } = formikContext;

    return (
        <Autocomplete
            {...defaultProps}
            id={props.id}
            name={props.name}
            label={props.label}
            value={values[props.name]}
            onChange={handleChange}
            loading={true}
            size="small"
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            renderOption={(option, { inputValue }) => {
                const matches = match(option.label, inputValue);
                const parts = parse(option.label, matches);

                return parts.map((part, i) => {
                    return (
                        <span key={i} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                            {part.text}
                        </span>
                    );
                });
            }}
            renderInput={params => (
                <TextField
                    {...params}
                    label={props.label}
                    error={Boolean(errors[props.name])}
                    helperText={errors[props.name]}
                    InputLabelProps={{ ...params.InputLabelProps, ...props.InputLabelProps }}
                    InputProps={{ ...params.InputProps, type: 'search' }}
                />
            )}
        />
    );
});

AutoSuggest.propTypes = {
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

AutoSuggest.displayName = 'AutoSuggest';

export default AutoSuggest;
