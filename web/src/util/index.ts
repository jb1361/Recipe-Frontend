import {Dispatch, FormEvent, SetStateAction} from 'react';
import {FormControl, FormControlProps} from 'react-bootstrap';
import zxcvbn from 'zxcvbn';
import {FieldInputProps} from 'formik';

export function combineClasses(...arr: Array<any|string|undefined|null>): string {
  return arr.filter((val) => !!val).join(' ');
}

export type BootstrapFormEvent = FormEvent<FormControl & FormControlProps>;

export function nullable<T>(value: T | null): T | undefined {
  if (value) {
    return value;
  }
  return undefined;
}

export type Stringify<T> = { [K in keyof T]: string|undefined };

export function isPassValid(password: string) {
  const result = zxcvbn(password);
  return result.score >= 1;
}

export const isEmailValid = (email: string) => {
  return email.length === 0 || /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
};

export function getFieldValue(value: string | null | undefined) {
  if (value === undefined || value === null) {
    return '';
  }
  return value;
}

export function getFieldCheckValue<T>(field: FieldInputProps<T>) {
  if (field.value === undefined || field.value === null) {
    return false;
  }
  return field.value;
}

export type FormikSetFieldValue<T = string> = (field: T, value: any, shouldValidate?: boolean) => void;
export type FormikSetFieldTouched<T = string> = (field: T & string, isTouched?: boolean, shouldValidate?: boolean) => void;

export type Complete<T> = {
  [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>> ? T[P] : (T[P]);
};

export type NonNullableObject<T> = {
  [P in keyof T]: NonNullable<T[P]>
};

export type SetStateFunctional<S> = Dispatch<SetStateAction<S>>;

export function pipeLog<T>(value: T, extra?: any): T {
  const extraParams = [];
  if (extra) {
    extraParams.push(extra);
  }
  // tslint:disable-next-line:no-console
  console.log(value, ...extraParams);
  return value;
}

export const toMutable = <T>(val: readonly T[]) => val as T[];

export const nodeListToArray = (nodeList: NodeList | HTMLCollection) => [].slice.call(nodeList) as HTMLElement[];

export type EnumValues<T> = T[keyof T];
