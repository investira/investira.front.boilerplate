import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Typography } from 'investira.react.components';

import Style from './Login.module.scss';
import { GENERIC } from '../../const';

const LoginHeader = memo(({ step, prevLocation, title, username }) => {
    const headerRef = useRef(null);

    // Alterar a altura do hero
    const xClassHero = classNames(Style.hero, {
        [Style.headPassword]: step === 1,
        [Style.headRegister]: step === 2
    });

    // Alterar posição e tamanho do logo
    const xClassWrapLogo = classNames(Style.logoWrap, {
        [Style.logoWrapUsername]: step === 0 && prevLocation === '',
        [Style.logoWrapUsernamePassword]: step === 0 && prevLocation === 'password',
        [Style.logoWrapUsernameRegister]: step === 0 && prevLocation === 'register',
        [Style.logoWrapPassword]: step === 1,
        [Style.logoWrapRegister]: step === 2
    });

    // Posição do slogan
    const xClassSlogan = classNames(Style.slogan, {
        [Style.sloganInset]: step === 0,
        [Style.sloganOffset]: step === 1 || step === 2
    });

    // Posição do callout
    const xClassCallout = classNames(Style.callout, {
        [Style.calloutInset]: step === 0,
        [Style.calloutOffset]: step === 1 || step === 2
    });

    // Posição do título
    const xClassTitle = classNames(Style.viewTitle, {
        [Style.titleOffset]: step === 0,
        [Style.titleInset]: step === 1 || step === 2
    });

    // Posição do username (email)
    const xClassUsername = classNames(Style.username, {
        [Style.usernameOffset]: step === 0,
        [Style.usernameInset]: step === 1 || step === 2
    });

    return (
        <div className={xClassHero} ref={headerRef}>
            {/* logo */}
            <div id={'wrapLogo'} className={xClassWrapLogo}>
                <svg
                    id="investira"
                    viewBox="0 0 165 165"
                    className={Style.logo}
                    width="100%"
                    height="100%"
                    preserveAspectRatio={'none'}>
                    <path d="M41.185,0C18.317,0,0,18.706,0,41.565V165h123.931C146.779,165,165,147.171,165,124.312V0H41.185z M68.029,125.888 C63.745,132.009,58.543,135,51.073,135H30.841l66.232-94.894c4.284-6.126,9.475-9.106,16.95-9.106h20.24L68.029,125.888z" />
                    <linearGradient id="logo-gradient" x2="1" y2="1">
                        <stop offset="0%" stopColor="#00DFA8" />
                        <stop offset="100%" stopColor="#04A899" />
                    </linearGradient>
                </svg>
            </div>
            {/* Slogan */}
            <Typography variant={'h4'} className={xClassSlogan} color={'textPrimary'} id={'slogan'}>
                {GENERIC.LOGIN.TITLE.PART1}
                <br />
                <b> {GENERIC.LOGIN.TITLE.PART2}</b>
            </Typography>
            {/* Login / Cadastro */}
            <Typography variant={'h4'} className={xClassTitle} color={'textPrimary'} id={'title'}>
                <b>{title}</b>
            </Typography>
            <Typography
                variant={'body1'}
                color={'textPrimary'}
                className={xClassCallout}
                id={'callout'}>
                <b>{GENERIC.LOGIN.PLACEHOLDER}</b>
            </Typography>

            {/* Username */}
            <Typography
                variant={'body1'}
                color={'textPrimary'}
                className={xClassUsername}
                id={'username'}>
                <b>{username}</b>
            </Typography>
        </div>
    );
});

LoginHeader.propTypes = {
    step: PropTypes.number.isRequired,
    prevLocation: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
};

LoginHeader.displayName = 'LoginHeader';

export default LoginHeader;
