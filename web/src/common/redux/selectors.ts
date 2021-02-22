import {CommonState} from './index';
import {convertToDropDownOptions, Dictionary} from '../util';
import {Selector} from 'react-redux';
import {DropdownOption} from '../../components/util/form-components/SearchableDropdown/SearchableDropdown';
import {createSelector} from 'reselect';
import memoize from 'lodash.memoize';

export const getEntities = (state: CommonState) => state.entities;
export const getHoldemClient = (state: CommonState) => state.holdemClient;

export const selector = <T>(func: (state: CommonState) => T) => func;

export type StandardState<T> = {
  items: Dictionary<T>;
};

export function createStandardSelectors<T, S extends StandardState<T>>(i: T, getStateParam: (s: CommonState) => S): StandardSelectors<T, S> {
  const getState = createSelector(getStateParam, s => s);
  const getItems = createSelector(getState, s => s.items);
  const getAsArray = createSelector(getItems, items => Object.values<T>(items));
  const getOptions = createSelector(getAsArray, arr => convertToDropDownOptions(arr));
  const getById = createSelector(getItems, items => memoize((id: number) => items[id]));
  return {
    getState,
    getItems,
    getAsArray,
    getOptions,
    getById
  } as const;
}

export interface StandardSelectors<T, S extends StandardState<T>> {
  getState: Selector<CommonState, S>;
  getItems: Selector<CommonState, Dictionary<T>>;
  getAsArray: Selector<CommonState, T[]>;
  getOptions: Selector<CommonState, Array<DropdownOption<number>>>;
  getById: Selector<CommonState, (id: number) => T>;
}
