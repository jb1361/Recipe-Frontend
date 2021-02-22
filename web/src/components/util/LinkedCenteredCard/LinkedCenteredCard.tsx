import {Link} from 'react-router-dom';
import {Card} from 'react-bootstrap';
import React from 'react';
import styles from './LinkedCenteredCard.module.scss';

export function LinkedCenteredCard(props: {link: string; linkState?: object; children: any}) {
  return (
    <Link
      className={styles['linked-card']}
      to={{
        pathname: props.link,
        state: props.linkState
      }}
    >
      <Card className={styles['card']}>
        <Card.Body className={styles['card-body']}>
          {props.children}
        </Card.Body>
      </Card>
    </Link>
  );
}
