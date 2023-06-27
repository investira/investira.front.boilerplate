import React from 'react';
import { Typography, Button, CenterInView } from 'investira.react.components';
import { GENERIC, MESSAGES } from '../../../const';
import Style from './ErrorBody.module.scss';

function ErrorBody(props) {
    return (
        <div className={Style.root}>
            <CenterInView>
                <div className={Style.body}>
                    {props.d !== '' && (
                        <div className={Style.img}>
                            <svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 24 24">
                                <path className={Style.fill} d={props.d} />
                            </svg>
                        </div>
                    )}

                    <Typography variant={'body1'} color={'textPrimary'} gutterBottom>
                        {props.message || MESSAGES.GENERIC.ERROR}
                    </Typography>

                    <Button onClick={props.handleClick} variant={'outlined'} color={'primary'}>
                        {GENERIC.GENERIC.TRY_AGAIN}
                    </Button>
                </div>
            </CenterInView>
        </div>
    );
}

export default ErrorBody;
