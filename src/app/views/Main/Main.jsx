import React, { Component, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from '../MainRoutes';
import Style from './Main.module.scss';

class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <div className={Style.main}>
                        <div className={Style.body}>
                            <MainRoutes />
                        </div>
                    </div>
                </Fragment>
            </BrowserRouter>
        );
    }
}

export default Main;
