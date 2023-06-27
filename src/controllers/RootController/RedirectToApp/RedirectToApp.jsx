import React, { useRef } from 'react';
import { browsers } from 'investira.react.lib';
import { Button, Typography, CenterInView } from 'investira.react.components';
import { GENERIC } from '../../../const';
import Style from './RedirectToApp.module.scss';

function RedirectToApp(props) {
    const timeout = useRef(null);
    const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;

    const redirect = () => {
        window.location.replace(`investiravc://${CLIENT_URL}`);

        if (browsers.isAndroid()) {
            timeout.current = setTimeout(() => {
                window.location.href = 'market://details?id=br.com.investira';
            }, 100);
        }
    };

    return (
        <div className={Style.root}>
            <CenterInView>
                <div className={Style.content}>
                    <div className={Style.logo}>
                        <svg
                            id="investira"
                            viewBox="0 0 165 165"
                            fill={'url(#icon-gradient)'}
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
                    <Typography variant={'body1'} color={'textPrimary'} gutterBottom>
                        {GENERIC.REDIRECT_APP.DESCRIPTION} <b>Investira.vc</b>!
                    </Typography>
                    {browsers.isAndroid() && (
                        <Button
                            color="primary"
                            target="_blank"
                            //href="investiravc://app.investira.vc"
                            onClick={() => redirect()}
                            variant="outlined">
                            {GENERIC.REDIRECT_APP.BUTTON}
                        </Button>
                    )}
                </div>
            </CenterInView>
        </div>
    );
}

RedirectToApp.displayName = 'RedirectToApp';

export default RedirectToApp;
