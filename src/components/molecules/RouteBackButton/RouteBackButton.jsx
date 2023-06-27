import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Icon, IconButton } from 'investira.react.components';

const RouteBackButton = memo(props => {
    const { size, color, go, push, state, callback } = props;
    const history = useHistory();
    const xState = state || {};

    const handleClick = () => {
        if (go) {
            history.go(go);
        } else if (push) {
            history.push(push, xState);
        } else {
            history.goBack();
        }
        callback && callback();
    };

    return (
        <IconButton onClick={handleClick}>
            <Icon iconName={props.icon} size={size} color={color} />
        </IconButton>
    );
});

RouteBackButton.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    go: PropTypes.string,
    icon: PropTypes.string
};

RouteBackButton.defaultProps = {
    size: 22,
    color: 'primary',
    go: null,
    icon: 'arrow-previous'
};

export default RouteBackButton;
