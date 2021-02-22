import {combineReducers} from 'redux';
import {BrowserTypes} from '../types/actionTypes';
import {WindowState} from '../types/BrowserState';
import Action from '../../common/redux';

function windowSize(state: WindowState = {width: 0, height: 0}, action: Action) {
  switch (action.type) {
    case BrowserTypes.SCREEN_RESIZE:
      return {
        ...state,
        ...action.data.windowSize
      };
    default:
      return state;
  }
}

export const browser = combineReducers({windowSize});
