import * as React from 'react';
import {Switch, Route, match} from 'react-router-dom';
import {convertComponentPaths, RoutePath, RoutePaths} from '../../router/RoutePaths';
import NotFound from '../NotFound/NotFound';
import {RouteRenderer} from '../../router/RouteRenderer';
import HoldemLobby from './pages/HoldemLobby/HoldemLobby';
import HoldemGame from './pages/HoldemGame/HoldemGame';
import HoldemHome from './pages/HoldemHome/HoldemHome';

interface Props {
  match: match;
}

const routes: RoutePath[] = [
  ...convertComponentPaths(
    {component: HoldemHome, paths: [RoutePaths.holdemPaths.Home]},
    {component: HoldemLobby, paths: [RoutePaths.holdemPaths.Lobby]},
    {component: HoldemGame, paths: [RoutePaths.holdemPaths.Play]},
  )
];

const HoldemRoutes = (props: Props) => (
  <Switch>
    <RouteRenderer routePaths={routes}/>
    <Route component={NotFound}/>
  </Switch>
);

export default HoldemRoutes;
