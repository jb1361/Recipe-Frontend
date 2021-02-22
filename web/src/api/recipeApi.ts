import {Recipe, RecipeStateResponse} from '../common/redux/entities/recipe';
import {api} from './index';

export async function getRecipeState() {
  return (await api.get<RecipeStateResponse>('/RecipeState')).data;
}

export async function upsertRecipe(recipe: Recipe) {
  return (await api.post<Recipe>('/Recipe', recipe)).data;
}
