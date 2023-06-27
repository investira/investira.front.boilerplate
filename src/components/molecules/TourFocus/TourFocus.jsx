import React, { memo, useEffect, useState } from 'react';
import { validators } from 'investira.sdk';
import { Typography } from 'investira.react.components';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Style from './TourFocus.module.scss';

const TourFocus = memo(props => {
    const borderSize = 20000;

    const pixely = pValue => `${pValue}px`;

    const focusOuter = {
        top: '0', // movimenta para cima e para baixo
        left: '0', // movimenta para a direita e para a esquerda
        width: '48px', // area
        height: '48px', // area
        marginTop: '0',
        marginLeft: '0',
        position: 'fixed',
        zIndex: '9999',
        boxSizing: 'content-box',
        pointerEvents: 'none',
        transition: 'all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)'
    };

    const focusInner = {
        width: '48px', // area
        height: '48px', // area
        position: 'absolute',
        border: `${pixely(borderSize)} solid rgb(0, 0, 0, 0.9)`,
        marginTop: `${pixely(borderSize * -1)}`,
        marginLeft: `${pixely(borderSize * -1)}`,
        borderTopLeftRadius: '50%',
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
        borderBottomLeftRadius: '50%',
        boxSizing: 'content-box',
        transition: 'all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)'
    };

    const [outer, setOuter] = useState(focusOuter);
    const [inner, setInner] = useState(focusInner);
    const [isActive, setIsActive] = useState(props.isActive || false);

    const getElementRect = pElemFocusId => {
        if (validators.isNull(pElemFocusId)) {
            console.warn('TourFocus: Nenhum ID definido');
            return false;
        }
        const xNode = document.getElementById(pElemFocusId);

        return xNode ? xNode.getClientRects()[0] : {};
    };

    const setFocusPosition = pElemFocusId => {
        const { width, height, left, top } = getElementRect(pElemFocusId);

        const radius = (pHeight, pBorderSize) => {
            const xBorder = pixely(pBorderSize + pHeight / 2);
            return {
                borderTopLeftRadius: xBorder,
                borderTopRightRadius: xBorder,
                borderBottomRightRadius: xBorder,
                borderBottomLeftRadius: xBorder
            };
        };

        const xFocusOuter = {
            ...outer,
            top: pixely(top),
            left: pixely(left),
            width: pixely(width),
            height: pixely(height)
        };

        const xFocusInner = {
            ...inner,
            width: pixely(width),
            height: pixely(height),
            ...radius(height, borderSize)
        };

        setOuter(xFocusOuter);
        setInner(xFocusInner);
    };

    const xClass = classNames(Style.outer, {
        [Style.isActive]: isActive
    });

    useEffect(() => {
        setFocusPosition(props.elemFocusId);
    }, [props.elemFocusId]);

    useEffect(() => {
        setIsActive(props.isActive);
    }, [props.isActive]);

    if (props.disabled) {
        return props.children;
    }

    return (
        <>
            {props.children}
            <div style={outer} className={xClass}>
                <div style={inner}></div>
                {props.message && (
                    <div className={Style.message}>
                        <Typography variant={'caption'} color={'textPrimary'}>
                            {props.message}
                        </Typography>
                    </div>
                )}
            </div>
        </>
    );
});

TourFocus.propTypes = {
    elemFocusId: PropTypes.string,
    disabled: PropTypes.bool,
    show: PropTypes.bool
};

TourFocus.displayName = 'TourFocus';

export default TourFocus;
