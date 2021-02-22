import {createStandardSelectors, getEntities} from '../selectors';
import {createStandardActions, GetActions, placeholder, readonly, standardItemsReducer} from '../utils';
import {combineReducers} from 'redux';

export interface HoldemTable {
  id: string;
  name: string;
  buyInAmount: number;
  started: boolean;
}

const actions = createStandardActions(placeholder<HoldemTable>(), 'HOLDEM_TABLE/SET', 'HOLDEM_TABLE/SAVE');
export type TableActions = GetActions<typeof actions>;
export const tables = combineReducers({items: standardItemsReducer<HoldemTable, TableActions>(actions)});
export const tableStore = readonly({
  selectors: createStandardSelectors(placeholder<HoldemTable>(), s => getEntities(s).tables),
  actions: {
    ...actions
  }
});
