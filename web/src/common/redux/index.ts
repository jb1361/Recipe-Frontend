import {entities, EntitiesActions} from './entities';
import {Action as ReduxAction, Dispatch} from 'redux';
import {BatchAction} from 'redux-batched-actions';

/**
 * Purposefully only returning a plain object, combineReducers will be called later.
 */
export const commonReducers = {
  entities
};

type MapToState<T extends {[key: string]: (...args: any) => any}> = {
   [P in keyof T]: ReturnType<T[P]>;
};
export type CommonState = MapToState<typeof commonReducers>;

export default interface Action<T = any, D = any> extends ReduxAction<T> {
  type: T;
  data: D;
}

export type CommonActions = EntitiesActions | BatchAction;
export type CommonDispatch = Dispatch<CommonActions>;

export type GetCommonState = () => CommonState;
