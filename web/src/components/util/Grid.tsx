import {Row} from 'react-bootstrap';
import {GirdItemProps, GridItem} from './GridItem';
import React from 'react';
import {ColProps} from 'react-bootstrap/Col';

type GridProps = {
  items?: GirdItemProps[];
  noItemsText: string;
} & ColProps;

export function Grid({items, noItemsText, ...colProps}: GridProps) {
  return (
    <Row style={{marginTop: '1rem'}}>
      {!items || items.length === 0 ? noItemsText :
        items.map((item, i) => <GridItem key={i} {...colProps} {...item} />)
      }
    </Row>
  );
}
