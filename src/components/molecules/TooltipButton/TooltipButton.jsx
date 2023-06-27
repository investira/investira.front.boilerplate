import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Icon, IconButton } from 'investira.react.components';

const TooltipButton = memo((tooltipProps, iconProps, buttonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    function handleTooltipOpen(pEvent) {
        setIsOpen(true);
        pEvent.stopPropagation();
    }

    function handleTooltipClose(pEvent) {
        setIsOpen(false);
        pEvent.stopPropagation();
    }

    return (
        <Tooltip
            placement={iconProps.placement || 'top'}
            open={isOpen}
            arrow={true}
            title={tooltipProps.title || 'tip'}
            onClose={handleTooltipClose}
            onOpen={handleTooltipOpen}
            {...tooltipProps}>
            <div>
                <IconButton onClick={handleTooltipOpen} {...buttonProps}>
                    {iconProps.iconName && (
                        <Icon
                            iconName={iconProps.iconName}
                            size={iconProps.size || 16}
                            color={iconProps.color || 'secondaryLightness'}
                        />
                    )}
                </IconButton>
            </div>
        </Tooltip>
    );
});

TooltipButton.propTypes = {
    tooltipProps: PropTypes.object,
    iconProps: PropTypes.object,
    buttonProps: PropTypes.object
};

TooltipButton.defaultProps = {
    tooltipProps: {},
    iconProps: {},
    buttonProps: {}
};

TooltipButton.displayName = 'TooltipButton';

export default TooltipButton;
