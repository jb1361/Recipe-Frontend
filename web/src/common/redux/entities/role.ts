import {createStandardActions, GetActions, placeholder, readonly, standardItemsReducer} from '../utils';
import {combineReducers} from 'redux';
import {createStandardSelectors, getEntities} from '../selectors';

export interface Role {
  id: number;
  roleName: string;
}

const actions = createStandardActions(placeholder<Role>(), 'ROLE/SET', 'ROLE/SAVE');
export type RoleActions = GetActions<typeof actions>;
export const roles = combineReducers({items: standardItemsReducer<Role, RoleActions>(actions)});
export const roleStore = readonly({
  selectors: createStandardSelectors(placeholder<Role>(), s => getEntities(s).roles),
  actions: {
    ...actions
  }
});
