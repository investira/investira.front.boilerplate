import React from 'react';
import { useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Style from './RouteTransition.module.scss';

const RouteTransition = props => {
    const location = useLocation();
    return (
        <TransitionGroup className={Style.root}>
            <CSSTransition key={location.pathname} classNames="page" timeout={300} unmountOnExit>
                <div className={Style.root}>{props.children}</div>
            </CSSTransition>
        </TransitionGroup>
    );
};

RouteTransition.displayName = 'RouteTransition';

export default RouteTransition;
