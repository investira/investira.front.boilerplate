import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { formats } from 'investira.sdk';
import { Rate } from '../';
import { Typography } from 'investiraComponents';

class Format extends PureComponent {
    formatValue = (pType, pValue, pDecimais) => {
        const xValue = {
            currency:
                typeof pValue === 'string'
                    ? pValue
                    : formats.friendlyNumber(pValue, pDecimais || 2, true),
            number:
                typeof pValue === 'string'
                    ? pValue
                    : formats.formatNumber(pValue, pDecimais || 0, true, false),
            date:
                typeof pValue === 'string'
                    ? pValue
                    : formats.formatDate(pValue),
            hour:
                typeof pValue === 'string'
                    ? pValue
                    : formats.formatDateCustom(pValue, 'HH:mm'),
            rate: (
                <Rate
                    value={pValue}
                    status={this.props.status}
                    size={this.props.size}
                />
            ),
            text: pValue,
            percentual: `${pValue}%`
        };

        return xValue[pType];
    };

    render() {
        return (
            <Typography
                variant={this.props.variant}
                color={this.props.color}
                align={this.props.align}>
                {this.formatValue(
                    this.props.format,
                    this.props.value,
                    this.props.decimais
                )}
            </Typography>
        );
    }
}

Format.propTypes = {
    format: PropTypes.oneOf([
        'currency',
        'number',
        'percentual',
        'rate',
        'date',
        'hour',
        'text'
    ]),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object
    ]),
    size: PropTypes.string,
    variant: PropTypes.string,
    color: PropTypes.string,
    status: PropTypes.oneOf([0, 1, 2])
};

Format.defaultProps = {
    format: 'text',
    value: 0,
    color: 'textPrimary',
    size: 'caption',
    variant: 'caption',
    status: 1
};

export default Format;
