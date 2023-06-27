import React, { memo } from 'react';
import { browsers } from 'investira.react.lib';
import RedirectToApp from './RedirectToApp';

const RootController = memo(props => {
    let showRoot = process.env.NODE_ENV === 'production' ? false : true;

    const Component = props.component;

    if (browsers.isWebView() || !browsers.isMobile()) {
        showRoot = true;
    }

    return <Component showRoot={showRoot} redirectComponent={RedirectToApp} />;
});

RootController.displayName = 'RootController';

export default RootController;
