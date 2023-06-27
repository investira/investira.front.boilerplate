import React from 'react';
import Style from './Loading.module.scss';
import { CircularProgress } from 'investira.react.components';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Loading(props) {
    const xClass = classNames(Style.root, {
        [Style.center]: props.align === 'center',
        [Style.top]: !props.align === 'top'
    });

    return (
        <div className={xClass}>
            <div className={Style.wrap}>
                <CircularProgress size={props.size} />
            </div>
        </div>
    );
}

Loading.propTypes = {
    align: PropTypes.oneOf(['top', 'center']),
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

Loading.defaultProps = {
    align: 'center',
    size: 40
};

export default Loading;
