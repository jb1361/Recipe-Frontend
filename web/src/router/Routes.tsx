import * as React from 'react';
import {Switch, Route, Router} from 'react-router-dom';
import History from './history';
import NotFound from '../pages/NotFound/NotFound';
import {PrivateRoute} from '../components/util/PrivateRoute/PrivateRoute';
import Login from '../pages/Login/Login';
import {RoutePaths} from './RoutePaths';
import {LogOut} from '../pages/Logout/Logout';
import {Home} from '../pages/Home/Home';
import Holdem from '../pages/Holdem/Holdem';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import {PrivateRouteWithWebsocket} from '../components/util/PrivateRouteWithWebSocket/PrivateRouteWithWebsocket';

const Routes = () => (
  <Router history={History}>
    <Switch>
      <Route path={RoutePaths.login} component={Login} redirectTo={RoutePaths.home}/>
      <Route path={RoutePaths.logout} component={LogOut} redirectTo={RoutePaths.login}/>
      <Route path={RoutePaths.forgotPassword} component={ForgotPassword} redirectTo={RoutePaths.home}/>
      <Route path={RoutePaths.resetPassword} component={ResetPassword} redirectTo={RoutePaths.home}/>
      <PrivateRoute exact={true} path={RoutePaths.home} component={Home}/>
      <PrivateRouteWithWebsocket path={RoutePaths.Holdem} component={Holdem}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
);

export default Routes;
