import React, {useEffect, useMemo} from 'react';
import {ErrorMessage, Field, FieldProps} from 'formik';
import styles from '../Input/Input.module.scss';
import {
  DropdownOption,
  DropDownOptionValue,
  SearchableDropdown
} from '../../SearchableDropdown/SearchableDropdown';
import {FormikSetFieldTouched, FormikSetFieldValue} from '../../../../../util';
import {typedMemo} from '../../../../../util/react-util';

type OnSelect<T> = ((name: string, selectedValue: T) => void) |
  ((name: string, selectedValue: T, setFieldValue: FormikSetFieldValue) => void);

export interface DropdownInputProps<Value extends DropDownOptionValue> {
  name: string;
  dropdownData: Array<DropdownOption<Value>>;
  onSelect?: OnSelect<Value>;
  isClearable?: boolean;
  disabled?: boolean;
  defaultToFirstOption?: boolean;
  defaultToFirstOptionIfOnlyOneOption?: boolean;
  placeholder?: string;
}

const isNotSelected = (value: any) => (value === '' || value === null || value === undefined);
const isNotSelectedAndOptionsAvailable = (value: any, options: any[]) =>
  (!valueInOptions(value, options)) && options && options.length > 0;

const valueInOptions = (value: any, options: DropdownOption[]) => {
  if (!options) {
    return true;
  }
  return options.map(o => o.value).includes(value);
};

export const DropdownInput = <Value extends DropDownOptionValue>(props: DropdownInputProps<Value>) => {
  const {
    name, disabled, dropdownData, defaultToFirstOption,
    defaultToFirstOptionIfOnlyOneOption, isClearable, onSelect
  } = props;
  return (

    <React.Fragment>
      <Field name={props.name}>
        {({meta, form}: FieldProps) => {
          const {setFieldValue, setFieldTouched} = form;
          return (
            <InnerDropDownInput
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              disabled={!!disabled}
              dropdownData={dropdownData}
              name={name}
              value={meta.value}
              touched={meta.touched}
              error={!!meta.error}
              isClearable={!!isClearable}
              onSelect={onSelect}
              placeholder={props.placeholder}
              defaultToFirstOptionIfOnlyOneOption={!!defaultToFirstOptionIfOnlyOneOption}
              defaultToFirstOption={!!defaultToFirstOption}
            />
          );
        }
        }
      </Field>
      <ErrorMessage
        render={msg => <div className={styles['form-errors']}>{msg}</div>}
        name={props.name}
      />
    </React.Fragment>
  );
};

type InnerDropDownInputProps<Value extends DropDownOptionValue> = {
  touched: boolean;
  error: boolean;
  disabled: boolean;
  isClearable: boolean;
  setFieldValue: FormikSetFieldValue;
  setFieldTouched: FormikSetFieldTouched;
  dropdownData: Array<DropdownOption<Value>>;
  name: string;
  onSelect?: OnSelect<Value>;
  value: any;
  defaultToFirstOptionIfOnlyOneOption: boolean;
  defaultToFirstOption: boolean;
  placeholder?: string;
};

const InnerDropDownInput = typedMemo(<Value extends DropDownOptionValue>(props: InnerDropDownInputProps<Value>) => {
  const {
    name, disabled, error, isClearable, setFieldValue: setFieldValueFormik,
    setFieldTouched, touched, dropdownData, onSelect: onSelectFromProps, value,
    defaultToFirstOptionIfOnlyOneOption, defaultToFirstOption
  } = props;

  useEffect(() => {
    if (isNotSelectedAndOptionsAvailable(value, dropdownData) && (defaultToFirstOption ||
      (defaultToFirstOptionIfOnlyOneOption && dropdownData.length === 1))) {
      setFieldValueFormik(name, dropdownData[0].value);
    }
  }, [setFieldValueFormik, value, dropdownData, defaultToFirstOption, defaultToFirstOptionIfOnlyOneOption, name]);

  const setFieldValue: FormikSetFieldValue = useMemo(() => (nameParam: string, valueParam: any, shouldValidate?: boolean) => {
    setFieldValueFormik(nameParam, valueParam, shouldValidate);
    setTimeout(() => { setFieldTouched(nameParam, true, true); }, 1);
  }, [setFieldValueFormik, setFieldTouched]);

  const onSelect = useMemo(() => (selectedValue: Value) => {
    setFieldValue(name, !isNotSelected(selectedValue) ? selectedValue : '', true);
    // I had to do a setTimout order to prevent validation from running on the last value
    setTimeout(() => { setFieldTouched(name); }, 1);
    if (onSelectFromProps) {
      onSelectFromProps(name, !isNotSelected(selectedValue) ? selectedValue : null as any, setFieldValue);
    }
  }, [name, setFieldTouched, setFieldValue, onSelectFromProps]);
  return (
    <SearchableDropdown
      className={touched && !error ? 'valid-input' : 'invalid-input'}
      isValid={touched && !error}
      isInvalid={touched && Boolean(error)}
      disabled={disabled}
      isClearable={isClearable || false}
      dropdownData={dropdownData}
      onSelect={onSelect}
      placeholder={props.placeholder}
      value={
        /* eslint-disable eqeqeq */
        /* tslint:disable-next-line:triple-equals */
        !isNotSelected(value) ? dropdownData.find(o => o.value == value) || null : null
      }
    />
  );
});
