import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Configuracoes, Notificacoes, Dashboard } from '../../../../pages';

function MainRoutes(props) {
    return (
        <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/configuracoes" component={Configuracoes} />
            <Route exact path="/notificacoes" component={Notificacoes} />

            <Redirect from="/" to="/dashboard" />
        </Switch>
    );
}

MainRoutes.displayName = 'MainRoutes';

export default withRouter(MainRoutes);
