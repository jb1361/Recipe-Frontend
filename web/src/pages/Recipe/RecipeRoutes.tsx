import * as React from 'react';
import {Switch, Route, match} from 'react-router-dom';
import {convertComponentPaths, RoutePath, RoutePaths} from '../../router/RoutePaths';
import NotFound from '../NotFound/NotFound';
import {RouteRenderer} from '../../router/RouteRenderer';
import RecipeEditor from './pages/RecipeEditor/RecipeEditor';
import Recipes from './pages/Recipes/Recipes';

interface Props {
  match: match;
}

const routes: RoutePath[] = [
  ...convertComponentPaths(
    {component: RecipeEditor, paths: Object.values(RoutePaths.recipePaths)}
  )
];

const RecipeRoutes = (props: Props) => (
  <Switch>
    <Route exact={true} path={RoutePaths.Recipe} component={Recipes}/>
    <RouteRenderer routePaths={routes}/>
    <Route component={NotFound}/>
  </Switch>
);

export default RecipeRoutes;
