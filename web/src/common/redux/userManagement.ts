import {Dispatch} from 'redux';
import {calculateSize} from '../util/object';
import {User, userStore} from './entities/user';
import {getUserManagementState} from '../../api/userManagementApi';
import {Dictionary} from '../util';
import {batchActions} from 'redux-batched-actions';

import {Role, roleStore} from './entities/role';

export interface UserManagementResponse {
  users: Dictionary<User>;
  roles: Dictionary<Role>;
}

export const loadUserManagementData = () => async (dispatch: Dispatch) => {
  const response: UserManagementResponse = await getUserManagementState();
  if (process.env.NODE_ENV === 'development') {
    calculateSize(response, 'User Management Response');
  }
  await dispatch(batchActions([
    dispatch(userStore.actions.set(response.users)),
    dispatch(roleStore.actions.set(response.roles))
  ], 'BATCH_SET_USER_MANAGEMENT_STATE'));
};
