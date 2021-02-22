import {HoldemMessage} from '../common/redux/holdem/holdemSocket';

function makeCommand(command: string, data: string): HoldemMessage {
  return {
    command: command,
    data: data
  };
}
// TODO Move this to a factory folder
export function getLobbyListCommand() {
  return makeCommand('getLobbyList', '');
}

export function joinTableCommand(tableId: string, playerId: string | null) {
  return makeCommand('joinTable', JSON.stringify({tableId: tableId, playerId: playerId}));
}

export function leaveTableCommand() {
  return makeCommand('leaveTable', '');
}

export function joinSeatCommand(seat: number) {
  return makeCommand('joinSeat', seat.toString());
}

export function startGameCommand() {
  return makeCommand('startGame', '');
}

export function sendPokerActionCommand(action: number, value: string) {
  return makeCommand('pokerAction', JSON.stringify({action: action, value: value}));
}
