import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, TextField, Typography } from 'investira.react.components';

const SingleInput = memo(props => {
    const { title, caption, InputProps, ...restProps } = props;
    const { sx, ...restInputProps } = InputProps;

    return (
        <Box>
            {title && (
                <Typography
                    variant="h5"
                    color="text.primary"
                    sx={{
                        fontWeight: 500,
                        mb: 1
                    }}>
                    {title}
                </Typography>
            )}
            {caption && (
                <Typography variant="caption" color="text.primary">
                    {caption}
                </Typography>
            )}
            <TextField
                fullWidth
                {...restProps}
                InputProps={{
                    sx: {
                        fontSize: '1.8rem',
                        padding: '1.5rem 1rem 1rem 1rem',
                        ...sx
                    },
                    ...restInputProps
                }}
            />
        </Box>
    );
});

SingleInput.propTypes = {
    title: PropTypes.string,
    caption: PropTypes.string,
    InputProps: PropTypes.object
};

SingleInput.defaultProps = {
    title: '',
    caption: '',
    InputProps: {}
};

SingleInput.displayName = 'SingleInput';

export default SingleInput;
