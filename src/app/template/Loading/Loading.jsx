import React, { Component } from 'react';
import Style from './Loading.module.scss';
import { CircularProgress } from 'investiraComponents';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class Loading extends Component {
    render() {
        const xClass = classNames(Style.root, {
            [Style.center]: this.props.align === 'center',
            [Style.top]: !this.props.align === 'top'
        });

        return (
            <div className={xClass}>
                <div className={Style.warp}>
                    <CircularProgress size={this.props.size} />
                </div>
            </div>
        );
    }
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
