import React, { memo } from 'react';
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import Configuracoes from './Configuracoes';
import ChangePassword from './ChangePassword';

const ConfiguracoesSwitch = memo(() => {
    let location = useLocation();
    let background = location.state && location.state.background;
    let { path } = useRouteMatch();

    return (
        <Switch location={background || location}>
            <Route exact path={path} component={Configuracoes} />
            <Route exact path={`${path}/change-password`} component={ChangePassword} />
        </Switch>
    );
});

ConfiguracoesSwitch.displayName = 'ConfiguracoesSwitch';

export default ConfiguracoesSwitch;
