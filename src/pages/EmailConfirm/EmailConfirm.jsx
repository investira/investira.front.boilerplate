import React, { memo, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { browsers } from 'investira.react.lib';
import { strings } from 'investira.sdk';
import services from '../../services';
import { Typography, Button, Success, CenterInView, Loading } from 'investira.react.components';
import { GENERIC } from '../../const';
import Style from './EmailConfirm.module.scss';

const EmailConfirm = memo(props => {
    const animationTimeout = useRef(null);

    // States
    const [validate, setValidate] = useState();
    const [error, setError] = useState(false);
    const [startAnimation, setStartAnimation] = useState(false);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');

    // Methods
    function drawerOnAnimationEnd() {
        const ANIMATION_TIMEOUT = 50;

        animationTimeout.current = setTimeout(() => {
            if (startAnimation === false) {
                setStartAnimation(true);
            }
        }, ANIMATION_TIMEOUT);
    }

    function updateName(pName) {
        const xName = strings.splitFullName(pName);
        setName(xName.first);
    }

    function doCodeValidate() {
        browsers.isOnline()
            ? services.auth.registerConfirm(
                  {
                      code: props.match.params.code
                  },
                  rRes => {
                      if (rRes.status !== 200) {
                          setValidate(false);
                      } else {
                          setUsername(rRes.data.username);
                          updateName(rRes.data.name);
                          setValidate(true);
                      }
                  },
                  () => {
                      setValidate(null);
                  }
              )
            : setError(true);
    }

    // Effects

    useEffect(() => {
        doCodeValidate();
        drawerOnAnimationEnd();

        return () => {
            clearTimeout(animationTimeout.current);
        };
    }, []);

    // Render

    if (error) {
        return (
            <CenterInView>
                <Typography gutterBottom variant={'body1'} color={'textPrimary'} align={'center'}>
                    {GENERIC.WELCOME.NO_CONNEXION}
                </Typography>
            </CenterInView>
        );
    }

    return (
        <div className={Style.root}>
            <div className={Style.body}>
                {validate === true ? (
                    <>
                        <CenterInView>
                            <Success
                                arcStroke="#00dfa8"
                                iconStroke="#00dfa8"
                                startAnimation={true}
                                width={200}
                                height={200}
                            />
                            <div className={Style.confirmText}>
                                <Typography
                                    gutterBottom
                                    variant={'h5'}
                                    color={'primary'}
                                    align={'center'}>
                                    {name}, <br /> {GENERIC.WELCOME.WELCOME}
                                </Typography>
                            </div>

                            <Typography variant={'body2'} align={'center'} color={'textPrimary'}>
                                {GENERIC.WELCOME.CONFIRM.EMAIL_CONFIRM}
                            </Typography>
                        </CenterInView>
                    </>
                ) : validate === false ? (
                    <>
                        <CenterInView>
                            <div className={Style.circle}>
                                <svg
                                    id="Layer_1"
                                    x="0px"
                                    y="0px"
                                    width="200px"
                                    height="200px"
                                    viewBox="0 0 250 250"
                                    className={startAnimation ? Style.start : ''}>
                                    <g>
                                        <path
                                            fill="none"
                                            stroke="#00DFA8"
                                            strokeWidth="6"
                                            strokeMiterlimit="10"
                                            d="M2.706000000000003,126.688A119.5,119.5 0,1,1 241.70600000000002,126.688A119.5,119.5 0,1,1 2.706000000000003,126.688"
                                            className={Style.hfwBdvMn_0}
                                        />
                                        <path
                                            fill="none"
                                            stroke="#00DFA8"
                                            strokeWidth="6"
                                            strokeLinecap="round"
                                            strokeMiterlimit="10"
                                            d="M183.02,183.002c-28.293-38.693-94.293-39.895-121.626,0"
                                            className={Style.hfwBdvMn_1}
                                        />
                                        <g>
                                            <path
                                                fill="none"
                                                stroke="#00DFA8"
                                                strokeWidth="6"
                                                strokeLinecap="round"
                                                strokeMiterlimit="10"
                                                d="M197.913,98.555c-4.049,34.628-49.409,35.637-53.456,0.712"
                                                className={Style.hfwBdvMn_2}
                                            />
                                            <path
                                                fill="none"
                                                stroke="#00DFA8"
                                                strokeWidth="6"
                                                strokeLinecap="round"
                                                strokeMiterlimit="10"
                                                d="M99.955,98.555c-4.049,34.628-49.408,35.637-53.456,0.712"
                                                className={Style.hfwBdvMn_3}
                                            />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <Typography
                                variant={'body1'}
                                align={'center'}
                                color={'textPrimary'}
                                gutterBottom>
                                <b>{GENERIC.WELCOME.CONFIRM.EMAIL_CONFIRM_FAIL}</b>
                            </Typography>
                            <Typography variant={'body1'} align={'center'} color={'textPrimary'}>
                                {GENERIC.WELCOME.NEW_SIGNUP}
                            </Typography>
                        </CenterInView>
                        <Button
                            variant={'contained'}
                            color={'primary'}
                            className={Style.button}
                            component={Link}
                            to="/login">
                            {GENERIC.WELCOME.BUTTONS.SIGNUP}
                        </Button>
                    </>
                ) : validate === null ? (
                    <>
                        <CenterInView>
                            <Typography
                                variant={'body1'}
                                align={'center'}
                                color={'textPrimary'}
                                gutterBottom>
                                <b>{GENERIC.WELCOME.ERROR}</b>
                            </Typography>
                        </CenterInView>
                        <Button
                            onClick={() => {
                                doCodeValidate();
                            }}
                            variant="contained"
                            color="primary"
                            className={Style.button}>
                            {GENERIC.WELCOME.BUTTONS.RETRY}
                        </Button>
                    </>
                ) : (
                    <CenterInView>
                        <Loading />
                    </CenterInView>
                )}
            </div>
        </div>
    );
});

EmailConfirm.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

EmailConfirm.defaultProps = {};

EmailConfirm.displayName = 'EmailConfirm';

export default EmailConfirm;
