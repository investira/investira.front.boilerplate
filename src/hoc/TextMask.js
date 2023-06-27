import React, { useState, useEffect } from 'react';
import { validators } from 'investira.sdk';
import InputMask from 'react-input-mask';

function TextMask({
    onChange,
    onPaste,
    onMouseDown,
    onFocus,
    onBlur,
    onKeyUp,
    value,
    disabled,
    readOnly,
    component,
    mask,
    maskChar,
    beforeMaskedValueChange,
    ...otherProps
}) {
    const [xMask, setMask] = useState('');
    const Component = component;

    const handleBeforeMaskedValueChange = (newState, oldState, userInput) => {
        if (beforeMaskedValueChange) {
            return beforeMaskedValueChange(newState, oldState, userInput, setMask, mask);
        } else {
            let { value, selection } = newState;

            return {
                value,
                selection
            };
        }
    };

    const handleKeyUp = pEvent => {
        onKeyUp && onKeyUp(pEvent, setMask);
    };

    useEffect(() => {
        //componentDidMount
        validators.isArray(mask) && setMask(mask[0]);
        validators.isString(mask) && setMask(mask);
    }, []);

    return (
        <InputMask
            mask={xMask}
            maskChar={maskChar}
            value={value}
            onChange={onChange}
            onPaste={onPaste}
            onMouseDown={onMouseDown}
            onFocus={onMouseDown}
            onBlur={onBlur}
            onKeyUp={handleKeyUp}
            beforeMaskedValueChange={handleBeforeMaskedValueChange}
            disabled={disabled}
            readOnly={readOnly}>
            {inputProps => {
                return <Component {...otherProps} {...inputProps} />;
            }}
        </InputMask>
    );
}

TextMask.propTypes = {};

TextMask.defaultProps = {};

export default TextMask;
