import React, {CSSProperties, useState} from 'react';
import {ErrorMessage, Field, FieldProps} from 'formik';
import styles from './CheckBoxInput.module.scss';
import {Form} from 'react-bootstrap';
import {combineClasses, FormikSetFieldValue, getFieldCheckValue} from '../../../../../util';
import uuid from 'uuid';

interface InputProps {
  name: string;
  disabled?: boolean;
  type?: 'checkbox' | 'radio';
  label: string;
  id?: string;
  className?: string;
  onChange?: ((value: boolean) => void) | ((value: boolean, setFieldValue: FormikSetFieldValue) => void);
  value?: any;
  style?: CSSProperties;
}

const CheckBoxInput = (props: InputProps) => {
  // get a unique id for this specific instance.
  const [id] = useState(uuid());
  return (
    <React.Fragment>
      <Field name={props.name}>
        {(fieldProps: FieldProps) => {
          const {field, form, meta} = fieldProps;
          return (
            <Form.Check
              style={props.style}
              custom={true}
              type={props.type || 'checkbox'}
              label={props.label}
              id={props.id || `${props.name}${id}`}
              isInvalid={meta.touched && Boolean(meta.error)}
              className={combineClasses(props.className, styles['check-box-input'])}
              {...field}
              name={props.name}
              checked={getFieldCheckValue(field)}
              onChange={(e: any) => {
                if (props.type !== 'radio') {
                  form.setFieldValue(field.name, e.target.checked, true);
                }
                if (props.onChange) {
                  props.onChange(e.target.checked, form.setFieldValue);
                }
              }}
              value={props.type === 'radio' ? props.value : undefined}
              disabled={props.disabled}
            />
          );
        }}
      </Field>
      <ErrorMessage
        render={msg => <div className={styles['form-errors']}>{msg}</div>}
        name={props.name}
      />
    </React.Fragment>
  );
};

export default CheckBoxInput;
