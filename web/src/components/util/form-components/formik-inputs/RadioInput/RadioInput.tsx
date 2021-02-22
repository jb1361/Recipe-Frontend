import React, {useState} from 'react';
import {Field, FieldProps} from 'formik';
import {Form} from 'react-bootstrap';
import {FormikSetFieldValue} from '../../../../../util';
import uuid from 'uuid';

interface InputProps<T> {
  name: string;
  disabled?: boolean;
  label: string;
  id?: string;
  className?: string;
  onChange?: ((value: T) => void) | ((value: T, setFieldValue: FormikSetFieldValue) => void);
  value: T;
}

export default function RadioInput<T>(props: InputProps<T>) {
  // get a unique id for this specific instance.
  const [id] = useState(uuid());
  return (
    <React.Fragment>
      <Field name={props.name}>
        {(fieldProps: FieldProps) => {
          const {field, form, meta} = fieldProps;
          return (
            <Form.Check
              custom={true}
              type='radio'
              label={props.label}
              id={props.id || `${props.name}${id}`}
              name={props.name}
              isInvalid={meta.touched && Boolean(meta.error)}
              className={props.className}
              checked={field.value === props.value}
              onChange={(e: any) => {
                form.setFieldValue(props.name, props.value, true);
                if (props.onChange) {
                  props.onChange(e.target.value, form.setFieldValue);
                }
              }}
              value={props.value as any}
              disabled={props.disabled}
            />
          );
        }}
      </Field>
    </React.Fragment>
  );
}
