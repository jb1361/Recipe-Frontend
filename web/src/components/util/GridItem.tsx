import {LinkedCenteredCard} from './LinkedCenteredCard/LinkedCenteredCard';
import {Card, Col} from 'react-bootstrap';
import React from 'react';
import {Indicator} from './widgets/Indicator/Indicator';
import {ColProps} from 'react-bootstrap/Col';

export type GirdItemProps = {
  title: string;
  link: string;
} & ColProps;

export function GridItem({title, link, xs, lg, md, sm, xl}: GirdItemProps) {
  return (
    <Col xl={xl ?? 2}  lg={lg ?? 3} md={md ?? 4} sm={sm} xs={xs ?? 6} style={{marginBottom: '1rem', textAlign: 'center'}}>
      <LinkedCenteredCard link={link}>
        <Col xs={2}><Indicator color='green'/></Col>
        <Col xs={10}> <Card.Title>{title}</Card.Title></Col>
      </LinkedCenteredCard>
    </Col>
  );
}
