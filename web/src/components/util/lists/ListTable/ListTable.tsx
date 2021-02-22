import {Col, Form} from 'react-bootstrap';
import React, {CSSProperties} from 'react';
import {NoItemsList} from '../NoItemsList/NoItemsList';

interface Props<T> {
  items: T[];
  renderHeader?: () => JSX.Element;
  renderFooter?: () => JSX.Element;
  renderItem: (item: T, index: number) => JSX.Element;
  noItemsLabel: string;
  style?: CSSProperties;
}

export function ListTable<T>({items, renderHeader, renderFooter, renderItem, noItemsLabel, style}: Props<T>) {
  return (
    <>
      {renderHeader && renderHeader()}
      <Form.Row style={style}>
        <Col>
          {
            items.length === 0 ? <NoItemsList label={noItemsLabel} /> :
              items.map((item, index) => (<React.Fragment key={index}>{renderItem(item, index)}</React.Fragment>))
          }
        </Col>
      </Form.Row>
      {renderFooter && renderFooter()}
    </>
  );
}
