import {combineReducers} from 'redux';
import {UserActions, userPersistConfig, users} from './user';
import {persistReducer} from 'redux-persist';
import {RoleActions, roles} from './role';
import {TableActions, tables} from './table';

export const entities = combineReducers({
  users: persistReducer(userPersistConfig, users) as unknown as typeof users,
  roles: roles,
  tables: tables
});

export type Entities  = ReturnType<typeof entities>;

export type EntitiesActions =
  UserActions |
  RoleActions |
  TableActions;
