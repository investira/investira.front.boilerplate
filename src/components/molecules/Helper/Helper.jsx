import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Icon, Typography } from 'investira.react.components';
import { InfoDialog } from '../';
import { JsonTextFormated } from '../../atoms';

import Style from './Helper.module.scss';

const Helper = memo(props => {
    const { label, desc } = props;
    return (
        <div className={Style.root}>
            <InfoDialog
                label={label}
                color={'textSecondary'}
                iconColor={'primary'}
                dialogProps={{
                    title: {
                        label: <Icon iconName={props.iconName} color={'primary'} size={18} />,
                        onclose: true
                    },
                    content: (
                        <>
                            <Typography variant={'h6'} color={'textPrimary'} gutterBottom>
                                {label}
                            </Typography>
                            <JsonTextFormated
                                variant={'body2'}
                                color={'textSecondary'}
                                component={'p'}
                                gutterBottom
                                text={desc}
                            />
                        </>
                    )
                }}
            />
        </div>
    );
});

Helper.propTypes = {
    iconName: PropTypes.string
};

Helper.defautProps = {
    iconName: 'openbanking'
};

Helper.displayName = 'Helper';

export default Helper;
