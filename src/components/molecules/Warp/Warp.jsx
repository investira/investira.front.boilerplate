import React, { memo } from 'react';
import { PropTypes } from 'prop-types';
import { Container, Stack } from 'investira.react.components';

const Warp = memo(props => {
    const Component = props.component || Container;

    return (
        <Component {...props} sx={{ ...props.sx, height: '100%' }}>
            <Stack sx={{ height: '100%' }}>{props.children}</Stack>
        </Component>
    );
});

Warp.propTypes = {
    component: PropTypes.node
};

// Warp.defaultProps = {
//     component: Container
// };

export default Warp;
