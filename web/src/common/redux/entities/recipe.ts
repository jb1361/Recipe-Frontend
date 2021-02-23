import {createStandardActions, GetActions, placeholder, readonly, standardItemsReducer} from '../utils';
import {combineReducers, Dispatch} from 'redux';
import {createStandardSelectors, getEntities, selector} from '../selectors';
import {CommonDispatch} from '../index';
import {getRecipeState, upsertRecipe} from '../../../api/recipeApi';
import {Dictionary} from '../../util';
import {batchActions} from 'redux-batched-actions';
import storage from 'redux-persist/es/storage';
import {createAction, createReducer} from 'typesafe-actions';

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
  author: string;
  title: string;
  comment: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
}

export const recipePersistConfig = {
  key: 'recipes',
  storage: storage,
  whitelist: ['favorites']
};

const favoriteActions = {
  setFavorite: createAction('RECIPE/SET_FAVORITE')<number>(),
  unsetFavorite: createAction('RECIPE/UNSET_FAVORITE')<number>()
};

export type FavoriteActions = GetActions<typeof favoriteActions>;
const actions = createStandardActions(placeholder<Recipe>(), 'RECIPE/SET', 'RECIPE/SAVE');
export type RecipeActions = GetActions<typeof actions> | GetActions<typeof favoriteActions>;

export const recipes = combineReducers({
  items: standardItemsReducer<Recipe, RecipeActions>(actions),
  favorites: createReducer<number[], FavoriteActions>([])
    .handleAction(favoriteActions.setFavorite, (state, action) => ({...state, [action.payload]: action.payload}))
    .handleAction(favoriteActions.unsetFavorite, (state, action) => {
      const newState = {...state};
      delete newState[action.payload];
      return newState;
    })
});

const selectors = createStandardSelectors(placeholder<Recipe>(), s => getEntities(s).recipes);
export const recipeStore = readonly({
  selectors: {
    ...selectors,
    favorites: selector(s => () => {
      const favArr = getEntities(s).recipes.favorites;
      return selectors.getAsArray(s).filter(r => favArr.includes(r.id));
    })
  },
  actions: {
    ...actions,
    upsert: (dealer: Recipe) => async (dispatch: CommonDispatch) => {
      const response = await upsertRecipe(dealer);
      dispatch(actions.save(response));
      return response;
    },
    setFavorite: (recipeId: number) => async (dispatch: CommonDispatch) => {
      dispatch(favoriteActions.setFavorite(recipeId));
    },
    unsetFavorite: (recipeId: number) => async (dispatch: CommonDispatch) => {
      dispatch(favoriteActions.unsetFavorite(recipeId));
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
