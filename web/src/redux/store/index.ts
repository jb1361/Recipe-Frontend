import {AnyAction, compose, Store} from 'redux';
import rootReducer from '../reducers';
import {routerMiddleware} from 'connected-react-router';
import {WebState} from '../types/WebState';
import history from '../../router/history';
import {initBrowser} from '../actions/browser';
import {configureSharedStore} from '../../common/redux/store';
import {ThunkDispatch} from 'redux-thunk';
export type StoreType = Store<WebState, AnyAction> & { dispatch: ThunkDispatch<WebState, undefined, AnyAction> };

const configureStore = (initialState?: WebState): any => {
  // @ts-ignore
  const composeEnhancers = (typeof window !== 'undefined' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) || compose;
  const commonStore: {store: StoreType; persistor: any; appDispatch: any} =
    configureSharedStore<WebState>(rootReducer(history), composeEnhancers, [routerMiddleware(history)], initialState) as any;
  commonStore.store.dispatch(initBrowser());

  return { store: commonStore.store, persistor: commonStore.persistor, appDispatch: commonStore.appDispatch};
};
export const {store, persistor, appDispatch} = configureStore();
