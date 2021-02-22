import {createStandardActions, GetActions, placeholder, readonly, standardItemsReducer} from '../utils';
import {createStandardSelectors, getHoldemClient, selector} from '../selectors';
import {createAction, createReducer} from 'typesafe-actions';
import {combineReducers} from 'redux';
// import storage from 'redux-persist/es/storage';

export enum EPokerAction {
  Fold,
  Call,
  Raise,
  Check,
  Ready
}

export enum EPokerStatus {
  Folded,
  Waiting,
  None
}

export interface HoldemCard {
  suit: string;
  rank: string;
}

export interface HoldemPlayer {
  id: string;
  username: string;
  seat: number;
  chips: number;
  cards: HoldemCard[];
  pokerActions: EPokerAction[];
  pokerStatus: EPokerStatus;
  connected: boolean;
}

export interface Game {
  id: string;
  activePlayerSeat: number;
  pot: number;
  started: number;
  bigBlindAmount: number;
  bigBlindSeat: number;
  smallBlindSeat: number;
  tableCards: HoldemCard[];
  holdemPlayers: HoldemPlayer[];
  currentPlayer: HoldemPlayer | null;
}

interface HoldemGameState {
  currentGame: Game | null;
  items: GameItems;
}

interface OtherGameState {
  id: string;
  currentPlayerId: string;
}

export interface GameItems {
  [key: string]: OtherGameState;
}

// export const gamePersistConfig = {
//   key: 'game',
//   storage: storage,
//   whitelist: ['items']
// };

const currentGameActions = {
  setCurrentGame: createAction('GAME/SET_CURRENT_GAME')<Game | null>()
};
const actions = {
  ...createStandardActions(placeholder<OtherGameState>(), 'GAME/SET', 'GAME/SAVE'),
  removeGame: createAction('GAME/REMOVE')<OtherGameState>()
};
export type CurrentGameActions = GetActions<typeof currentGameActions>;
export type GameActions = GetActions<typeof actions>;

const selectors = createStandardSelectors(placeholder<OtherGameState>(), s => getHoldemClient(s).games);

export const currentGame = createReducer<Game|null, CurrentGameActions>(null)
  .handleAction(currentGameActions.setCurrentGame, (state, action) => action.payload);

export const games = combineReducers<HoldemGameState>({
  currentGame: currentGame,
  items: standardItemsReducer<OtherGameState, GameActions>(actions)
    .handleAction(actions.removeGame, (state, action) => {
      const newState = {...state} as {[key: string]: OtherGameState};
      delete newState[action.payload.id];
      return newState;
    })
});

export const gamesStore = readonly({
  selectors: {
    ...selectors,
    getCurrentGame: selector<Game | null>(s => getHoldemClient(s).games.currentGame),
    currentPlayer: selector<HoldemPlayer | null>(s =>
      getHoldemClient(s).games.currentGame !== null ? getHoldemClient(s).games.currentGame!.currentPlayer : null),
    getPreviousPlayerId: selector(s => (tableId: string) => {
      const oldGame = getHoldemClient(s).games.items[tableId];
      if (oldGame) {
        return oldGame.currentPlayerId;
      }
      return null;
    })
  },
  actions: {
    ...actions,
    ...currentGameActions
  }
});
