import { createStore, persistStore } from 'investira.react.lib';
import appReducer from './reducers';

/*
 * Cria store.
 * Define Reducer e Redux extension
 */

const store = createStore(appReducer);
const persistor = persistStore(store);

export { store, persistor };

export default store;
