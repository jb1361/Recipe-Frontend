import {createStandardActions, GetActions, placeholder, readonly, standardItemsReducer} from '../utils';
import {combineReducers, Dispatch} from 'redux';
import {createStandardSelectors, getEntities} from '../selectors';
import {CommonDispatch} from '../index';
import {getRecipeState, upsertRecipe} from '../../../api/recipeApi';
import {Dictionary} from '../../util';
import {batchActions} from 'redux-batched-actions';

export interface Ingredient {
  id: number;
  measurement: string;
  name: string;
}

export interface Instruction {
  id: number;
  text: string;
}

export interface Recipe {
  id: number;
  title: string;
  comment: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
}

const actions = createStandardActions(placeholder<Recipe>(), 'RECIPE/SET', 'RECIPE/SAVE');
export type RecipeActions = GetActions<typeof actions>;
export const recipes = combineReducers({items: standardItemsReducer<Recipe, RecipeActions>(actions)});
export const recipeStore = readonly({
  selectors: createStandardSelectors(placeholder<Recipe>(), s => getEntities(s).recipes),
  actions: {
    ...actions,
    upsert: (dealer: Recipe) => async (dispatch: CommonDispatch) => {
      const response = await upsertRecipe(dealer);
      dispatch(actions.save(response));
      return response;
    }
  }
});

export interface RecipeStateResponse {
  recipes: Dictionary<Recipe>;
}

export const loadRecipes = () => async (dispatch: Dispatch) => {
  const config: RecipeStateResponse = await getRecipeState();
  await dispatch(batchActions([
    recipeStore.actions.set(config.recipes)
  ], 'BATCH_SET_GLOBAL_CONFIGURATION_STATE'));
};
