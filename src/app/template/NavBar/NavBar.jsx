import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Typography } from 'investiraComponents';

import Style from './NavBar.module.scss';

class NavBar extends PureComponent {
    render() {
        const xClass = classNames(Style.root, {
            [Style.dense]: this.props.variant === 'dense',
            [Style.regular]: this.props.variant === 'regular',
            [Style.large]: this.props.variant === 'large',
            [Style.gutters]: this.props.gutters
        });

        const xClassToolbar = classNames(Style.toolbar, {
            [Style.toolbarTitleAndRight]:
                !this.props.left && !this.props.center && this.props.title && this.props.right,
            [Style.toolbarRightOnly]: !this.props.left && !this.props.center && !this.props.title,
            [Style.toolbarCenterOnly]: !this.props.left && !this.props.right,
            [Style.toolbarLeft]: this.props.left && this.props.center && !this.props.right,
            [Style.toolbarLeft]: this.props.left && this.props.title && !this.props.right
        });

        const xClassCentertArea = classNames(Style.centerArea, Style.centerGutters, {
            [Style.centerDense]: this.props.variant === 'dense',
            [Style.centerRegular]: this.props.variant === 'regular',
            [Style.centerLarge]: this.props.variant === 'large'
        });

        //TODO: Remover ao terminar a "migração"
        const xClassTitleArea = classNames(Style.titleArea, {
            [Style.titleDense]: this.props.variant === 'dense',
            [Style.titleRegular]: this.props.variant === 'regular',
            [Style.titleLarge]: this.props.variant === 'large'
        });

        const xClassLeft = classNames(Style.leftArea, {
            [Style.leftAreaDense]: this.props.variant === 'dense',
            [Style.leftAreaRegular]: this.props.variant === 'regular',
            [Style.leftAreaLarge]: this.props.variant === 'large'
        });

        const xClassRight = classNames(Style.rightArea, {
            [Style.rightAreaDense]: this.props.variant === 'dense',
            [Style.rightAreaRegular]: this.props.variant === 'regular',
            [Style.rightAreaLarge]: this.props.variant === 'large'
        });

        return (
            <>
                <div className={xClass}>
                    <div className={xClassToolbar}>
                        {this.props.left && <div className={xClassLeft}>{this.props.left}</div>}

                        {this.props.center && <div className={xClassCentertArea}>{this.props.center}</div>}

                        {/* TODO: Remover ao terminar a "migração" */}
                        {this.props.title && !this.props.center && (
                            <div className={xClassTitleArea}>
                                <Typography variant={'h6'} color={'textPrimary'}>
                                    {this.props.title}
                                </Typography>
                            </div>
                        )}

                        {this.props.right && <div className={xClassRight}>{this.props.right}</div>}
                    </div>
                </div>
                {/* <div className={xClassToolbar}>
                    {this.props.variant === 'modal'  || this.props.type === 'modal' ? (
                        <>
                            {this.props.iconName && (
                                <div className={Style.iconArea}>
                                    <Icon
                                        size="21"
                                        iconName={this.props.iconName}
                                    />
                                </div>
                            )}

                            <div className={Style.titleAreaModal}>
                                <Typography variant="h6" color="textPrimary">
                                    {this.props.title}
                                </Typography>
                            </div>

                            <div className={Style.buttonArea}>
                                <IconButton
                                    color="primary"
                                    onClick={() => this.props.onClose()}>
                                    <Icon size="21" iconName="cancel" />
                                </IconButton>
                            </div>
                        </>
                    ) : this.props.variant === 'contentLeft' ? (
                        <>
                            <div className={Style.leftContentArea}>
                                {this.props.left}
                            </div>
                            <div className={Style.buttonArea}>
                                {this.props.right}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={Style.buttonArea}>
                                {this.props.left}
                            </div>

                            <div className={Style.titleArea}>
                                <Typography variant="h6" color="textPrimary">
                                    {this.props.title}
                                </Typography>
                            </div>

                            <div className={Style.buttonArea}>
                                {this.props.right}
                            </div>
                        </>
                    )}
                </div> */}
            </>
        );
    }
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
