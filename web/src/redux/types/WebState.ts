import {NavigationState} from './NavigationState';
import {RouterState} from 'connected-react-router';
import {BrowserState} from './BrowserState';
import {CommonState} from '../../common/redux';

export interface WebState extends CommonState {
  navigator: NavigationState;
  router: RouterState;
  browser: BrowserState;
}
