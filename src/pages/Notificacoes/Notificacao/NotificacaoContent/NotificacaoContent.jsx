import React from 'react';
import { Typography } from 'investira.react.components';
import PropTypes from 'prop-types';
import { formats } from 'investira.sdk';
function NotificacaoContent(props) {
    return (
        <div>
            {props.children}
            <Typography color={'textSecondary'} variant="caption">
                {formats.fromNow(props.data)}
            </Typography>
        </div>
    );
}

NotificacaoContent.propTypes = {
    data: PropTypes.string
};

export default NotificacaoContent;
