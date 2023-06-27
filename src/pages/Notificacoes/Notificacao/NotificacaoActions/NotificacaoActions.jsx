import React from 'react';
import { Button } from 'investira.react.components';
import PropTypes from 'prop-types';
import { NOTIFICATIONS } from '../../../../const';
function NotificacaoActions(props) {
    const notificationActions = {
        C: [
            {
                label: NOTIFICATIONS.SHARE_BUTTON_DENY,
                action: props.onBlock
            },
            {
                label: NOTIFICATIONS.SHARE_BUTTON_ACCEPT,
                action: props.onAccept
            }
        ],
        A: []
    };

    const xNotificationActions = notificationActions[props.data.tipo];

    return (
        <div>
            {xNotificationActions.map((pActions, pIndex) => {
                return (
                    <Button
                        size={'small'}
                        key={pIndex}
                        color={'primary'}
                        onClick={pEvent => pActions.action && pActions.action(props.data, pEvent)}>
                        {pActions.label}
                    </Button>
                );
            })}
        </div>
    );
}

NotificacaoActions.propTypes = {
    data: PropTypes.object
};

export default NotificacaoActions;
