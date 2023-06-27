import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Icon, IconButton } from 'investira.react.components';

const BackIconButton = memo(props => {
    const { onClick, size, color } = props;

    return (
        <IconButton onClick={onClick}>
            <Icon iconName="arrow-previous" size={size} color={color} />
        </IconButton>
    );
});

BackIconButton.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    onClick: PropTypes.func
};

BackIconButton.defaultProps = {
    size: 22,
    color: 'primary'
};

export default BackIconButton;
