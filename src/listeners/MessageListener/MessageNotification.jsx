import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Avatar, ButtonBase, Icon } from 'investira.react.components';
import { displays } from 'investira.react.lib';

import { acMessageClosed } from '../../store/actions';
import store from '../../store';
import Style from './MessageNotification.module.scss';

const MessageNotification = React.forwardRef((props, ref) => {
    const handleClose = pEvent => {
        pEvent.preventDefault();
        store.dispatch(acMessageClosed());
    };

    return (
        <div onClick={e => handleClose(e)} className={Style.root} ref={ref}>
            <Paper>
                <div className={Style.content}>
                    <div className={Style.icon}>
                        <Avatar>{displays.initialsLetters(props.data.name)}</Avatar>
                    </div>
                    <div className={Style.message}>
                        <b>{props.data.name}</b>
                        <br />
                        {props.data.message}
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

MessageNotification.propTypes = {
    data: PropTypes.object
};

MessageNotification.displayName = 'MessageNotification';

export default MessageNotification;
