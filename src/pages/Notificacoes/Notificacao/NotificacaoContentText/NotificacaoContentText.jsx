import React from 'react';
import { Typography } from 'investira.react.components';
import PropTypes from 'prop-types';
import Style from './NotificacaoContentText.module.scss';

function NotificacaoContentText(props) {
    const { descricao } = props.data;
    return (
        <div>
            <Typography variant={'caption'} className={Style.text}>
                {descricao}
            </Typography>
        </div>
    );
}

NotificacaoContentText.propTypes = {
    texto: PropTypes.string
};

export default NotificacaoContentText;
