import React, { PureComponent } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import Dash from '../Dash';
import RouteTransition from '../../viewsController/RouteTransition';

class Body extends PureComponent {
    render() {
        return (
            <RouteTransition {...this.props}>
                <Switch>
                    <Route exact path="/dash" component={Dash} />
                    <Redirect from="/" to="/dash" />
                </Switch>
            </RouteTransition>
        );
    }
}

export default withRouter(Body);
