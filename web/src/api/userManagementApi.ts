import {api} from './index';
import {User} from '../common/redux/entities/user';
import {UserManagementResponse} from '../common/redux/userManagement';

export async function getUserManagementState() {
  return (await api.get<UserManagementResponse>('/UserManagement')).data;
}

export async function getUsers() {
  return (await api.get<User[]>('/User')).data;
}

export async function archiveUser(id: string) {
  return (await api.post<User>(`/User/${id}/archive`)).data;
}

export async function restoreUser(id: string) {
  return (await api.post<User>(`/User/${id}/restore`)).data;
}

export async function upsertUser(form: User) {
  return (await api.post<User>('/User', form)).data;
}
