import React, {CSSProperties, FunctionComponent} from 'react';
import {Col, Form, Row} from 'react-bootstrap';

interface Props {
  label: string;
  columnSize?: number;
  labelSize?: number;
  hidden?: boolean;
  style?: CSSProperties;
  hintText?: string;
}

export const InputRow: FunctionComponent<Props> = ({columnSize, labelSize, hidden, label, children, style, hintText}) => {
  return (
    <Form.Group as={Row} hidden={hidden} style={style}>
      <Form.Label column={true} sm={labelSize || 2}>{label}</Form.Label>
      <Col sm={columnSize || 4}>
        {children}
      </Col>
      {!!hintText &&
        <Col sm={6}>
          <span>{hintText}</span>
        </Col>
      }
    </Form.Group>
  );
};
