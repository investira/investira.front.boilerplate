import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Icon, IconButton } from 'investira.react.components';

const CloseIconButton = memo(props => {
    const { onClick, size, color, disabled } = props;

    return (
        <IconButton onClick={onClick} disabled={disabled}>
            <Icon iconName="remove" size={size} color={disabled ? 'secondary' : color} />
        </IconButton>
    );
});

CloseIconButton.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    onClick: PropTypes.func
};

CloseIconButton.defaultProps = {
    size: 22,
    color: 'error'
};

export default CloseIconButton;
