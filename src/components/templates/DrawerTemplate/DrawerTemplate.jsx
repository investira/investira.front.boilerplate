import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Drawer } from 'investira.react.components';
import { ErrorBoundary } from '../../molecules';

function DrawerTemplate(props) {
    const { children, open, ...restProps } = props;
    const Component = children;
    const native = useSelector(state => state.native.data);
    return (
        <Drawer anchor={'bottom'} open={open} {...restProps} fullHeight>
            {/* <ErrorBoundary> */}
            {Component ? <Component /> : null}
            {/* </ErrorBoundary> */}
        </Drawer>
    );
}

DrawerTemplate.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    child: PropTypes.elementType
};

DrawerTemplate.displayName = 'DrawerTemplate';

export default DrawerTemplate;
