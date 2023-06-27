import React, { Component } from 'react';
import ErrorDataView from '../ErrorDataView';
import ErrorBody from '../ErrorBody';
import { ERRORS } from '../../../const';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            info: '',
            error: ''
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        };
    }

    componentDidCatch(error, info) {
        this.setState({ error: error.message, info: JSON.stringify(info) });
    }

    retry = () => {
        this.setState({ hasError: false });
    };

    render() {
        if (this.state.hasError) {
            if (this.state.error === ERRORS.RESPONSE || this.state.error === ERRORS.EMPTY_DATA) {
                return <ErrorDataView error={this.state.error} handleClick={this.retry} />;
            }

            return <ErrorBody handleClick={this.retry} message={'Oops! Algo deu errado!'} />;
        } else {
            return this.props.children;
        }
    }
}

export default ErrorBoundary;
