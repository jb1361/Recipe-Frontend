import {createAction} from 'typesafe-actions';
import {HoldemMessage} from '../holdem/holdemSocket';
import {push} from 'connected-react-router';

interface ReduxAction  {
  type: string;
  payload: any;
}

export const socketMiddlewareActions = {
  setConnected: createAction('HOLDEM_SOCKET/SET_CONNECTED')(),
  setDisconnected: createAction('HOLDEM_SOCKET/SET_DISCONNECTED')(),
  setRedirect: createAction('HOLDEM_SOCKET/SET_REDIRECT')<string>()
};
const websocketMiddleware = () => {
  let socket: WebSocket | null;

  const onOpen = (store: any) => (event: any) => {
    store.dispatch(socketMiddlewareActions.setConnected());
  };

  const onClose = (store: any) => () => {
    store.dispatch(socketMiddlewareActions.setDisconnected());
  };

  const onMessage = (store: any) => (event: any) => {
    const payload: HoldemMessage = JSON.parse(event.data);
    switch (payload.command) {
      case 'reduxAction':
        const data: ReduxAction = JSON.parse(payload.data);
        data.payload = JSON.parse(data.payload);
        store.dispatch(data);
        break;
      case 'redirect':
        store.dispatch(push(payload.data.replaceAll('"', '')));
        break;
      default:
        break;
    }
  };
  return (store: any) => (next: any) => (action: any) => {
    switch (action.type) {
      case 'HOLDEM_SOCKET/CONNECT':
        if (socket !== undefined && socket !== null) {
          socket.close();
        }
        socket = new WebSocket(process.env.REACT_APP_WS_HOST!);
        socket.onmessage = onMessage(store);
        socket.onclose = onClose(store);
        socket.onopen = onOpen(store);

        break;
      case 'HOLDEM_SOCKET/DISCONNECT':
        if (socket !== null && socket !== undefined) {
          socket.close();
        }
        socket = null;
        break;
      case 'HOLDEM_SOCKET/SEND_MESSAGE':
        if (socket) {
          socket.send(JSON.stringify({ command: action.payload.command, data: action.payload.data }));
        } else {
          console.log('Socket not connected when trying to send data');
        }
        break;
      default:
        return next(action);
    }
  };
};

export default websocketMiddleware();
