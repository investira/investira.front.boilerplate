import React from 'react';
import { Alert } from 'investira.react.components';
import PropTypes from 'prop-types';
import Style from './MessageDefault.module.scss';

const MessageSuccess = React.forwardRef((props, ref) => {
    return (
        <div className={Style.root} ref={ref}>
            <Alert onClose={props.doMessageClose} severity="success">
                {props.data.message}
            </Alert>
        </div>
    );
});

MessageSuccess.propTypes = {
    data: PropTypes.object
};

MessageSuccess.displayName = 'MessageSuccess';

export default MessageSuccess;
