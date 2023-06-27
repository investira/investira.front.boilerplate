import React from 'react';
import { Paper, Icon, ButtonBase, Typography } from 'investira.react.components';
import PropTypes from 'prop-types';
import Style from './MessageDefault.module.scss';

const MessageDefault = React.forwardRef((props, ref) => {
    return (
        <div className={Style.root} ref={ref}>
            <Paper>
                <div className={Style.content}>
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

MessageDefault.propTypes = {
    data: PropTypes.object
};

MessageDefault.displayName = 'MessageDefault';

export default MessageDefault;
