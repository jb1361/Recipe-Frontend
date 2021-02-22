import styles from './Section.module.scss';
import {AppTheme} from '../../../appTheme';
import {Row} from 'react-bootstrap';
import React, {PropsWithChildren} from 'react';

export function Section({children, title}: PropsWithChildren<{title: string}>) {
  return (
    <div>
      <h5 className={styles['section-title']} style={AppTheme.styles.largerOffsetBackground}>{title}</h5>
      <Row className={styles['section-container']}>
        {children}
      </Row>
    </div>
  );
}
