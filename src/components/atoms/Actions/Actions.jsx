import React from 'react';
import Style from './Actions.module.scss';

const Actions = props => {
    return (
        <div id={'actions'} className={Style.root}>
            {props.children}
        </div>
    );
};

Actions.displayName = 'Actions';

export default Actions;
