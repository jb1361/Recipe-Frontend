import {
  DropdownOption,
  NullableDropDownOptionValue,
  SearchableDropdown
} from '../../form-components/SearchableDropdown/SearchableDropdown';
import {Col, Form} from 'react-bootstrap';
import {InputIconButton} from '../../widgets/InputIconButton/InputIconButton';
import React, {useState} from 'react';

type NDDOV = NullableDropDownOptionValue;
export type ResetValueFunc = () => void;

export interface CommonListHeaderProps  {
  label: string;
  disableAddButton?: boolean;
  extraDropDown?: any;
}

interface Props<T extends NDDOV> extends CommonListHeaderProps  {
  dropDownOptions: Array<DropdownOption<T>>;

  onAdd: (value: T, resetValue: ResetValueFunc) => void;
}

export function ListHeaderWithDropDown<T extends NDDOV>({label, disableAddButton, dropDownOptions, onAdd, extraDropDown}: Props<T>) {
  const [dropDownValue, setDropDownValue] = useState<T>();
  return (
    <Form.Row style={{paddingTop: '2rem'}}>
      <Form.Label column={true} sm={extraDropDown ? 6 : 8} style={{marginBottom: 20}}>{label}</Form.Label>
      {!disableAddButton && (
        <>
          {extraDropDown && <Col sm={3}>{extraDropDown}</Col>}
          <Col sm={extraDropDown ? 3 : 4}>
            <InputIconButton
              inputComponent={<SearchableDropdown
                value={dropDownOptions.find(o => o.value === dropDownValue) ?? null}
                isClearable={true}
                dropdownData={dropDownOptions}
                onSelect={(v) => setDropDownValue(v)}
              />}
              icon='plus-circle'
              iconToolTip='Add Data Point'
              onClick={() => dropDownValue !== undefined ? onAdd(dropDownValue!, () => setDropDownValue(undefined)) : null}
            />
          </Col>
        </>)}
    </Form.Row>
  );
}
