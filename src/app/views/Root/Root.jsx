import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { browsers } from 'investiraLib';
import { httpRequests, validators } from 'investira.sdk';
import Main from '../Main';
import Login from '../Login';
import PrivateRoute from '../../viewsController/PrivateRoute';
import RouteTransition from '../../viewsController/RouteTransition';
import { Snackbar, Button } from 'investiraComponents';
import { REACT_APP_BACK_URI } from '../../services/servicesURI';
import {
    doUpdateToken,
    doMessageClose,
    verifyFirstLogin,
    updateStatusToken,
    updateStatusConection,
    updateStatusTabVisibility,
    getUserData
} from './RootViewActions';

class Root extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rootIs: 'intro'
        };
    }

    // Escuta o modo de conexão do navegador
    connectionListener = () => {
        window.addEventListener('offline', this.props.updateStatusConection);
        window.addEventListener('online', this.props.updateStatusConection);
    };

    // Escuta se a janela, aba ou webwiew está ativa
    visibilityListener = () => {
        document.addEventListener('visibilitychange', this.props.updateStatusTabVisibility);
    };

    componentDidMount() {
        //const xChormeVersion = browsers.getNavigatorVersion();

        this.props.updateStatusConection();
        this.connectionListener();
        this.props.updateStatusTabVisibility();
        this.visibilityListener();

        if (this.props.accessToken && browsers.isOnline()) {
            this.props.doUpdateToken(this.props.accessToken, this.props.expiresToken);
        }

        this.setState({ rootIs: 'private' });
    }

    async componentDidUpdate(prevProps) {
        // Verifica o status do token
        if (prevProps.statusToken !== this.props.statusToken) {
            // Atualiza o token se for inválido.
            if (this.props.statusToken === 'invalid' && this.props.accessToken) {
                this.props.doUpdateToken(
                    this.props.accessToken,
                    this.props.expiresToken,
                    this.props.statusToken
                );
            }
            this.props.statusToken === 'renew' && this.props.updateStatusToken('valid');
        }

        // Verifica se o state de conexão mudou e solicita um novo token
        if (prevProps.online !== this.props.online && this.props.online) {
            this.props.doUpdateToken(this.props.accessToken, this.props.expiresToken);
        }

        // Verifica se a aba ou janela está visível
        if (prevProps.visibility !== this.props.visibility && this.props.visibility === 'visible') {
            // (await httpRequests.hasConnection(
            //     `${INVESTIRA_URI}api/v1/status`
            // )) && this.props.updateStatusToken('invalid');

            if (validators.isNull(REACT_APP_BACK_URI)) {
                console.error('Defina o valor de "REACT_APP_BACK_URI" no enviroment');
            } else {
                (await httpRequests.hasConnection(`${REACT_APP_BACK_URI}api/v1/status`)) &&
                    this.props.doUpdateToken(
                        this.props.accessToken,
                        this.props.expiresToken,
                        this.props.statusToken
                    );
            }
        }

        // Verifica se trocou de rota
        // if (prevProps.location !== this.props.location) {
        //     this.props.statusToken !== 'updating' &&
        //         browsers.isOnline() &&
        //         this.props.doUpdateToken(
        //             this.props.accessToken,
        //             this.props.expiresToken,
        //             this.props.statusToken
        //         );
        // }

        // Verifica se deve exibir a introdução
        if (prevProps.showIntro !== this.props.showIntro) {
            if (this.props.showIntro === false) {
                this.setState({ rootIs: 'private' });
            }
        }

        // Verifica se tem username, caso negativo realiza o read do usuário
        if (!this.props.userId && this.props.accessToken) {
            this.props.getUserData(this.props.accessToken);
        }
    }

    // Caso não encontre uma rota definida redireciona para a raiz
    hasRedirect() {
        if (!this.props.isLoggedIn) {
            return <Redirect from="*" to="/" />;
        }
    }

    render() {
        const { messageOpen, messageText, messageDuration, doMessageClose } = this.props;

        return (
            <Fragment>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    open={messageOpen}
                    autoHideDuration={messageDuration}
                    onClose={doMessageClose}
                    ContentProps={{
                        'aria-describedby': 'message-id'
                    }}
                    message={<span id="message-id">{messageText}</span>}
                    action={[
                        <Button
                            key="close"
                            aria-label="Fechar"
                            color="primary"
                            onClick={doMessageClose}>
                            {/* <Icon iconName="cancel" /> */}
                            Fechar
                        </Button>
                    ]}
                />
                <RouteTransition {...this.props}>
                    <Switch>
                        <Route exact path="/login" component={Login} />

                        {/* Rotas Protegidas */}
                        <PrivateRoute
                            path="/"
                            component={Main}
                            isLoggedIn={this.props.isLoggedIn}
                        />
                        {this.hasRedirect()}
                    </Switch>
                </RouteTransition>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFirstLogin: state.auth.isFirstLogin,
        isLoggedIn: state.auth.isLoggedIn,
        accessToken: state.auth.accessToken,
        statusToken: state.auth.statusToken,
        expiresToken: state.auth.expiresToken,
        messageText: state.message._messageText,
        messageOpen: state.message._messageOpen,
        messageDuration: state.message._messageDuration,
        username: state.user.username,
        userId: state.user.usuario_id,
        location: state.app.location,
        online: state.app.online,
        visibility: state.app.visibility
    };
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            doUpdateToken,
            doMessageClose,
            updateStatusToken,
            updateStatusConection,
            updateStatusTabVisibility,
            getUserData
        },
        dispatch
    );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
