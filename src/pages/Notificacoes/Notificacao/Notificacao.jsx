import React from 'react';
import { Paper, Avatar, Icon, IconButton, Badge } from 'investira.react.components';
import NotificacaoTitle from './NotificacaoTitle';
import NotificacaoContent from './NotificacaoContent';
import NotificacaoContentText from './NotificacaoContentText';
import NotificacaoActions from './NotificacaoActions';
import { validators } from 'investira.sdk';
import { displays } from 'investira.react.lib';
import PropTypes from 'prop-types';
import Style from './Notificacao.module.scss';

function Notificacao(props) {
    const { photo, name_first, name_last, descricao } = props.data;

    const handleIgnore = () => {
        props.onIgnore && props.onIgnore(props.data);
    };

    return (
        <div className={Style.root}>
            <Paper>
                <div className={Style.title}>
                    <div className={Style.iconTitle}>
                        <Badge
                            size={'small'}
                            color={'primary'}
                            overlap={'circular'}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}
                            badgeContent={<Icon size={10} iconName={'user'} />}>
                            {!validators.isNull(photo) ? (
                                <Avatar src={photo} />
                            ) : (
                                <Avatar>
                                    {' '}
                                    {displays.initialsLetters(`${name_first} ${name_last}`)}{' '}
                                </Avatar>
                            )}
                        </Badge>
                    </div>
                    <div className={Style.textTitle}>
                        <NotificacaoTitle data={props.data} />
                    </div>
                    <div className={Style.cancel}>
                        <IconButton onClick={handleIgnore}>
                            <Icon size={18} color={'primary'} iconName={'cancel'} />
                        </IconButton>
                    </div>
                </div>
                <div className={Style.content}>
                    <NotificacaoContent data={props.data.data}>
                        {descricao.length > 50 && <NotificacaoContentText data={props.data} />}
                    </NotificacaoContent>
                </div>
                <div className={Style.actions}>
                    <NotificacaoActions
                        onAccept={props.onAccept}
                        onBlock={props.onBlock}
                        data={props.data}
                    />
                </div>
            </Paper>
        </div>
    );
}

Notificacao.propTypes = {
    onAccept: PropTypes.func,
    onBlock: PropTypes.func,
    onIgnore: PropTypes.func,
    data: PropTypes.object
};

export default Notificacao;
