import React, { memo, useState, useEffect } from 'react';
import { Icon, Button } from 'investira.react.components';
import PropTypes from 'prop-types';

const SwithIconButton = memo(props => {
    const [active, setActive] = useState(false);
    const [variant, setVariant] = useState('outlined');
    const [iconColor, setIconColor] = useState('primary');

    const xVariants = ['outlined', 'contained'];
    const xIconColors = ['primary', 'default'];

    const handleClick = pEvent => {
        setActive(!active);
        props.onClick && props.onClick(!active, pEvent);
    };

    useEffect(() => {
        const xVariant = xVariants[Number(active)];
        const xIconColor = xIconColors[Number(active)];
        setVariant(xVariant);
        setIconColor(xIconColor);
    }, [active]);

    return (
        <Button variant={variant} onClick={handleClick} color={'primary'} size={'small'}>
            <Icon iconName={props.iconName} size={props.size} color={iconColor} />
        </Button>
    );
});

SwithIconButton.propTypes = {
    size: PropTypes.number,
    iconName: PropTypes.string
};

SwithIconButton.defaultProps = {
    size: 16,
    iconName: 'on_off'
};

SwithIconButton.displayName = 'SwithIconButton';

export default SwithIconButton;
