import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Style from './Placeholder.module.scss';

class Placeholder extends Component {
    render() {
        const { width, height, words, lines } = this.props;
        const elems = [];

        let placeholderStyle = { display: 'inline-block' };

        if (width != null) {
            placeholderStyle.width = width;
        }

        if (height != null) {
            placeholderStyle.height = height;
        }

        if (words) {
            for (let i = 0; i < words; i++) {
                let xWidth = Math.floor(Math.random() * (80 - 20)) + 20;
                elems.push(
                    <span
                        key={i}
                        className={Style.root}
                        style={{ width: xWidth, marginRight: '4px' }}>
                        &zwnj;
                    </span>
                );
            }
        } else {
            for (let i = 0; i < lines; i++) {
                elems.push(
                    <span
                        key={i}
                        className={Style.root}
                        style={placeholderStyle}>
                        &zwnj;
                    </span>
                );
            }
        }

        return <> {elems.map((elem, i) => elem)} </>;
    }
}

Placeholder.propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    lines: PropTypes.number,
    words: PropTypes.number
};

Placeholder.defaultProps = {
    width: '100%',
    height: '0.5rem',
    circle: false,
    lines: 1,
    variant: 'p'
};

export default Placeholder;
