import styles from './CenteredSpinner.module.scss';
import {Spinner} from 'react-bootstrap';
import React from 'react';

export function CenteredSpinner() {
  return (
    <div className={styles['centered-spinner']}>
      <Spinner animation='border' role='status'>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </div>
  );
}
