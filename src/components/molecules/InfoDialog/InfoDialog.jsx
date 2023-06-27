import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Icon, Box, Stack, Typography, withDialog } from 'investira.react.components';

const InfoDialog = memo(props => {
    function handleToggleDialog(pEvent) {
        pEvent.preventDefault();
        const { title, content, actions } = props.dialogProps;

        props.onOpenDialog({
            title,
            content,
            actions
        });

        pEvent.stopPropagation();
    }

    const { iconProps, dialogProps, labelProps, hidden, color, iconColor, label } = props;

    if (hidden) {
        return null;
    } else {
        return (
            <Box component="span" style={{ color: color, ...dialogProps }}>
                <Stack
                    component="button"
                    type={'button'}
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ border: 0, margin: 0, padding: 0 }}
                    onClick={handleToggleDialog}>
                    {label && (
                        <Typography variant={labelProps.variant} color={color}>
                            {label}
                        </Typography>
                    )}
                    <Icon
                        iconName={iconProps.iconName}
                        color={iconColor || color}
                        size={iconProps.size || 16}
                    />
                </Stack>
            </Box>
        );
    }
});

InfoDialog.propTypes = {
    hidden: PropTypes.bool,
    label: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
    onClose: PropTypes.func,
    iconColor: PropTypes.string,
    iconProps: PropTypes.object,
    dialogProps: PropTypes.object, //title, content, variant
    labelProps: PropTypes.object,
    actions: PropTypes.object
};

InfoDialog.defaultProps = {
    hidden: false,
    color: 'inherit',
    iconProps: { iconName: 'information' },
    dialogProps: {},
    labelProps: { variant: 'caption' },
    actions: {}
};

InfoDialog.displayName = 'InfoDialog';

export default withDialog(InfoDialog);
