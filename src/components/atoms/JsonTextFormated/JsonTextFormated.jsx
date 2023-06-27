import React from 'react';
import { Typography } from 'investira.react.components';
import PropTypes from 'prop-types';

const JsonTextFormated = props => {
    const { text, ...otherProps } = props;

    const createMarkup = pTextFragment => {
        return { __html: pTextFragment };
    };

    return text.split('\n').map((fragment, key) => (
        <Typography key={key} {...otherProps}>
            <span dangerouslySetInnerHTML={createMarkup(fragment)} />
        </Typography>
    ));
};

JsonTextFormated.propTypes = {
    text: PropTypes.string.isRequired
};

JsonTextFormated.defaultProps = {
    text: ''
};

JsonTextFormated.displayName = 'JsonTextFormated';

export default JsonTextFormated;
