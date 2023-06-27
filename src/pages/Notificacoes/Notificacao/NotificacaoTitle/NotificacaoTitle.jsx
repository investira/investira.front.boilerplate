import React from 'react';
import { Typography } from 'investira.react.components';
import PropTypes from 'prop-types';
import { NOTIFICATIONS } from '../../../../const';
import Style from './NotificacaoTitle.module.scss';

function NotificacaoTitle(props) {
    const { tipo, name_first, name_last, contato_name_first, contato_name_last } = props.data;

    return (
        <div className={Style.root}>
            <div className={Style.title}>
                <Typography variant="caption">
                    {tipo !== 'info' && tipo !== 'A' && (
                        <strong>
                            {name_first} {name_last}
                        </strong>
                    )}
                    {tipo === 'A' && (
                        <strong>
                            {contato_name_first} {contato_name_last}
                        </strong>
                    )}
                    {tipo === 'shareRequest' && NOTIFICATIONS.SHARE_REQUEST}{' '}
                    {tipo === 'shareAllow' && NOTIFICATIONS.SHARE_ALLOW}{' '}
                    {tipo === 'info' && NOTIFICATIONS.INFO_TITLE}
                    {tipo === 'C' && NOTIFICATIONS.INVITE}
                    {tipo === 'A' && NOTIFICATIONS.INVITE_ACCEPT}
                </Typography>
            </div>
        </div>
    );
}

NotificacaoTitle.propTypes = {
    tipo: PropTypes.string
};

export default NotificacaoTitle;
