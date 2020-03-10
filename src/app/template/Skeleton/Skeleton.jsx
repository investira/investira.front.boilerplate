import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NavBar, Body } from '../';

import Style from './Skeleton.module.scss';
class Skeleton extends PureComponent {

    render() {
        const xClass = classNames([Style.root, {
            [Style.navbarDense]: this.props.variant === 'dense',
            [Style.navbarRegular]: this.props.variant === 'regular',
            [Style.navbarLarge]: this.props.variant === 'large'
        }])

        
        if (React.Children.count(this.props.children) !== 2) {
            console.error(
                'Skeleton deve possuir 2 elementos filhos, um do tipo Navbar e do tipo Body'
            );
            return null;
        }

        const navbar = this.props.children[0];
        const body = this.props.children[1];

        if (navbar.type !== NavBar) {
            console.error('O primeiro elemento filho deve ser do tipo NavBar.');
            return null;
        } 

        if (body.type !== Body) {
            console.error('O segundo elemento filho deve ser do tipo Body.');
            return null;
        } 

        return (
            <section className={xClass}>
                <nav className={Style.head}>
                    {React.cloneElement(navbar, { variant: this.props.variant })}
                </nav>
                <main className={Style.body}>
                    {React.cloneElement(body, { variant: this.props.variant })}
                </main>
            </section>
        );
    }
}

Skeleton.propTypes = {
    variant: PropTypes.string,
};

Skeleton.defaultProps = {
    variant: 'regular',
};

export default Skeleton;
