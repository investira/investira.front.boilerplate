import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { DialogContentText, Box } from 'investira.react.components';
import { InfoDialog } from '../';

const InfoDialogFluxo = memo(props => {
    return (
        <Box
            id={'info-fluxo-caixa'}
            sx={{
                padding: '0 16px',
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '12px'
            }}>
            <InfoDialog
                label={props.label}
                color={'textSecondary'}
                iconColor={'primary'}
                dialogProps={{
                    title: {
                        label: props.label,
                        onclose: true
                    },
                    content: (
                        <DialogContentText variant={'body2'}>{props.content}</DialogContentText>
                    )
                }}
            />
        </Box>
    );
});

InfoDialogFluxo.propTypes = {
    label: PropTypes.string,
    content: PropTypes.string
};

InfoDialogFluxo.defaultProps = {
    label: 'Fluxo de caixa',
    content: ''
};

InfoDialogFluxo.displayName = 'InfoDialogFluxo';

export default InfoDialogFluxo;
