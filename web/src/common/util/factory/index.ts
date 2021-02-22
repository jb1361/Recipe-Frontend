import {User} from '../../redux/entities/user';
import {Recipe} from '../../redux/entities/recipe';

export function makeUser(): User {
  return {
    id: 0,
    email: '',
    archivedAt: null,
    roleId: '' as any as number
  };
}

export function makeRecipe(): Recipe {
  return {
    id: 0,
    title: '',
    comment: '',
    ingredients: [],
    instructions: []
  };
}
