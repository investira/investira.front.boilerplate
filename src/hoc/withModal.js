import React, { useState, useRef, useEffect } from 'react';

import { validators } from 'investira.sdk';
import { DrawerTemplate } from '../components/templates';
import { Drawer } from 'investira.react.components';

const withModal = (Component, pDrawerProps = {}) => {
    function WrapComponent(props) {
        const [open, setOpen] = useState(false);
        const contentComponent = useRef(() => null);
        const contentProps = useRef({});
        const closeCallback = useRef(null);

        function setContentRefs(pContentComponent, pContentProps) {
            contentComponent.current = pContentComponent;
            contentProps.current = pContentProps;
        }

        function setCloseCallback(pFunc) {
            closeCallback.current = pFunc;
        }

        function handleOpenModal(pContent, pContentProps) {
            setContentRefs(pContent, pContentProps);
            setOpen(true);
        }

        function handleCloseModal(pCallback) {
            pCallback && setCloseCallback(pCallback);
            setOpen(false);
        }

        const xProps = {
            ...props,
            onOpenModal: handleOpenModal,
            onCloseModal: handleCloseModal
        };

        const Content = contentComponent.current;

        const xContentProps = {
            ...contentProps.current,
            onOpen: handleOpenModal,
            onClose: handleCloseModal
        };

        useEffect(() => {
            if (!open && !validators.isNull(closeCallback.current)) {
                setTimeout(() => {
                    validators.isFunction(closeCallback.current) && closeCallback.current();
                    setCloseCallback(null);
                }, 200);
            }
        }, [open, closeCallback]);

        return (
            <>
                <Component {...xProps} />
                <Drawer anchor={'bottom'} open={open} {...pDrawerProps} onClose={handleCloseModal}>
                    <Content {...xContentProps} />
                </Drawer>
            </>
        );
    }

    return WrapComponent;
};

export default withModal;
