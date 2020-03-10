import React from 'react';
//import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Style from './RouteTransition.module.scss';
//import './Transition.css';

const RouteTransition = (props) => {
    return (
        <div className={Style.root}>{props.children}</div>

        // <TransitionGroup className={Style.root}>
        //     <CSSTransition
        //         key={props.location.key}
        //         timeout={{ enter: 500, exit: 500 }}
        //         classNames={'fade'}>
        //         {/* <div className={Style.children}>{props.children}</div> */}
        //         {props.children}
        //     </CSSTransition>
        // </TransitionGroup>
    );
};

export default RouteTransition;
