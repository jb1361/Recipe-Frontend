import {combineReducers} from 'redux';
import {CommonDispatch, CommonState} from '../index';
import jwt_decode from 'jwt-decode';
import {AuthToken} from '../../types/AuthToken';
import storage from 'redux-persist/es/storage';
import {
  createStandardActions,
  GetActions,
  placeholder,
  readonly,
  standardItemsReducer
} from '../utils';
import {createStandardSelectors, getEntities, selector} from '../selectors';
import {createAction, createReducer} from 'typesafe-actions';
import {archiveUser, restoreUser, upsertUser} from '../../../api/userManagementApi';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  archivedAt: string | null;
  roleId: number;
}

export interface UserWithToken extends User {
  token: string;
}

export interface UserState {
  currentUser: User | null;
  items: UserItems;
}

export interface UserItems {
  [key: number]: User;
}

export const userPersistConfig = {
  key: 'users',
  storage: storage,
  whitelist: ['currentUser']
};

const currentUserActions = {
  setCurrentUser: createAction('USER/SET_CURRENT_USER')<User | null>()
};

const actions = createStandardActions(placeholder<User>(), 'USER/SET', 'USER/SAVE');
const selectors = createStandardSelectors(placeholder<User>(), s => getEntities(s).users);

export type UserActions = GetActions<typeof actions>;
type CurrentUserActions = GetActions<typeof currentUserActions>;

export const users = combineReducers<UserState>({
  currentUser: createReducer<User|null, CurrentUserActions>(null)
    .handleAction(currentUserActions.setCurrentUser, (state, action) => action.payload),
  items: standardItemsReducer<User, UserActions>(actions)
});

export const userStore = readonly({
  selectors: {
    ...selectors,
    getCurrentUser: selector(s => selectors.getState(s).currentUser),
    getNonArchivedUsers: selector(s => selectors.getAsArray(s).filter(u => u.archivedAt === null)),
    getArchivedUsers: selector(s => selectors.getAsArray(s).filter(u => u.archivedAt !== null))
  },
  actions: {
    ...actions,
    ...currentUserActions,
    upsert: (form: User) => async (dispatch: CommonDispatch) => {
      const response = await upsertUser(form);
      dispatch(userStore.actions.save(response));
      return response;
    },
    archiveUser: (id: string) => async (dispatch: CommonDispatch) => {
      const user: User = await archiveUser(id);
      dispatch(userStore.actions.save(user));
    },
    restoreUser: (id: string) => async (dispatch: CommonDispatch) => {
      const user: User = await restoreUser(id);
      dispatch(userStore.actions.save(user));
    }
  }
});

export function isAuthenticated(state: CommonState) {
  const localUser: User | null = userStore.selectors.getCurrentUser(state);
  const token = localStorage.getItem('token');
  if (token && localUser) {
    const time = Math.ceil((new Date()).getTime() / 1000);
    const decoded = jwt_decode<AuthToken>(token);
    return time < decoded['exp'];
  }
  return false;
}

export type mapIsAuthenticatedToPropsType = ReturnType<typeof mapIsAuthenticatedToProps>;
export const mapIsAuthenticatedToProps = (state: CommonState) => ({ authenticated: isAuthenticated(state)});
