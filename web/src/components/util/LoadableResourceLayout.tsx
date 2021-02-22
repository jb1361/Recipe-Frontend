import {LoadableResourceState} from '../../hooks/useLoadableResource';
import {Alert} from 'react-bootstrap';
import {CenteredSpinner} from './widgets/CenteredSpinner/CenteredSpinner';
import React from 'react';

function isFunction(functionToCheck: any) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

export function LoadableResourceLayout<T>({state, children}: {state: LoadableResourceState<T>; children: any}) {
  const {errorMessage, loading, alert, resource} = state;
  return errorMessage ? <Alert variant='danger'>{errorMessage}</Alert> : loading ? <CenteredSpinner/> : (
    <>
      {alert && <Alert variant='danger'>{alert}</Alert>}
      {resource !== undefined && (isFunction(children) ? children() : children)}
    </>
  );
}
