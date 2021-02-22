import {CommonDispatch} from '../index';
import {
  getLobbyListCommand,
  joinSeatCommand,
  joinTableCommand,
  leaveTableCommand,
  sendPokerActionCommand,
  startGameCommand
} from '../../../api/holdemClientApi';
import {HoldemMessage} from './holdemSocket';
import {createAction} from 'typesafe-actions';

export const socketApiAction = {
  sendMessage: createAction('HOLDEM_SOCKET/SEND_MESSAGE')<HoldemMessage>()
};

export const socketApiActions = {
  getLobbyList: () => async (dispatch: CommonDispatch) => {
    dispatch(socketApiAction.sendMessage(getLobbyListCommand()));
  },
  joinTable: (tableId: string, playerId: string | null) => async (dispatch: CommonDispatch) => {
    dispatch(socketApiAction.sendMessage(joinTableCommand(tableId, playerId)));
  },
  leaveTable: () => async (dispatch: CommonDispatch) => {
    dispatch(socketApiAction.sendMessage(leaveTableCommand()));
  },
  joinSeat: (tableId: string, seat: number) => async (dispatch: CommonDispatch) => {
    dispatch(socketApiAction.sendMessage(joinSeatCommand(seat)));
  },
  startGame: () => async (dispatch: CommonDispatch) => {
    dispatch(socketApiAction.sendMessage(startGameCommand()));
  },
  sendPokerAction: (action: number, value: string) => async (dispatch: CommonDispatch) => {
    dispatch(socketApiAction.sendMessage(sendPokerActionCommand(action, value)));
  }
};
