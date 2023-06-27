import React from 'react';
import { Avatar, Typography, Badge, Icon } from 'investira.react.components';
import { validators } from 'investira.sdk';
import { displays } from 'investira.react.lib';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Style from './User.module.scss';

function User(props) {
    const hasname_last = props.data.name_last ? props.data.name_last : '';
    const name = {
        full: props.data.name,
        abbr: `${props.data.name_first} 
            ${hasname_last}`,
        compacto: `${props.data.name_first} 
                        ${hasname_last}`
    };

    const full = props.variacao === 'full';
    const compacto = props.variacao === 'compacto';
    const abbr = props.variacao === 'abbr';

    const xClass = classNames(Style.root, props.className, {
        [Style.full]: full,
        [Style.compacto]: compacto,
        [Style.abbr]: abbr
    });

    const xClassText = classNames({
        [Style.fullText]: full,
        [Style.compactoText]: compacto,
        [Style.abbrText]: abbr
    });

    const { bold, ...typographyPropsRest } = props.typographyProps;

    return (
        <div onClick={props.onClick} className={xClass}>
            <div className={Style.avatarArea}>
                {props.avatarProps && props.avatarProps.badge ? (
                    <Badge
                        overlap={'circular'}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                        }}
                        badgeContent={
                            <Icon color={'primary'} size={16} iconName={props.avatarProps.badge} />
                        }>
                        {!validators.isNull(props.data.photo) ? (
                            <Avatar
                                className={Style.avatarAbbr}
                                {...props.avatarProps}
                                {...props.childProps}
                                src={props.data.photo}
                            />
                        ) : (
                            <Avatar
                                className={Style.avatarAbbr}
                                {...props.avatarProps}
                                {...props.childProps}>
                                {displays.initialsLetters(
                                    !validators.isNull(props.data.name)
                                        ? props.data.name
                                        : props.data.username
                                )}
                            </Avatar>
                        )}
                    </Badge>
                ) : (
                    <Avatar
                        className={Style.avatarAbbr}
                        {...props.avatarProps}
                        {...props.childProps}>
                        {displays.initialsLetters(
                            !validators.isNull(props.data.name)
                                ? props.data.name
                                : props.data.username
                        )}
                    </Avatar>
                )}
            </div>
            {full ? (
                <div>
                    {!validators.isNull(name) && (
                        <div className={xClassText}>
                            <Typography {...typographyPropsRest} {...props.childProps}>
                                {bold ? (
                                    <strong>{name[props.variacao]}</strong>
                                ) : (
                                    name[props.variacao]
                                )}
                            </Typography>
                        </div>
                    )}
                    {!compacto && props.data.username && (
                        <div className={Style.email}>
                            <Typography
                                {...props.typographyEmailProps}
                                {...props.childProps}
                                className={xClassText}>
                                {props.data.username}
                            </Typography>
                        </div>
                    )}
                </div>
            ) : (
                <div className={xClassText}>
                    <Typography {...typographyPropsRest} {...props.childProps}>
                        {bold ? <strong>{name[props.variacao]}</strong> : name[props.variacao]}
                    </Typography>
                </div>
            )}
        </div>
    );
}

User.propTypes = {
    typographyProps: PropTypes.object,
    avatarProps: PropTypes.object,
    variacao: PropTypes.string,
    data: PropTypes.object
};

User.displayName = 'User';

export default User;
