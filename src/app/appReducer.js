import { combineReducers } from 'redux';
import { bindStateToLocalStorage } from 'investiraLib';
import authReducer from './actions/Auth/AuthReducer';
import aplicationReducer from './actions/App/AppReducer';
import messageReducer from './actions/Message/MessageReducer';
import userReducer from './actions/User/UserReducer';

const appReducer = combineReducers({
    app: aplicationReducer,
    auth: authReducer,
    message: messageReducer,
    user: userReducer
});

export default bindStateToLocalStorage(appReducer);
