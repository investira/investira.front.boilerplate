import React from 'react';

function View(props) {
    const { children, ...attrs } = props;

    return <div {...attrs}>{children}</div>;
}

export default View;
