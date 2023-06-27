import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Icon, IconButton } from 'investira.react.components';

const EditIconButton = memo(props => {
    const { onClick, size, color } = props;

    return (
        <IconButton onClick={onClick}>
            <Icon iconName="edit" size={size} color={color} />
        </IconButton>
    );
});

EditIconButton.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    onClick: PropTypes.func
};

EditIconButton.defaultProps = {
    size: 22,
    color: 'primary'
};

export default EditIconButton;
