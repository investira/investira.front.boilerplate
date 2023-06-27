import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '../ErrorBoundary';
import Style from './Body.module.scss';

const Body = props => {
    const { children, id, ...otherProps } = props;
    return (
        <ErrorBoundary>
            <div id={props.id} className={Style.root} {...otherProps}>
                {children}
            </div>
        </ErrorBoundary>
    );
};

Body.propTypes = {
    children: PropTypes.element
};

export default Body;
