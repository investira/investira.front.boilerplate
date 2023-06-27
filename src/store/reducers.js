import { combineReducers } from 'investira.react.lib';
import storage from './storage';

import aplicationReducer from './App/AppReducer';
import authReducer from './Auth/AuthReducer';
import authLoginReducer from './AuthLogin/AuthLoginReducer';
import messageReducer from './Message/MessageReducer';
import notificacoesReducer from './Notificacoes/NotificacoesReducer';
import notificacoesAnswerReducer from './NotificacoesAnswer/NotificacoesAnswerReducer';
import notificacoesListReducer from './NotificacoesList/NotificacoesListReducer';
import userReducer from './User/UserReducer';
import userPhotoReducer from './UserPhoto/UserPhotoReducer';
import infoReducer from './Info/InfoReducer';
import websocketReducer from './Websocket/WebsocketReducer';

const reducers = {
    app: [aplicationReducer],
    auth: [authReducer],
    authLogin: [authLoginReducer],
    info: [infoReducer],
    message: [messageReducer],
    newNotificacoes: [notificacoesReducer],
    notificacoesAnswerViewed: [notificacoesAnswerReducer],
    notificacoesList: [notificacoesListReducer],
    user: [userReducer],
    userPhoto: [userPhotoReducer],
    websocket: [websocketReducer, ['connected']]
};

const appReducer = combineReducers(reducers, 'inv', storage);

export default appReducer;
