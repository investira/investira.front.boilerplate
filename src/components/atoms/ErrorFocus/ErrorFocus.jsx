import { memo, useEffect } from 'react';
import PropTypes from 'prop-types';

const ErrorFocus = memo(({ children, errors, isSubmitting, isValidating }) => {
    useEffect(() => {
        const xErrorKeys = Object.keys(errors);

        if (xErrorKeys.length > 0 && isSubmitting && !isValidating) {
            const xSelectorId = `[id="${xErrorKeys[0]}"]`;
            const xSelectorName = `[name="${xErrorKeys[0]}"]`;

            const xErrorFormElement =
                document.querySelector(xSelectorName) || document.querySelector(xSelectorId);

            xErrorFormElement.scrollIntoView(false);
            xErrorFormElement.focus();
        }
    }, [errors, isSubmitting, isValidating]);

    return children;
});

ErrorFocus.propTypes = {
    children: PropTypes.node.isRequired,
    errors: PropTypes.object.isRequired, // Formik
    isSubmitting: PropTypes.bool.isRequired, // Formik
    isValidating: PropTypes.bool.isRequired // Formik
};

ErrorFocus.defaultProps = {
    errors: {},
    isSubmitting: false,
    isValidating: false
};

ErrorFocus.displayName = 'ErrorFocus';

export default ErrorFocus;
