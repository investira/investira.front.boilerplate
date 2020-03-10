import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Style from './Success.module.scss';
class Success extends PureComponent {
    render() {
        return (
            <div className={Style.root}>
                <div
                    className={Style.circle}
                    style={{
                        width: this.props.width ? `${this.props.width}px` : null,
                        height: this.props.height ? `${this.props.height}px` : null
                    }}>
                    <svg
                        id="Layer_1"
                        x="0px"
                        y="0px"
                        width={this.props.width ? `${this.props.width}px` : null}
                        height={this.props.height ? `${this.props.height}px` : null}
                        viewBox="0 0 200 200"
                        className={this.props.startAnimation ? Style.start : undefined}>
                        <path
                            fill="none"
                            stroke="#00DFA8"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            d="M7.688000000000002,99.625A93,93 0,1,1 193.688,99.625A93,93 0,1,1 7.688000000000002,99.625"
                            className={Style.ok}
                        />
                        <path
                            fill="none"
                            stroke="#47E0A8"
                            strokeWidth="7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            d="M47.562,98.375L83.562,134.625L153.812,64.625"
                            className={Style.circle}
                        />
                    </svg>
                </div>
            </div>
        );
    }
}

Success.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    startAnimation: PropTypes.bool
};

export default Success;
