import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Drawer,
    Typography,
    IconButton,
    Icon,
    CenterInView,
    NavBar,
    Box,
    Success
} from 'investira.react.components';
import { GENERIC } from '../../const';
import { MainTemplate } from '../../components/templates';

import Style from './LoginCadastroMessage.module.scss';

const LoginCadastroMessage = memo(props => {
    const [startAnimation, setStartAnimation] = useState(false);

    function drawerOnAnimationEnd() {
        const ANIMATION_TIMEOUT = 50;

        setTimeout(() => {
            if (startAnimation === false) {
                setStartAnimation(true);
            }
        }, ANIMATION_TIMEOUT);
    }

    return (
        <Drawer onAnimationEnd={drawerOnAnimationEnd()} anchor={props.anchor} open={props.open}>
            <Box sx={{ width: '100vw', height: '100vh' }}>
                <MainTemplate>
                    <NavBar
                        right={
                            <IconButton color={'primary'} onClick={() => props.onClose()}>
                                <Icon size={21} iconName={'cancel'} />
                            </IconButton>
                        }
                    />
                    <div className={Style.body}>
                        <CenterInView>
                            <div className={Style.circle}>
                                <Success startAnimation={true} width={155} height={155} />
                            </div>
                            <Typography
                                gutterBottom
                                variant={'h5'}
                                color={'primary'}
                                align={'center'}>
                                {GENERIC.CADASTRO.SUCCESS}
                                <br /> {GENERIC.GENERIC.SUCCESS}
                            </Typography>

                            <Typography variant={'body2'} align={'center'} color={'textPrimary'}>
                                {GENERIC.CADASTRO.CONFIRM}
                            </Typography>

                            <Typography variant={'body1'} align={'center'} gutterBottom>
                                <span className={Style.highlight}>{props.username}</span>
                            </Typography>
                        </CenterInView>
                    </div>
                </MainTemplate>
            </Box>
        </Drawer>
    );
});

LoginCadastroMessage.propTypes = {
    anchor: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    username: PropTypes.string
};

LoginCadastroMessage.defaultProps = {
    anchor: 'right',
    open: false,
    username: ''
};

LoginCadastroMessage.displayName = 'LoginCadastroMessage';

export default LoginCadastroMessage;
