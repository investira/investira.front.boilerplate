//import React from 'react';
import PropTypes from 'prop-types';

const Hiddenable = props => {
    return props.visible ? props.children : null;
};

Hiddenable.propTypes = {
    visible: PropTypes.bool
};

Hiddenable.defaultProps = {
    visible: true
};

export default Hiddenable;
