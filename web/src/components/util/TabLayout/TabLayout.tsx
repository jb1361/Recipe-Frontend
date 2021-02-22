import styles from './TabLayout.module.scss';
import React from 'react';
import {AppTheme} from '../../../appTheme';

export const TabLayout = ({children}: {children: any}) =>
  <div className={styles['tab-layout']} style={AppTheme.styles.background}>{children}</div>;
