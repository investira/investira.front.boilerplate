import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRouteController = ({ component: Component, isLoggedIn, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <>
                        <Component {...props} />
                    </>
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};

PrivateRouteController.displayName = 'PrivateRouteController';

export default PrivateRouteController;
