import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { formats } from 'investira.sdk';
import {
    ThemeProvider,
    PersistGate,
    DndProvider,
    withThemeLocale
} from 'investira.react.components';
import { themePrimary } from 'investira.react.components/styles/invThemes';
import { ReactComponent as IconSprite } from '../assets/images/symbol-defs.svg';
import withClearCache from './ClearCache';
import { RootController } from '../controllers';
import { store, persistor } from '../store';
import utils from '../utils';
import { AppProvider } from './AppManager';
import Root from './Root';

import '../assets/style/app.scss';

// Add polyfill aos navegadores sem suporte a scroll-behavior (Isso é para você safari!)
if (!('scrollBehavior' in document.documentElement.style)) {
    (async function () {
        await import('scroll-behavior-polyfill');
    })();
}

// Remove console.log em produção
utils.build.noLog();
utils.build.noTrace();

// Configura a localização;
formats.locale('pt-br');

function Main(props) {
    return (
        <DndProvider>
            <ThemeProvider theme={themePrimary}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <AppProvider>
                            <div id="app" className="app theme-primary">
                                <BrowserRouter>
                                    <RootController component={Root} />
                                </BrowserRouter>
                                <IconSprite />
                            </div>
                        </AppProvider>
                    </PersistGate>
                </Provider>
            </ThemeProvider>
        </DndProvider>
    );
}

const ClearCacheComponent = withClearCache(withThemeLocale(Main, themePrimary, 'ptBR'));

const App = () => {
    useEffect(() => {
        const noScrollBody = (function () {
            document.body.addEventListener('touchmove', pEvent => {
                document.body.scrollTop = 0;
                pEvent.preventDefault();
            });
        })();

        return () => {
            document.body.removeEventListener('touchmove', pEvent => {
                document.body.scrollTop = 0;
                pEvent.preventDefault();
            });
        };
    }, []);

    return <ClearCacheComponent />;
};

App.displayName = 'App';

export default App;
