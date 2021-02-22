import React, {useMemo} from 'react';
import Select, {components} from 'react-select';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ValueType} from 'react-select/src/types';
import {AppTheme} from '../../../../appTheme';
import {combineClasses} from '../../../../util';
import styles from './SearchableDropDown.module.scss';
import {typedMemo} from '../../../../util/react-util';

export interface DropdownOption<Value extends NullableDropDownOptionValue = DropDownOptionValue> {
  value: Value;
  label: string;
  hide?: boolean;
}

export type DropDownOptionValue<T = any> = T | string | number | boolean;
export type NullableDropDownOptionValue<T = any> = DropDownOptionValue<T> | null;

interface Props<Value extends NullableDropDownOptionValue> {
  dropdownData: Array<DropdownOption<Value>>;
  defaultValue?: DropdownOption<Value>;
  disabled?: boolean;
  isClearable?: boolean;
  isValid?: boolean;
  isInvalid?: boolean;
  onSelect?: (selectedValue: Value) => void;
  value?: DropdownOption<Value> | null;
  className?: string;
  nonFormikError?: string;
  placeholder?: string;
}

const DropdownIndicator = (props: any) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <FontAwesomeIcon icon={'search'}/>
      </components.DropdownIndicator>
    )
  );
};

export const SearchableDropdown = typedMemo(<Value extends NullableDropDownOptionValue>(props: Props<Value>) => {
  const {onSelect, dropdownData, defaultValue, disabled} = props;
  const className = combineClasses(props.className, styles['dropdown'], props.isValid ? '-valid' : '-invalid');

  const handleChange = useMemo(() => (selectedOption: ValueType<DropdownOption<Value>>) => {
    if (onSelect) {
      const option = (selectedOption as DropdownOption<Value>);
      const value = option ? option.value : null as unknown as Value;
      onSelect(value);
    }
  }, [onSelect]);

  return (
    <>
      <Select
        className={className}
        errorText={props.isInvalid}
        components={{DropdownIndicator}}
        value={props.value}
        onChange={handleChange}
        options={dropdownData.filter(d => d.hide !== true)}
        defaultValue={defaultValue}
        isDisabled={disabled}
        placeholder={props.placeholder}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            text: 'orangered',
            primary25: AppTheme.colors.gray400,
            primary: AppTheme.colors.primary
          }
        })}
        maxMenuHeight={150}
        isClearable={props.isClearable || false}
      />
      {props.nonFormikError ?  <div className={'Input_form-errors__1w0oO'}>{props.nonFormikError}</div> : null}
    </>
  );
});
