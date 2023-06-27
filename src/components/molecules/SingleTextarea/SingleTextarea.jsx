import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, TextField, Typography } from 'investira.react.components';

const SingleTextarea = memo(props => {
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
            <Box padding={2}></Box>
            <TextField
                {...restProps}
                InputProps={{
                    sx: {
                        fontSize: '1.2rem',
                        padding: '1.5rem 1rem 1rem 1rem',
                        ...sx
                    },
                    ...restInputProps
                }}
                fullWidth
                multiline
                maxRows={4}
            />
        </Box>
    );
});

SingleTextarea.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    caption: PropTypes.string,
    InputProps: PropTypes.object
};

SingleTextarea.defaultProps = {
    title: '',
    caption: '',
    InputProps: {}
};

SingleTextarea.displayName = 'SingleTextarea';

export default SingleTextarea;
