import {connect, MapDispatchToPropsParam, MapStateToPropsParam} from 'react-redux';
import {CommonState} from '../common/redux';
import {ComponentType, memo} from 'react';
import {shallowDiff} from '../common/util/object';
import {pipeLog} from './index';

export function MakeContainerFunc<TOwnProps = {}, TStateProps = {}, TDispatchProps = {}, State = CommonState>(
  component: ComponentType<any>,
  mapStateToProps?: MapStateToPropsParam<TStateProps, TOwnProps, State>,
  mapDispatchToProps?: MapDispatchToPropsParam<TDispatchProps, TOwnProps>) {
  return connect<TStateProps, TDispatchProps, TOwnProps, State>(
    ((mapStateToProps as any) ?? (() => ({}))) as unknown as MapStateToPropsParam<TStateProps, TOwnProps, State>,
    mapDispatchToProps ?? (() => ({})) as unknown as MapDispatchToPropsParam<TDispatchProps, TOwnProps>
  )(component);
}

export const typedMemo: <T>(
  c: T,
  propsAreEqual?: (prevProps: object, nextProps: object) => boolean
) => T = memo;

export const debugPropChanges = (prevProps: object, props: object): boolean =>
  !pipeLog(shallowDiff(prevProps, props));

export const defaultDispatch = (() => ({}));
