import {Form} from 'react-bootstrap';
import React, {CSSProperties, useState} from 'react';
import uuid from 'uuid';

interface InputProps {
  disabled?: boolean;
  label: string;
  id?: string;
  className?: string;
  onChange: (value: boolean) => void;
  value: boolean;
  style?: CSSProperties;
}

export function CheckBox({id, label, onChange, value, disabled, className, style}: InputProps) {
  const [genId] = useState(uuid());
  return (
    <Form.Check
      className={className}
      custom={true}
      type='checkbox'
      label={label}
      style={style}
      id={`${id ?? 'checkbox'}-${genId}`}
      checked={value}
      onChange={() => onChange(!value)}
      disabled={disabled}
    />
  );
}
