import React, { Component } from 'react';
import classNames from 'classnames';
import { Typography } from 'investiraComponents';

import Style from './Login.module.scss';

class LoginHeader extends Component {
    constructor(props) {
        super(props);
        this.header = React.createRef();
    }

    componentDidMount() {}

    componentDidUpdate(prevProps) {
        if (prevProps.step !== this.props.step) {
            //console.log('step');
        }
    }

    render() {
        const {
            step,
            prevLocation,
            //position,
            title,
            username
            //handleNext,
        } = this.props;

        // Alterar a altura do hero
        var xClassHero = classNames(Style.hero, {
            [Style.headPassword]: step === 1,
            [Style.headRegister]: step === 2
        });

        // Alterar posição e tamanho do logo
        var xClassWarpLogo = classNames(Style.logoWrap, {
            [Style.logoWrapUsername]: step === 0 && prevLocation === '',
            [Style.logoWrapUsernamePassword]: step === 0 && prevLocation === 'password',
            [Style.logoWrapUsernameRegister]: step === 0 && prevLocation === 'register',
            [Style.logoWrapPassword]: step === 1,
            [Style.logoWrapRegister]: step === 2
        });

        // Posição do slogan
        var xClassSlogan = classNames(Style.slogan, {
            [Style.sloganInset]: step === 0,
            [Style.sloganOffset]: step === 1 || step === 2
        });

        // Posição do callout
        var xClassCallout = classNames(Style.callout, {
            [Style.calloutInset]: step === 0,
            [Style.calloutOffset]: step === 1 || step === 2
        });

        // Posição do título
        var xClassTitle = classNames(Style.viewTitle, {
            [Style.titleOffset]: step === 0,
            [Style.titleInset]: step === 1 || step === 2
        });

        // Posição do username (email)
        var xClassUsername = classNames(Style.username, {
            [Style.usernameOffset]: step === 0,
            [Style.usernameInset]: step === 1 || step === 2
        });

        // var xClassLogo = classNames(Style.logo, {
        //     [Style.logoBig]: step === 0,
        //     [Style.logoSmall]: step === 1 || step === 2,
        // });

        return (
            <div className={xClassHero} ref={this.header}>
                {/* logo */}
                <div id={'warpLogo'} className={xClassWarpLogo}>
                    <svg
                        id="investira"
                        viewBox="0 0 165 165"
                        className={Style.logo}
                        width="100%"
                        height="100%"
                        preserveAspectRatio={'none'}>
                        <path d="M41.185,0C18.317,0,0,18.706,0,41.565V165h123.931C146.779,165,165,147.171,165,124.312V0H41.185z M68.029,125.888 C63.745,132.009,58.543,135,51.073,135H30.841l66.232-94.894c4.284-6.126,9.475-9.106,16.95-9.106h20.24L68.029,125.888z" />
                        <linearGradient id="icon-gradient" x2="1" y2="1">
                            <stop offset="0%" stopColor="#00DFA8" />
                            <stop offset="100%" stopColor="#04A899" />
                        </linearGradient>
                    </svg>
                </div>
                {/* Slogan */}
                {/* <Typography
                    variant="h4"
                    className={xClassSlogan}
                    color="textPrimary"
                    id={'slogan'}>
                    Ajudando você
                    <br />
                    <b>a alcançar suas metas</b>
                </Typography> */}
                {/* Login / Cadastro */}
                <Typography variant="h4" className={xClassTitle} color="textPrimary" id={'title'}>
                    <b>{title}</b>
                </Typography>
                <Typography
                    variant="body1"
                    color="textPrimary"
                    className={xClassCallout}
                    id={'callout'}>
                    <b>Realize seu login:</b>
                </Typography>

                {/* Username */}
                <Typography
                    variant="body1"
                    color="textPrimary"
                    className={xClassUsername}
                    id={'username'}>
                    <b>{username}</b>
                </Typography>
            </div>
        );
    }
}

export default LoginHeader;
