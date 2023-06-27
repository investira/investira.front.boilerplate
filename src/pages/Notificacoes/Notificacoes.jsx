import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import { objects, arrays, validators } from 'investira.sdk';
import { displays } from 'investira.react.lib';
import { Typography, CenterInView, NavBar } from 'investira.react.components';
import { MainMenuButton, RouteBackButton } from '../../components/molecules';
import { MainTemplate } from '../../components/templates';
import { GENERIC } from '../../const';
import Notificacao from './Notificacao';
import {
    acNotificationsChanged,
    acNotificationsView,
    acNotificationsAmountChanged
} from '../../store/actions';

import withResponseHandling from '../../hoc/withResponseHandling';
import services from '../../services';

import Style from './Notificacoes.module.scss';

function Notificacoes(props) {
    const dispatch = useDispatch();
    const notificacoes = useSelector(state => state.notificacoesList.data);
    const location = useLocation();

    const addRid = pData => {
        return {
            ...pData,
            _rid: pData._rid
        };
    };

    const setStoreNotificacoes = pData => {
        const xNotificacoes = mapNotificacaoData(pData, addRid);
        const xPayload = {
            data: xNotificacoes
        };
        dispatch(acNotificationsChanged(xPayload));
        dispatch(acNotificationsView());
        dispatch(acNotificationsAmountChanged(0));
    };

    const mapNotificacaoData = (pData, pModel) => {
        return arrays.arrayToObject(
            pData.map(pNotificacao => {
                return pModel(pNotificacao, displays.initialsLetters);
            }),
            '_rid'
        );
    };

    const getNotificacoes = (pParams = {}) => {
        const xResProps = { params: { ...pParams } };

        services.notificacoes.list(
            xResProps,
            rRes => {
                if (!validators.isEmpty(rRes.data)) {
                    setStoreNotificacoes(rRes.data);
                } else {
                    setStoreNotificacoes([]);
                }
            },
            rErr => {
                console.log(rErr);
            }
        );
    };

    const replyInvite = (pReply, pRid) => {
        const xResProps = {
            data: {
                ...pReply
            }
        };

        services.notificacoes.reply(
            xResProps,
            _rRes => {
                removeNotificacao(pRid);
            },
            rErr => {
                props.responseErrorHandling(rErr);
            }
        );
    };

    const removeNotificacao = pId => {
        const xNotificacoes = objects.deepCopy(notificacoes);
        delete xNotificacoes[pId];
        const xPayload = {
            data: xNotificacoes
        };
        dispatch(acNotificationsChanged(xPayload));
        dispatch(acNotificationsView());
    };

    const handleAccept = pData => {
        replyInvite(
            {
                tipo: pData.tipo,
                acao: 'A',
                usuario_id: pData.usuario_id
            },
            pData._rid
        );
    };

    const handleBlock = pData => {
        replyInvite(
            {
                tipo: pData.tipo,
                acao: 'B',
                usuario_id: pData.usuario_id
            },
            pData._rid
        );
    };

    const handleIgnore = pData => {
        replyInvite(
            {
                tipo: pData.tipo,
                acao: pData.tipo === 'A' ? 'L' : 'E',
                usuario_id: pData.tipo === 'A' ? pData.contato_usuario_id : pData.usuario_id
            },
            pData._rid
        );
    };

    const verifyLocationState = pState => {
        if (location.state && location.state[pState]) {
            return location.state[pState];
        }

        return false;
    };

    useEffect(() => {
        getNotificacoes();
    }, []);

    return (
        <MainTemplate>
            <NavBar
                left={<RouteBackButton />}
                center={
                    <Typography variant={'h6'} color={'textPrimary'}>
                        Notificações
                    </Typography>
                }
            />

            <div className={Style.root}>
                {validators.isEmpty(notificacoes) ? (
                    <CenterInView>
                        <Typography variant={'body2'} align={'center'} color={'textSecondary'}>
                            {GENERIC.NOTIFICACOES.EMPTY_NOTIFICATIONS}
                        </Typography>
                    </CenterInView>
                ) : (
                    <TransitionGroup className={Style.list} appear={true} enter={true} exit={true}>
                        {Object.values(notificacoes).map((xItem, xIndex) => {
                            return (
                                <CSSTransition
                                    key={xIndex}
                                    in={true}
                                    timeout={500}
                                    classNames={Style}
                                    unmountOnExit
                                    appear>
                                    <div id={xItem.id}>
                                        <Notificacao
                                            id={xItem.id}
                                            data={xItem}
                                            onAccept={handleAccept}
                                            onIgnore={handleIgnore}
                                            onBlock={handleBlock}
                                        />
                                    </div>
                                </CSSTransition>
                            );
                        })}
                    </TransitionGroup>
                )}
            </div>
        </MainTemplate>
    );
}

Notificacoes.displayName = 'Notificacoes';

export default withResponseHandling(Notificacoes);
