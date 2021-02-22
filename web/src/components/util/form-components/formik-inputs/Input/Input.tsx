import React, {FocusEvent, FormEvent, useEffect, useMemo, useState} from 'react';
import {useField, useFormikContext} from 'formik';
import styles from './Input.module.scss';
import {Form, FormControlProps} from 'react-bootstrap';
import {getFieldValue} from '../../../../../util';
import {RedErrorMessage} from '../../RedErrorMessage/RedErrorMessage';
import { debounce } from 'lodash';

interface InputProps {
  name: string;
  type?: 'number' | 'text' | 'password' | 'email' | 'textarea' | 'color';
  disabled?: boolean;
  rows?: number;
  defaultValue?: any;
  emptyAsNull?: boolean;
  placeholder?: string;
  autoComplete?: string;
  overrideDebouncePeriod?: number;
}

const Input = (props: InputProps) => {
  const {emptyAsNull, name, overrideDebouncePeriod} = props;
  const [field, {value, error, touched}] = useField(name);
  const {setFieldValue} = useFormikContext<any>();
  const fieldOnChange = field.onChange;
  if (!value && props.defaultValue) {
    setFieldValue(name, props.defaultValue, true);
  }
  const [localValue, setLocalValue] = useState('');
  useEffect(() => {
    setLocalValue(getFieldValue(value));
  }, [value]);
  // optimize updates by keeping a local state for fast reflection of user input.
  // after a debounce period, the changes are committed to the entire formik state.
  const onChangeInnerLayer = useMemo(() => debounce((e: FormEvent<FormControlProps>) => {
    if ((e.target as HTMLInputElement).value === '' && emptyAsNull) {
      setFieldValue(name, null, true);
    } else {
      fieldOnChange(e);
    }
  }, overrideDebouncePeriod ?? 1000), [fieldOnChange, setFieldValue, emptyAsNull, name, overrideDebouncePeriod]);
  const onChange = useMemo(() => (e: FormEvent<FormControlProps>) => {
    e.persist();
    setLocalValue(e.currentTarget.value!);
    return onChangeInnerLayer(e);
  }, [onChangeInnerLayer]);
  const onBlur =  useMemo(() => (e: FocusEvent<HTMLInputElement>) => fieldOnChange(e), [fieldOnChange]);
  return (
    <React.Fragment>
      <Form.Control
        as={props.type === 'textarea' ? 'textarea' : 'input'}
        isInvalid={touched && Boolean(error)}
        className={styles['form-inputs']}
        rows={props.rows}
        {...field}
        value={localValue}
        onChange={onChange}
        onBlur={onBlur}
        disabled={props.disabled}
        type={props.type || 'text'}
        placeholder={props.placeholder ? props.placeholder : ''}
        autoComplete={props.autoComplete ? props.autoComplete : 'on'}
      />
      <RedErrorMessage name={props.name}/>
    </React.Fragment>
  );
};

export default Input;
