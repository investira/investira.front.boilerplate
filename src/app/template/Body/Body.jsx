import React from 'react';
import PropTypes from 'prop-types';
import { ErrorBoundary } from '../../viewsController';
import Style from './Body.module.scss';

const Body = props => {
    const { children, ...otherProps } = props;
    return (
        <ErrorBoundary>
            <div className={Style.root} {...otherProps}>
                {children}
            </div>
        </ErrorBoundary>
    );
};

Body.propTypes = {
    children: PropTypes.element
};

export default Body;
