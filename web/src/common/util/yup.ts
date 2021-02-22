import {boolean, number, string, StringSchema} from 'yup';
import {getEnumValues} from './index';

export const requiredFk = () => requiredNumber().min(1, 'Required');
export const requiredNumber = () => number().required('Required').typeError('Must be a number');

export const requiredLabel = (minLength: number = 3) => string().required('Required').min(minLength, 'Must at least be 3 characters');

export const requiredString = () => string().required('Required');
export const requiredBool = () => boolean().required('Required');

export const requiredStringEnum = <T extends string>(enumObject: object) => requiredString().oneOf(getEnumValues(enumObject)) as StringSchema<T>;
