import {LoginRequest, userStore} from '../common/redux/entities/user';
import {api, setToken} from './index';

export interface PasswordResetRequest {
  email: string;
  passwordResetToken: string;
  password: string;
  confirmPassword: string;
}

export const logout = () => () => {
  localStorage.removeItem('token');
  userStore.actions.setCurrentUser(null);
};

export async function login(user: LoginRequest) {
  const res = await api.post('authentication', user);
  setToken(res.data.token);
  return res;
}

export async function forgotPassword(email: string) {
  return (await api.post('/user/forgotPassword/' + email)).data;
}

export async function validateToken(token: string) {
  return (await api.get('/user/validateToken/' + token)).data;
}

export async function resetPassword(resetRequest: PasswordResetRequest) {
  return (await api.post('/user/resetPassword', resetRequest)).data;
}

export async function getCurrentUserFromServer() {
  return (await api.get('/user/current')).data;
}
