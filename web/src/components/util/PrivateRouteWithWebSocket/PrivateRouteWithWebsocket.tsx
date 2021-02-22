import {Route, RouteProps, Redirect} from 'react-router';
import React from 'react';
import {connect} from 'react-redux';
import {mapIsConnectedToProps, mapIsConnectedToPropsType} from '../../../common/redux/holdem/holdemSocket';
import Connecting from '../../../pages/Holdem/pages/components/Connecting';

type PrivateRouteProps = mapIsConnectedToPropsType & RouteProps & {
  component: any;
};

function PrivateRouteWithWebsocketComponent({component: Component, authenticated, connected, ...rest}: PrivateRouteProps) {

  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? connected ?
          (
            <Component {...props} />
          ) : (
            <Connecting {...props}/>
          ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export const PrivateRouteWithWebsocket = connect(mapIsConnectedToProps)(PrivateRouteWithWebsocketComponent);
