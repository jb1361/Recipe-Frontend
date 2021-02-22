import {CSSProperties} from 'react';
import {nodeListToArray} from './util';
import Logo from './assets/images/logo.png';

import d2 from './assets/cards/d/2.png';
import d3 from './assets/cards/d/3.png';
import d4 from './assets/cards/d/4.png';
import d5 from './assets/cards/d/5.png';
import d6 from './assets/cards/d/6.png';
import d7 from './assets/cards/d/7.png';
import d8 from './assets/cards/d/8.png';
import d9 from './assets/cards/d/9.png';
import d10 from './assets/cards/d/10.png';
import dj from './assets/cards/d/j.png';
import dq from './assets/cards/d/q.png';
import dk from './assets/cards/d/k.png';
import da from './assets/cards/d/a.png';

import s2 from './assets/cards/s/2.png';
import s3 from './assets/cards/s/3.png';
import s4 from './assets/cards/s/4.png';
import s5 from './assets/cards/s/5.png';
import s6 from './assets/cards/s/6.png';
import s7 from './assets/cards/s/7.png';
import s8 from './assets/cards/s/8.png';
import s9 from './assets/cards/s/9.png';
import s10 from './assets/cards/s/10.png';
import sj from './assets/cards/s/j.png';
import sq from './assets/cards/s/q.png';
import sk from './assets/cards/s/k.png';
import sa from './assets/cards/s/a.png';

import h2 from './assets/cards/h/2.png';
import h3 from './assets/cards/h/3.png';
import h4 from './assets/cards/h/4.png';
import h5 from './assets/cards/h/5.png';
import h6 from './assets/cards/h/6.png';
import h7 from './assets/cards/h/7.png';
import h8 from './assets/cards/h/8.png';
import h9 from './assets/cards/h/9.png';
import h10 from './assets/cards/h/10.png';
import hj from './assets/cards/h/j.png';
import hq from './assets/cards/h/q.png';
import hk from './assets/cards/h/k.png';
import ha from './assets/cards/h/a.png';

import c2 from './assets/cards/c/2.png';
import c3 from './assets/cards/c/3.png';
import c4 from './assets/cards/c/4.png';
import c5 from './assets/cards/c/5.png';
import c6 from './assets/cards/c/6.png';
import c7 from './assets/cards/c/7.png';
import c8 from './assets/cards/c/8.png';
import c9 from './assets/cards/c/9.png';
import c10 from './assets/cards/c/10.png';
import cj from './assets/cards/c/j.png';
import cq from './assets/cards/c/q.png';
import ck from './assets/cards/c/k.png';
import ca from './assets/cards/c/a.png';

import nc from './assets/cards/n/c.png';

const cards = {
  d2, d3, d4, d5, d6, d7, d8, d9, d10, dj, dq, dk, da,
  s2, s3, s4, s5, s6, s7, s8, s9, s10, sj, sq, sk, sa,
  h2, h3, h4, h5, h6, h7, h8, h9, h10, hj, hq, hk, ha,
  c2, c3, c4, c5, c6, c7, c8, c9, c10, cj, cq, ck, ca,
  nc
} as any;

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
export const getCard = (card: string) => cards[card];
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
