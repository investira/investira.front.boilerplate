import React, { memo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Body, ErrorBoundary } from '../../molecules';
import Style from './MainTemplate.module.scss';

const MainTemplate = memo(props => {
    const xClass = classNames([
        Style.root,
        {
            'theme-secondary': props.secondary,
            [Style.navbarDense]: props.variant === 'dense',
            [Style.navbarRegular]: props.variant === 'regular',
            [Style.navbarLarge]: props.variant === 'large'
        }
    ]);

    if (React.Children.count(props.children) !== 2) {
        console.error('MainTemplate deve possuir 2 elementos filhos');
        return null;
    }

    const navbar = props.children[0] || <></>;
    const body = props.children[1] || <></>;

    return (
        <ErrorBoundary>
            <section className={xClass} style={props.style}>
                <nav className={Style.head}>
                    {React.cloneElement(navbar, { variant: props.variant })}
                </nav>
                <main className={Style.body}>
                    <Body>{React.cloneElement(body, { variant: props.variant })}</Body>
                </main>
            </section>
        </ErrorBoundary>
    );
});

MainTemplate.propTypes = {
    variant: PropTypes.string
};

MainTemplate.defaultProps = {
    variant: 'regular'
};

export default MainTemplate;
