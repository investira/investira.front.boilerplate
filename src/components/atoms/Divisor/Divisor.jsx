import React from 'react';
import { Typography } from 'investira.react.components';
import Style from './Divisor.module.scss';

function Divisor(props) {
    return (
        <div className={Style.root}>
            <Typography variant={'caption'} className={Style.letter}>
                {props.firstletter}
            </Typography>
        </div>
    );
}

Divisor.displayName = 'Divisor';

export default Divisor;
