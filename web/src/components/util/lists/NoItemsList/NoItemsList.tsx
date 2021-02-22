import {Card} from 'react-bootstrap';
import React from 'react';

interface Props {
  label: string;
}

export function NoItemsList({label}: Props) {
  return (
    <Card style={{textAlign: 'center'}}>
      <Card.Body>{label}</Card.Body>
    </Card>
  );
}
