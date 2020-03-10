import React, { Component } from 'react';
import { Drawer, AppBar, Toolbar, Typography, IconButton, Icon } from 'investiraComponents';

import { CenterInView } from '../../template';
import Style from './LoginCadastroMessage.module.scss';

class LoginCadastroMessage extends Component {
    constructor(props) {
        super(props);

        this._isMounted = false;

        this.state = {
            startAnimation: false
        };
    }

    drawerOnAnimationEnd() {
        const ANIMATION_TIMEOUT = 50;

        setTimeout(() => {
            if (this.state.startAnimation === false) {
                this.setState({ startAnimation: true });
            }
        }, ANIMATION_TIMEOUT);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <Drawer onAnimationEnd={this.drawerOnAnimationEnd()} {...this.props}>
                <div className={Style.root}>
                    <div className={Style.head}>
                        <AppBar>
                            <Toolbar>
                                <div className={Style.toolbar} />
                                <IconButton color={'primary'} onClick={() => this.props.onClose()}>
                                    <Icon size={'21'} iconName={'cancel'} />
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                    </div>
                    <div className={Style.body}>
                        <CenterInView>
                            <div className={Style.circle}>
                                <svg
                                    id="Layer_1"
                                    x="0px"
                                    y="0px"
                                    width="200px"
                                    height="200px"
                                    viewBox="0 0 200 200"
                                    className={this.state.startAnimation ? Style.start : false}>
                                    <path
                                        fill="none"
                                        stroke="#00DFA8"
                                        strokeWidth="6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="10"
                                        d="M7.688000000000002,99.625A93,93 0,1,1 193.688,99.625A93,93 0,1,1 7.688000000000002,99.625"
                                        className={Style.ok}
                                    />
                                    <path
                                        fill="none"
                                        stroke="#47E0A8"
                                        strokeWidth="7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="10"
                                        d="M47.562,98.375L83.562,134.625L153.812,64.625"
                                        className={Style.circle}
                                    />
                                </svg>
                            </div>
                            <Typography
                                gutterBottom
                                variant={'h5'}
                                color={'primary'}
                                align={'center'}>
                                Cadastro efetuado
                                <br /> com sucesso!
                            </Typography>

                            <Typography variant={'body2'} align={'center'} color={'textPrimary'}>
                                Confirme seu cadastro acessando seu email:
                            </Typography>

                            <Typography variant={'body1'} align={'center'} gutterBottom>
                                <span className={Style.highlight}>{this.props.username}</span>
                            </Typography>
                        </CenterInView>
                        {/* <Button
                            variant="outlined"
                            color="primary"
                            size={'small'}
                            className={Style.button}
                            onClick={() => onClose()}>
                            Fazer login
                        </Button> */}
                    </div>
                </div>
            </Drawer>
        );
    }
}

export default LoginCadastroMessage;
