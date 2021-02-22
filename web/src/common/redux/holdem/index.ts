import {combineReducers} from 'redux';
import {holdemSocket, HoldemSocketActions} from './holdemSocket';
import {GameActions, games} from './games';

export const holdemClient = combineReducers({
  // games: persistReducer(gamePersistConfig, games) as unknown as typeof games,
  games: games,
  holdemSocket: holdemSocket
});

export type Entities  = ReturnType<typeof holdemClient>;

export type HoldemClientActions = HoldemSocketActions | GameActions;
