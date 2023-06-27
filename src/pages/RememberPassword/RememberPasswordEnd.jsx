import React, { memo, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    Drawer,
    AppBar,
    Button,
    Toolbar,
    Typography,
    IconButton,
    Icon,
    CenterInView
} from 'investira.react.components';
import { GENERIC } from '../../const';

import Style from './RememberPasswordEnd.module.scss';

const RememberPasswordEnd = memo(props => {
    // Constants
    const animationTimeout = useRef(null);

    // States
    const [width, setWidth] = React.useState(0);
    const [height, setHeight] = React.useState(0);
    const [startAnimation, setStartAnimation] = React.useState(false);

    // Methods
    const updateWinArea = useCallback(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }, []);

    function drawerOnAnimationEnd() {
        const ANIMATION_TIMEOUT = 50;

        animationTimeout.current = setTimeout(() => {
            if (startAnimation === false) {
                setStartAnimation(true);
            }
        }, ANIMATION_TIMEOUT);
    }

    // Effects
    useEffect(() => {
        updateWinArea();
        window.addEventListener('resize', updateWinArea);

        return () => {
            window.removeEventListener('resize', updateWinArea);
            clearTimeout(animationTimeout.current);
        };
    }, []);

    // Render
    return (
        <Drawer onAnimationEnd={drawerOnAnimationEnd()} {...props}>
            <div
                className={Style.root}
                style={{
                    width: width,
                    height: height
                }}>
                <div className={Style.head}>
                    <AppBar>
                        <Toolbar>
                            <div className={Style.toolbar} />
                            <IconButton color={'primary'} onClick={props.onClose}>
                                <Icon size={21} iconName={'cancel'} />
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
                                className={startAnimation ? Style.start : false}>
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
                        <Typography gutterBottom variant={'h5'} color={'primary'} align={'center'}>
                            {GENERIC.REMEMBER_PASSWORD.SUCCESS} <br /> {GENERIC.GENERIC.SUCCESS}
                        </Typography>
                    </CenterInView>
                    <Button
                        variant={'outlined'}
                        color={'primary'}
                        size={'small'}
                        className={Style.button}
                        onClick={props.onClose}>
                        {GENERIC.REMEMBER_PASSWORD.LOGIN}
                    </Button>
                </div>
            </div>
        </Drawer>
    );
});

RememberPasswordEnd.propTypes = {
    onClose: PropTypes.func.isRequired
};

RememberPasswordEnd.defaultProps = {};

RememberPasswordEnd.displayName = 'RememberPasswordEnd';

export default RememberPasswordEnd;
