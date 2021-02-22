import styles from './Indicator.module.scss';
import React from 'react';
import {combineClasses} from '../../../../util';

export function Indicator(props: {color: 'green'}) {
  return (
    <div className={combineClasses(styles['led'], styles[props.color])}/>
  );
}
