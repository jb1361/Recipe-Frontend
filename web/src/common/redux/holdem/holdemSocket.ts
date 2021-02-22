import {GetActions, readonly} from '../utils';
import {createAction, createReducer} from 'typesafe-actions';
import {CommonDispatch, CommonState} from '../index';
import {selector} from '../selectors';
import {isAuthenticated} from '../entities/user';
import {socketApiAction, socketApiActions} from './holdemSocketApi';
import {socketMiddlewareActions} from '../middleware/websocketMiddleware';

export interface HoldemSocket {
  connected: boolean;
}

export interface HoldemMessage {
  command: string;
  data: string;
}

const actions = {
  connect: createAction('HOLDEM_SOCKET/CONNECT')(),
  disconnect: createAction('HOLDEM_SOCKET/DISCONNECT')(),
  ...socketMiddlewareActions,
  ...socketApiAction
};

export type HoldemSocketActions = GetActions<typeof actions>;

export const holdemSocket = createReducer<HoldemSocket, HoldemSocketActions>({connected: false})
  .handleAction(actions.setConnected, (state) => ({...state, connected: true}))
  .handleAction(actions.setDisconnected, (state) => ({...state, connected: false}))
  .handleAction(actions.setRedirect, (state, action) => ({...state, redirect: action.payload}));

export const holdemSocketStore = readonly({
  selectors: {
    getConnectionStatus: selector(s => s.holdemClient.holdemSocket.connected)
  },
  actions: {
    connect: () => async (dispatch: CommonDispatch) => {
      await dispatch(actions.connect());
    },
    disconnect: () => async (dispatch: CommonDispatch) => {
      dispatch(actions.disconnect());
    },
    sendMessage: (command: HoldemMessage) => async (dispatch: CommonDispatch) => {
      dispatch(actions.sendMessage(command));
    },
    setRedirect: (url: string) => async (dispatch: CommonDispatch) => {
      dispatch(actions.setRedirect(url));
    },
    ...socketApiActions
  }
});

export function isConnected(state: CommonState) {
  return holdemSocketStore.selectors.getConnectionStatus(state);
}

export type mapIsConnectedToPropsType = ReturnType<typeof mapIsConnectedToProps>;
export const mapIsConnectedToProps = (state: CommonState) => ({ authenticated: isAuthenticated(state), connected: isConnected(state)});
