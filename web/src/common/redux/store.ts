import thunk, {ThunkMiddleware} from 'redux-thunk';
import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux';
import {commonReducers} from './index';
import { persistStore, persistReducer } from 'redux-persist';
// tslint:disable-next-line:no-submodule-imports
import storage from 'redux-persist/lib/storage';
import {Reducer} from 'redux';
import {enableBatching} from 'redux-batched-actions';
import {info} from '../util/logger';
import {PersistConfig} from 'redux-persist/es/types';
import websocketMiddleware from './middleware/websocketMiddleware';

export const configureSharedStore = <T>(appReducer: object, compose: any, middleware: any[] = [], initialState?: T, onReady?: () => void) => {
    const rootReducer = combineReducers({
        ...commonReducers,
        ...appReducer
    });
    const root = persistRootReducer(rootReducer);
    const storeInstance = createStore(
        enableBatching(root),
        initialState,
        compose(applyMiddleware(thunk as ThunkMiddleware<T, AnyAction>, websocketMiddleware, ...middleware))
    );
    const persistorInstance = persistGlobalStore(storeInstance, onReady);
    return {store: storeInstance, persistor: persistorInstance, appDispatch: storeInstance.dispatch};
};

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage,
  whitelist: []
};

export function persistRootReducer(rootReducer: Reducer) {
  return persistReducer(persistConfig, rootReducer);
}

export function persistGlobalStore(store: any, onReady?: () => void) {
  return persistStore(store, null, () => {
    info('Store Re-hydrated. See state in redux dev-tools');
    if (onReady) {
      onReady();
    }
  });
}
