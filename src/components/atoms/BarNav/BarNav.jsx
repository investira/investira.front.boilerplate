import React from 'react';
import Style from './BarNav.module.scss';
function BarNav(props) {
    return <div className={Style.root}>{props.children}</div>;
}

BarNav.displayName = 'BarNav';

export default BarNav;
