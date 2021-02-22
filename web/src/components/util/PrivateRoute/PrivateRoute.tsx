import {Route, RouteProps, Redirect} from 'react-router';
import React from 'react';
import {
  mapIsAuthenticatedToProps,
  mapIsAuthenticatedToPropsType
} from '../../../common/redux/entities/user';
import {connect} from 'react-redux';

type PrivateRouteProps = mapIsAuthenticatedToPropsType & RouteProps & {
  component: any;
  redirect?: string;
};

function PrivateRouteComponent({component: Component, authenticated, redirect, ...rest}: PrivateRouteProps) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirect ? redirect : '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export const PrivateRoute = connect(mapIsAuthenticatedToProps)(PrivateRouteComponent);
