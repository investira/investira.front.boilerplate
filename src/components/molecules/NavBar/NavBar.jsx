import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Typography } from 'investira.react.components';

import Style from './NavBar.module.scss';

function NavBar(props) {
    const xClass = classNames(Style.root, {
        [Style.dense]: props.variant === 'dense',
        [Style.regular]: props.variant === 'regular',
        [Style.large]: props.variant === 'large',
        [Style.gutters]: props.gutters
    });

    const xClassToolbar = classNames(Style.toolbar, {
        [Style.toolbarTitleAndRight]: !props.left && !props.center && props.title && props.right,
        [Style.toolbarRightOnly]: !props.left && !props.center && !props.title,
        [Style.toolbarCenterOnly]: !props.left && !props.right,
        [Style.toolbarLeft]: props.left && props.center && !props.right,
        [Style.toolbarLeft]: props.left && props.title && !props.right
    });

    const xClassCentertArea = classNames(Style.centerArea, Style.centerGutters, {
        [Style.centerDense]: props.variant === 'dense',
        [Style.centerRegular]: props.variant === 'regular',
        [Style.centerLarge]: props.variant === 'large'
    });

    //TODO: Remover ao terminar a "migração"
    const xClassTitleArea = classNames(Style.titleArea, {
        [Style.titleDense]: props.variant === 'dense',
        [Style.titleRegular]: props.variant === 'regular',
        [Style.titleLarge]: props.variant === 'large'
    });

    const xClassLeft = classNames(Style.leftArea, {
        [Style.leftAreaDense]: props.variant === 'dense',
        [Style.leftAreaRegular]: props.variant === 'regular',
        [Style.leftAreaLarge]: props.variant === 'large'
    });

    const xClassRight = classNames(Style.rightArea, {
        [Style.rightAreaDense]: props.variant === 'dense',
        [Style.rightAreaRegular]: props.variant === 'regular',
        [Style.rightAreaLarge]: props.variant === 'large'
    });

    return (
        <>
            <div className={xClass}>
                <div className={xClassToolbar}>
                    {props.left && <div className={xClassLeft}>{props.left}</div>}

                    {props.center && <div className={xClassCentertArea}>{props.center}</div>}

                    {/* TODO: Remover ao terminar a "migração" */}
                    {props.title && !props.center && (
                        <div className={xClassTitleArea}>
                            <Typography variant={'h6'} color={'textPrimary'}>
                                {props.title}
                            </Typography>
                        </div>
                    )}

                    {props.right && <div className={xClassRight}>{props.right}</div>}
                </div>
            </div>
            {/* <div className={xClassToolbar}>
                    {props.variant === 'modal'  || props.type === 'modal' ? (
                        <>
                            {props.iconName && (
                                <div className={Style.iconArea}>
                                    <Icon
                                        size={21}
                                        iconName={props.iconName}
                                    />
                                </div>
                            )}

                            <div className={Style.titleAreaModal}>
                                <Typography variant={"h6"} color={"textPrimary"}>
                                    {props.title}
                                </Typography>
                            </div>

                            <div className={Style.buttonArea}>
                                <IconButton
                                    color={"primary"}
                                    onClick={() => props.onClose()}>
                                    <Icon size={21} iconName={"cancel"} />
                                </IconButton>
                            </div>
                        </>
                    ) : props.variant === 'contentLeft' ? (
                        <>
                            <div className={Style.leftContentArea}>
                                {props.left}
                            </div>
                            <div className={Style.buttonArea}>
                                {props.right}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={Style.buttonArea}>
                                {props.left}
                            </div>

                            <div className={Style.titleArea}>
                                <Typography variant={"h6"} color={"textPrimary"}>
                                    {props.title}
                                </Typography>
                            </div>

                            <div className={Style.buttonArea}>
                                {props.right}
                            </div>
                        </>
                    )}
                </div> */}
        </>
    );
}

NavBar.propTypes = {
    type: PropTypes.string,
    iconName: PropTypes.string,
    title: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['dense', 'regular', 'large'])
};

NavBar.defaultProps = {
    variant: 'dense'
};

export default NavBar;
