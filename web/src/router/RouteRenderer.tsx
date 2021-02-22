import {RoutePath} from './RoutePaths';
import * as React from 'react';
import {Route} from 'react-router';

export const RouteRenderer = (props: {routePaths: RoutePath[]}) => (
  <React.Fragment>
    {props.routePaths.map(r => (<Route exact={true} path={r.path} key={r.path} component={r.component}/>))}
  </React.Fragment>
);
