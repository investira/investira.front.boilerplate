import React from 'react';
import PropTypes from 'prop-types';
import { Slide } from 'investiraComponents';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction={props.direction} ref={ref} {...props} />;
});

Transition.propTypes = {
    direction: PropTypes.string
};

Transition.defaultProps = {
    direction: 'up'
};

export default Transition;
