import React, { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { validators, arrays } from 'investira.sdk';
import { Loading, CenterInView } from 'investira.react.components';
import services from '../../../../services';
import app from '../../../../utils/app';
import usePrevious from '../../../../hooks/usePrevious';
import {
    acUserUpdate,
    acNotificationsChanged,
    acNotificationsAmountChanged,
    acInfoChange
} from '../../../../store/actions';
import { countNewNotifications } from '../../../../utils/helpers';
import { ErrorDataView } from '../../../../components/molecules';

import withResponseHandling from '../../../../hoc/withResponseHandling';

const Preload = memo(props => {
    const dispatch = useDispatch();
    const notificacoes = useSelector(state => state.notificacoesList.data);
    const newNotificacoes = useSelector(state => state.newNotificacoes.data);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [instituicoes, setInstituicoes] = useState({});

    const prevDataLoaded = usePrevious(dataLoaded);

    async function verifyToken() {
        return await services.info.read(
            {},
            async () => {
                await preload();
            },
            async rErr => {
                app.logout();
            }
        );
    }

    function feedRedux(pResponses) {
        try {
            const xDispatches = [
                pData => dispatch(acUserUpdate(pData)),
                pData => {
                    const xCurrentData = notificacoes;
                    const xCurrentAmount = newNotificacoes;
                    const xPayload = {
                        data: pData
                    };

                    dispatch(acNotificationsChanged(xPayload));
                    dispatch(
                        acNotificationsAmountChanged(
                            xCurrentAmount + countNewNotifications(pData, xCurrentData)
                        )
                    );
                },
                pData => dispatch(acInfoChange(pData))
            ];

            pResponses.forEach((pData, pIndex) => {
                xDispatches[pIndex](pData);
            });

            setDataLoaded(true);
            setInstituicoes(pResponses[0]);
        } catch (error) {
            console.error('Preload => feedRedux()', error.message);
            return error;
        }
    }

    async function baseRequest(pService) {
        return await pService(
            {},
            rRes => {
                return rRes.data;
            },
            rErr => {
                throw rErr;
            }
        );
    }

    async function preload() {
        const xRequests = [
            baseRequest(services.user.read),
            baseRequest(services.notificacoes.list),
            baseRequest(services.info.read)
        ];

        await Promise.all(xRequests)
            .then(rResponses => {
                feedRedux(rResponses);
            })
            .catch(rErr => {
                const xCallbacks = {
                    err400: () => setError(true),
                    err404: () => setError(true),
                    err500: () => setError(true)
                };
                this.props.responseErrorHandling(rErr, xCallbacks);
            });
    }

    async function handleRetry() {
        setError(null);
        await verifyToken();
    }

    async function syncContas(pInstituicoes) {
        for (let xI = 0; xI < pInstituicoes.length; xI++) {
            const xInstituicaoId = pInstituicoes[xI].instituicao_id;

            await services.openbanking.contas(
                { id: xInstituicaoId },
                () => {
                    console.log(`Sincronizando ${xInstituicaoId}`);
                },
                rErr => {
                    console.log(rErr);
                }
            );
        }

        services.conta.list(
            {},
            rRes => {
                props.instituicoesListChanged(rRes.data);
            },
            rErr => {
                console.log(rErr);
            }
        );
    }

    // Testa o token e inicia o preload
    useEffect(() => {
        verifyToken();
    }, []);

    if (!validators.isNull(error)) {
        return <ErrorDataView handleClick={handleRetry} />;
    }

    if (dataLoaded) {
        return props.children;
    } else {
        return (
            <CenterInView>
                <Loading />
            </CenterInView>
        );
    }
});

Preload.propTypes = {
    children: PropTypes.element
};

Preload.defaultProps = {};

Preload.displayName = 'Preload';

export default withResponseHandling(Preload);
