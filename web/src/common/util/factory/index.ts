import {User} from '../../redux/entities/user';

export function makeUser(): User {
  return {
    id: 0,
    email: '',
    archivedAt: null,
    roleId: '' as any as number
  };
}
