import {User} from '../../redux/entities/user';
import {Ingredient, Instruction, Recipe} from '../../redux/entities/recipe';

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
    author: '',
    title: '',
    comment: '',
    ingredients: [],
    instructions: []
  };
}

export function makeIngredient(): Ingredient {
  return {
    id: 0,
    measurement: '',
    name: ''
  };
}

export function makeInstruction(): Instruction {
  return {
    id: 0,
    text: ''
  };
}
