import React from 'react';
import { Paper, Typography, Icon, ButtonBase } from 'investira.react.components';
import PropTypes from 'prop-types';
import Style from './MessageIntegration.module.scss';

const MessageIntegration = React.forwardRef((props, ref) => {
    return (
        <div className={Style.root} ref={ref}>
            <Paper>
                <div className={Style.content}>
                    <div className={Style.icon}>
                        <div className={Style.status}>
                            <div className={Style.fakeBg}>
                                <div className={Style.chidren}></div>
                            </div>
                        </div>
                    </div>
                    <div className={Style.message}>
                        <Typography variant={'body2'} id="message-id">
                            {props.data.message}
                        </Typography>
                    </div>
                    <div className={Style.action}>
                        <ButtonBase key="close" aria-label="Fechar" onClick={props.doMessageClose}>
                            <Icon color={'primary'} size={18} iconName={'cancel'} />
                        </ButtonBase>
                    </div>
                </div>
            </Paper>
        </div>
    );
});

MessageIntegration.propTypes = {
    data: PropTypes.object
};

MessageIntegration.displayName = 'MessageIntegration';

export default MessageIntegration;
