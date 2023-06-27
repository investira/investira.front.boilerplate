import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Icon, IconButton } from 'investira.react.components';

const CloseIconButton = memo(props => {
    const { onClick, size, color } = props;

    return (
        <IconButton onClick={onClick}>
            <Icon iconName="cancel" size={size} color={color} />
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
    color: 'primary'
};

export default CloseIconButton;
