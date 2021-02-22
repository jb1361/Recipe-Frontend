import {Reducer, Types} from 'typesafe-actions/dist/type-helpers';
import {Action} from 'redux';

type RootAction = Types extends {
  RootAction: infer T;
} ? T : any;

type GetAction<TAction extends Action, TType extends TAction['type']> = TAction extends Action<TType> ? TAction : never;

type InitialHandler<TState, TRootAction extends Action> = {
  [P in TRootAction['type']]?: (state: TState, action: GetAction<TRootAction, P>) => TState;
};

type HandleActionChainApi<TState, TInputAction extends Action, TRootAction extends Action> = <TActionCreator extends (...args: any[]) =>
  TInputAction, THandledAction extends ReturnType<TActionCreator>,
  TOutputAction extends Exclude<TInputAction,
    THandledAction>>(
  singleOrMultipleCreatorsAndTypes: TActionCreator | TActionCreator[],
  reducer: (state: TState, action: THandledAction) => TState)
  => [TOutputAction] extends [Action] ? Reducer<TState, TRootAction> & {
  handlers: Record<Exclude<TRootAction, TOutputAction>['type'], (state: TState, action: TRootAction) => TState>;
  handleAction: HandleActionChainApi<TState, TOutputAction, TRootAction>;
} : Reducer<TState, TRootAction> & {
  handlers: Record<TRootAction['type'], (state: TState, action: TRootAction) => TState>;
};

type HandleTypeChainApi<TState, TInputAction extends Action, TRootAction extends Action> =
  <TType extends TInputAction['type'], THandledAction extends Extract<TInputAction, Action<TType>>,
    TOutputAction extends Exclude<TInputAction, THandledAction>>(
      singleOrMultipleCreatorsAndTypes: TType | TType[],
      reducer: (state: TState, action: THandledAction) => TState)
    => [TOutputAction] extends [Action] ? Reducer<TState, TRootAction> & {
  handlers: Record<Exclude<TRootAction, TOutputAction>['type'], (state: TState, action: TRootAction) => TState>;
  handleType: HandleTypeChainApi<TState, TOutputAction, TRootAction>;
} : Reducer<TState, TRootAction> & {
  handlers: Record<TRootAction['type'], (state: TState, action: TRootAction) => TState>;
};

export type EnhancedReducer<TState, TRootAction extends Action = RootAction> = Reducer<TState, TRootAction> & Readonly<{
  handlers: InitialHandler<TState, any>;
  handleAction: [unknown] extends [TRootAction] ? any : HandleActionChainApi<TState, TRootAction, TRootAction>;
  handleType: [unknown] extends [TRootAction] ? any : HandleTypeChainApi<TState, TRootAction, TRootAction>;
}>;
