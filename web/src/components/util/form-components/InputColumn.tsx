import React, {CSSProperties, FunctionComponent} from 'react';
import {Col, Form} from 'react-bootstrap';

interface Props {
  label: string;
  columnSize?: number;
  hidden?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const InputColumn: FunctionComponent<Props> = ({columnSize, className, hidden, label, children, style}) => {
  const labelColor = React.Children.map(children, (element: any) => {
    if (element.props.editable !== undefined) {
      return !element.props.editable ? 'gray' : 'unset';
    } else if (element.props.disabled !== undefined) {
      return element.props.disabled ? 'gray' : 'unset';
    } else {
      return 'unset';
    }
  });
  return (
    <Form.Group as={Col} sm={columnSize} hidden={hidden} className={className} style={style}>
      <Form.Label column={false} style={{fontSize: 14, color: labelColor[0]}}>{label}</Form.Label>
      {children}
    </Form.Group>
  );
};

interface VerticalInputProps {
  label: string;
  hidden?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const VerticalInput: FunctionComponent<VerticalInputProps> = ({className, hidden, label, children, style}) => {
  return (
    <Form.Group hidden={hidden} className={className} style={style}>
      <Form.Label column={false} style={{fontSize: 14}}>{label}</Form.Label>
      {children}
    </Form.Group>
  );
};
