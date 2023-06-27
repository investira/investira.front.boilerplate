import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { ButtonBase, Typography, Stack } from 'investira.react.components';

const TextActionButton = memo(({ children, ...restProps }) => {
    return (
        <ButtonBase {...restProps} color={'primary'}>
            <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                    width: '48px',
                    height: '48px'
                }}>
                <Typography
                    variant={'body1'}
                    color={restProps.disabled ? 'text.secondary' : 'primary'}
                    sx={{ lineHeight: 'unset' }}>
                    {children || 'OK'}
                </Typography>
            </Stack>
        </ButtonBase>
    );
});

TextActionButton.displayName = 'TextActionButton';

TextActionButton.propTypes = {
    disabled: PropTypes.bool
};

TextActionButton.defaultProps = {
    disabled: false
};

export default TextActionButton;
