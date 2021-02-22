import {CSSProperties} from 'react';
import {nodeListToArray} from './util';
import Logo from './assets/images/logo.png';

const darkMode =  !!process.env?.REACT_APP_DARK_MODE;

const colors = {
    primaryTextColor: darkMode ? '#fff' : 'black',
    primary: '#3b5872',
    secondary: '#6c757d',
    gray400: '#ced4da',
    background: darkMode ? '#222222' : '#fff',
    offsetBackground: darkMode ? '#202020' : '#f9f9f9',
    largerOffsetBackground: darkMode ? '#353535' : '#f1f1f1',
    warning: '#f8c839',
    success: '#5fb173',
    danger: '#c45b65'
} as const;

export const AppTheme = {
  colors: colors,
  styles: {
    offsetBackground: !darkMode ? { background: colors.offsetBackground} : {} as CSSProperties,
    background: !darkMode ? {background: colors.background} : {} as CSSProperties,
    largerOffsetBackground: {background: colors.largerOffsetBackground} as CSSProperties,
    primaryTextColor: {color: colors.primaryTextColor} as CSSProperties
  },
  darkMode: darkMode
};

export const getLogoLink = () => Logo;

function createLink(href: string) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  return link;
}

export function configureTheme() {
  if (!process.env.REACT_APP_DARK_MODE) {
    return null;
  }
  document.body.classList.add('dark-mode');
  document.body.dataset['theme'] = 'dark';

  const link = createLink(process.env.PUBLIC_URL + '/bootstrap/css/dark-mode-bootstrap.min.css');
  document.head.appendChild(link);
  const stdLink = (nodeListToArray(document.head.children) as HTMLLinkElement[]).filter(c => (c.href ?? '').indexOf('css/bootstrap.min.css') !== -1).pop()!;
  document.head.removeChild(stdLink);
}
