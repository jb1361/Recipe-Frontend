import {Redirect, RouteComponentProps} from 'react-router';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {RoutePaths} from '../../router/RoutePaths';
import {logout} from '../../api/authApi';

type LogoutProps = ReturnType<typeof mapDispatchToProps> & RouteComponentProps & {
  label: string;
};

export function LogOutComponent(props: LogoutProps) {
  props.logout();
  return (
    <Redirect
      to={{
        pathname: RoutePaths.home,
        state: { from: props.location }
      }}
    />
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({logout: logout}, dispatch);

export const LogOut = connect(undefined, mapDispatchToProps)(LogOutComponent);
