export interface RoutePath {
  path: string;
  component: any;
}

enum HomePaths {
  home = '/'
}

enum MiscellaneousPaths {
  storage = '/Storage',
  images = '/images'
}

enum DashboardPaths {
  dashboard = '/dashboard'
}

enum AuthenticationPaths {
  login = '/login',
  logout = '/logout',
  forgotPassword = '/forgot-password',
  resetPassword = '/reset-password'
}

const HoldemBasePath = '/holdem';

const HoldemPaths = {
  Home: HoldemBasePath,
  Lobby: HoldemBasePath + '/lobby',
  Play: HoldemBasePath + '/play/:tableId'
};

export function applyBasePath(basePath: string, pathFn: (basePath: string) => string) {
  return pathFn(basePath);
}

export function applyBasePaths(basePath: string, ...pathsFns: Array<(basePath: string) => string>) {
  return pathsFns.map(fn => applyBasePath(basePath, fn));
}

export interface ComponentPath {
  component: any;
  paths: string[];
}

export function convertComponentPaths(...editorPaths: ComponentPath[]): RoutePath[] {
  return editorPaths.map(editorPath => editorPath.paths.map(path => ({
    path: path,
    component: editorPath.component
  }))).flat(1);
}

export const RoutePaths = {
  ...HomePaths,
  ...MiscellaneousPaths,
  ...AuthenticationPaths,
  ...DashboardPaths,
  Holdem: HoldemBasePath,
  holdemPaths: HoldemPaths
};
