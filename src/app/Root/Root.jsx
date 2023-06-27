import React, { memo, useState, useEffect } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { browsers } from 'investira.react.lib';
import { validators } from 'investira.sdk';
import services from '../../services';
import { Login, EmailConfirm, RememberPassword, Test } from '../../pages';
import { PrivateRouteController } from '../../controllers';
import { MessageListener } from '../../listeners';
import { MESSAGES } from '../../const';
import {
    acAuthLogin,
    acAuthIsFetching,
    acAuthUpdateStatusToken,
    acMessageTextChanged,
    acMessageClosed,
    acAppSetConectionState,
    acAppSetVisibilityState,
    acAuthTokenNoExpired
} from '../../store/actions';
import Main from './Main';

const Root = memo(props => {
    const dispatch = useDispatch();
    const isFirstLogin = useSelector(state => state.auth.isFirstLogin);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const accessToken = useSelector(state => state.authLogin.accessToken);
    const expiresToken = useSelector(state => state.authLogin.expiresToken);

    function updateStatusConection() {
        let xConnection = browsers.isOnline();

        dispatch(acAppSetConectionState(xConnection));

        if (!xConnection) {
            dispatch(
                acMessageTextChanged({
                    data: {
                        message: MESSAGES.STATUS.OFFLINE
                    },
                    duration: null
                })
            );
        } else {
            dispatch(acMessageClosed());
        }
    }

    function verifyTokenExpires(pExpiresToken) {
        const xCurrentDate = new Date().getTime();
        const xExpiresDate = new Date(pExpiresToken).getTime();

        return xCurrentDate > xExpiresDate;
    }

    function refreshToken(pAccessToken, pExpiresToken) {
        if (!validators.isNull(pAccessToken) && verifyTokenExpires(pExpiresToken)) {
            dispatch(acAuthIsFetching(true));
            dispatch(acAuthUpdateStatusToken('updating'));
            services.auth.refreshToken(
                {},
                rRes => {
                    dispatch(acAuthLogin(rRes.data));
                    dispatch(acAuthIsFetching(false));
                    dispatch(acAuthUpdateStatusToken('valid'));
                },
                rErr => {
                    dispatch(acAuthIsFetching(false));
                    dispatch(acAuthUpdateStatusToken('invalid'));
                }
            );
        } else {
            dispatch(acAuthTokenNoExpired());
        }
    }

    // Escuta o modo de conexão do navegador
    function connectionListener() {
        window.addEventListener('offline', updateStatusConection);
        window.addEventListener('online', updateStatusConection);
    }

    // Escuta se a janela, aba ou webwiew está ativa
    function visibilityListener() {
        document.addEventListener(
            'visibilitychange',
            dispatch(acAppSetVisibilityState(document.visibilityState))
        );
    }

    // Define qual componente deve ser a rota principal
    function privateRoutes() {
        const { showRoot, redirectComponent } = props;
        const Component = redirectComponent;

        if (showRoot) {
            return <PrivateRouteController path="/" component={Main} isLoggedIn={isLoggedIn} />;
        } else {
            return <Component />;
        }
    }

    // Caso não encontre uma rota definida redireciona para a raiz
    function redirect() {
        if (!isLoggedIn) {
            return <Redirect from="*" to="/" />;
        }
    }

    // Mount
    useEffect(() => {
        updateStatusConection();
        connectionListener();
        dispatch(acAppSetVisibilityState(document.visibilityState));
        visibilityListener();

        if (accessToken && browsers.isOnline()) {
            refreshToken(accessToken, expiresToken);
        }
    }, []);

    // Render
    return (
        <>
            <MessageListener />

            <Switch>
                {/* Rotas públicas */}
                <Route exact path="/email-confirm/:code/" component={EmailConfirm} />
                <Route exact path="/change-password/:code" component={RememberPassword} />
                <Route exact path="/reset-password/:username" component={RememberPassword} />
                <Route exact path="/login/:username" component={Login} />
                <Route exact path="/login" component={Login} />
                {/* Rotas privadas */}
                {privateRoutes()}
                {/* Redireciona para a raiz caso não encontre uma rota */}
                {redirect()}
            </Switch>
        </>
    );
});

Root.displayName = 'Root';

export default withRouter(Root);
