import React from 'react';
import { Alert } from 'investira.react.components';
import PropTypes from 'prop-types';
import Style from './MessageDefault.module.scss';

const MessageError = React.forwardRef((props, ref) => {
    return (
        <div className={Style.root} ref={ref}>
            <Alert onClose={props.doMessageClose} severity="error">
                {props.data.message}
            </Alert>
        </div>
    );
});

MessageError.propTypes = {
    data: PropTypes.object
};

MessageError.displayName = 'MessageError';

export default MessageError;
