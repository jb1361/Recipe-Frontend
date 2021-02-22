import {Action, default as Redux} from 'redux';
import {batchActions} from 'redux-batched-actions';
import {Dictionary} from '../util';
import {DeepReadonly} from 'utility-types';
import {createAction, createReducer} from 'typesafe-actions';
import {EnhancedReducer} from './typesafe-actions-types';
import {useEffect, useRef} from 'react';

export const batchAppActions = <T extends Redux.AnyAction>(actions: T[], type?: string) => batchActions(actions, type);

/**
 * A null type placeholder to prevent having to specify generic arguments
 */
export const placeholder = <T>() => null as any as T;

export function createStandardActions<T, S extends string, SA extends string>(instance: T, setType: S, saveType: SA) {
  const set = createAction(setType)<Dictionary<T>>();
  const save = createAction(saveType)<T>();
  return {
    set,
    save
  };
}

export type GetActions<T extends { [key: string]: (...args: any) => any }> = ReturnType<T[keyof T]>;
export type GetAction<T extends (...args: any) => any> = ReturnType<T>;

export const readonly = <T>(v: T) => v as DeepReadonly<T>;

export function standardItemsReducer<T, A extends Action>(actions: any): EnhancedReducer<Dictionary<T>, A> {
  return createReducer<Dictionary<T>, A>({})
    .handleAction(actions.set, (state, action) => action.payload)
    .handleAction(actions.save, (state, action) => ({...state, [action.payload.id]: action.payload})) as any;
}

export function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
