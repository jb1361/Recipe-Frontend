import {combineReducers} from 'redux';
import {NavigationTypes} from '../types/actionTypes';

import {NavigationState} from '../types/NavigationState';
import Action from '../../common/redux';

function currentPage(state: NavigationState = {currentPage: ''}, action: Action) {
  switch (action.type) {
    case NavigationTypes.NAVIGATE_TO_PAGE:
      return {
        ...state,
        currentPage: action.data
      };
    default:
      return state;
  }
}

export const navigator = combineReducers({currentPage});
