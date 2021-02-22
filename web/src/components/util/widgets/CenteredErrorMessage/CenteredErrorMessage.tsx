import styles from './CenteredErrorMessage.module.scss';
import {Alert} from 'react-bootstrap';
import React from 'react';

export function CenteredErrorMessage(props: {message: string}) {
  return (
    <div className={styles['centered-error']}>
      <Alert variant='danger'>{props.message}</Alert>
    </div>
  );
}
