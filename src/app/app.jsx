import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { formats } from 'investira.sdk';
import appReducer from './appReducer';
import { themePrimary } from 'investiraComponents/styles/invThemes';
import { ThemeProvider } from 'investiraComponents';
import Root from './views/Root';
import { ReactComponent as IconSprite } from './images/symbol-defs.svg';
import './style/app.scss';

//Ativa plugin REDUX no Chrome
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

//Cria store; define reducer e Redux extension
const store = applyMiddleware(thunk)(createStore)(appReducer, devTools);

// Configura a localização;
formats.locale('pt-br');

class App extends Component {
    componentDidMount() {
        const noScrollBody = () =>
            document.body.addEventListener('touchmove', pEvent => {
                document.body.scrollTop = 0;
                pEvent.preventDefault();
            });
        noScrollBody();
    }

    render() {
        return (
            <Provider store={store}>
                <ThemeProvider theme={themePrimary}>
                    <div className="app theme-primary">
                        <BrowserRouter>
                            <Root />
                        </BrowserRouter>
                        <IconSprite />
                    </div>
                </ThemeProvider>
            </Provider>
        );
    }
}

export default App;
