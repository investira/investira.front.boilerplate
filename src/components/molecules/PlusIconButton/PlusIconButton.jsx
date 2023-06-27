import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Icon, IconButton } from 'investira.react.components';

const PlusIconButton = memo(props => {
    const { onClick, size, color } = props;

    return (
        <IconButton onClick={onClick}>
            <Icon iconName="insert" size={size} color={color} />
        </IconButton>
    );
});

PlusIconButton.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    onClick: PropTypes.func
};

PlusIconButton.defaultProps = {
    size: 22,
    color: 'primary'
};

export default PlusIconButton;
