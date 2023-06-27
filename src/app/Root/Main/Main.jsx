import React, { memo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StoreListener, VisibilityListener } from '../../../listeners';
import { WebSocketController } from '../../../controllers';
import { ErrorBoundary } from '../../../components/molecules';
import MainRoutes from './MainRoutes';
import Preload from './Preload';

import Style from './Main.module.scss';

const Main = memo(() => {
    return (
        <Preload>
            <BrowserRouter>
                <ErrorBoundary>
                    <VisibilityListener />
                    <WebSocketController>
                        <StoreListener />
                        <div className={Style.main}>
                            <div className={Style.body}>
                                <ErrorBoundary>
                                    <MainRoutes />
                                </ErrorBoundary>
                            </div>
                        </div>
                    </WebSocketController>
                </ErrorBoundary>
            </BrowserRouter>
        </Preload>
    );
});

export default Main;
