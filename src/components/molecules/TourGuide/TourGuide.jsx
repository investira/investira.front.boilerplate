import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon, withDialog } from 'investira.react.components';
import ContentNavigator from './ContentNavigator';
import Style from './TourGuide.module.scss';

function TourGuide(props) {
    const handleFinish = () => {
        props.onFinish && props.onFinish();
    };

    const handleOpen = () => {
        props.onOpenDialog({
            title: {
                label: props.title || 'Title'
            },
            ...(props.content && {
                content: <ContentNavigator content={props.content} onFinish={handleFinish} />
            }),
            ...(props.actions && { actions: props.actions })
        });
    };

    const rootProps = {
        className: Style.root,
        ...(props.overHint && { onClick: handleOpen })
    };

    const btnHintClass = classNames(Style.btnHint, {
        [Style.btnHighlight]: props.hintHighlight
    });

    return (
        <div {...rootProps}>
            {props.hint && (
                <button
                    type="button"
                    className={btnHintClass}
                    style={props.hint.position}
                    onClick={handleOpen}>
                    <Icon
                        iconName={props.hint.icon || 'information'}
                        color={'textSecondary'}
                        size={21}
                        className={Style.icon}
                    />
                </button>
            )}
            {props.children}
        </div>
    );
}

TourGuide.propTypes = {
    dialogProps: PropTypes.shape({
        title: PropTypes.shape({
            label: PropTypes.string,
            onclose: PropTypes.bool
        }),
        content: PropTypes.node,
        actions: PropTypes.array
    }),
    hint: PropTypes.shape({ icon: PropTypes.string, position: PropTypes.object }),
    content: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            description: PropTypes.string
        })
    ),
    overHint: PropTypes.bool
};

TourGuide.displayName = 'TourGuide';

export default withDialog(TourGuide);
