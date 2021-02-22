import {DropdownOption} from '../../components/util/form-components/SearchableDropdown/SearchableDropdown';
import {DateTime} from 'luxon';
import {HasName} from '../types/HasName';
import {HasId} from '../types/Entity';

export function convertDictionaryToArray<T>(obj: {[key: number]: T}) {
  return Object.values(obj);
}

export function convertArrayToDictionary<T>(arr: T[], key: keyof T): {[key: number]: T} {
  const obj: any = {};
  for (const item of arr) {
    obj[(item as any)[key]] = item;
  }
  return obj;
}

export type Dictionary<TValue> = {[id: number]: TValue};

export function convertToDropDownOptions<T extends string|number = number>(
  objs: Array<{[key: string]: any}>,
  labelProperty: string = 'name',
  valueProperty: string = 'id'): Array<DropdownOption<T>> {
  return objs.map(obj => convertObjectToOption<T>(obj, labelProperty, valueProperty));
}

export function convertObjectToOption<T extends string|number>(
  obj: {[key: string]: any},
  labelProperty: string = 'name',
  valueProperty: string = 'id'): DropdownOption<T> {
  return ({value: obj[valueProperty], label: obj[labelProperty]});
}

export function convertToDropDownOptionByPredicate<T extends object, V extends number | string>(
  objs: T[],
  getLabel: (i: T) => string,
  getValue: ((i: T) => V)
): Array<DropdownOption<V>> {
  return objs.map(obj => ({label: getLabel(obj), value: getValue(obj)}));
}

export function convertArrayToDropDownOptions<T>(objs: T[], hideValues?: T[]): Array<DropdownOption<T>> {
   return objs.map(obj => ({value: obj, label: obj as any as string, hide: hideValues ? hideValues.some(h => h === obj) : false}) as DropdownOption<T>);
}

export function getObjectValues<T extends Record<keyof T, any>>(obj: T): Array<T[keyof T]> {
  return Object.keys(obj).map<T[keyof T]>(key => obj[key as keyof T]);
}

export function getEnumValues<T extends Record<keyof T, any>>(obj: T): string[] {
  return getObjectValues(obj);
}

export function groupBy<T, V>(list: T[], keyGetter: (type: T) => V): Map<V, T[]> {
  const map = new Map();
  list.forEach((item: any) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

export function nullable<T>(value: T | null): T | undefined {
  if (value) {
    return value;
  }
  return undefined;
}

export function replaceAtIndex<T>(arr: T[], index: number, value: T) {
  return [
    ...arr.slice(0, index),
    value,
    ...arr.slice(index + 1)
  ];
}

export function getLocalDateTimeString(dateTime: string)  {
  return DateTime.fromISO(dateTime.replace('Z', '') + '+00:00').toLocaleString(DateTime.DATETIME_MED);
}

export const ipv4AddressRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;

export function range(start: number, end: number) {
  const arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
}

export function delay(timeout: number): Promise<void> {
  return new Promise(resolve => setTimeout(() => resolve(), timeout));
}

export function distinct<T>(value: T, index: number, self: T[]) {
  return self.indexOf(value) === index;
}

/**
 * Casts a constant value to a specific type.
 * Performs strict type check vs saying value as T performs a cast regardless if the value is a valid value of T
 */
export function cast<T>(value: T): T {
  return value;
}

export function isNull(v: any) {
  return v === null;
}

/**
 * Converts seconds to milliseconds
 * @param numSeconds
 */
export function seconds(numSeconds: number) {
  return numSeconds * 1000;
}

export const byName = (c1: HasName, c2: HasName) => c1.name.localeCompare(c2.name);
export const mapId = (i: HasId) => i.id;
export const mapIdStr = (i: HasId) => String(mapId(i));

export function optionalCall<T extends ((...args: any[]) => any)>(m: T |  undefined): T {
  if (m) {
    return m;
  }
  return (() => null) as T;
}

export function isEmptyOrWhiteSpace(str: string | undefined | null) {
  return str === undefined || str === null || str.match(/^ *$/) !== null;
}

/**
 * Check whether the value equals null or does not equal null in one call.
 * This is helpful for short filter statements
 * examples:
 * getNullEquality(true, null) -> true // equals null and should
 * getNullEquality(false, null) -> false // does equal null but shouldn't
 * getNullEquality(true, 'hi') -> false // does not equal null but should
 * getNullEquality(false, 'hi') -> true // Check whet
 * @param equalsNull
 * @param value
 */
export function getNullEquality(equalsNull: boolean, value: any) {
  return !equalsNull ? value !== null : value === null;
}

export function optional<T extends Record<string, unknown>>(
  bool: any,
  val: T
): Record<string, unknown> {
  return bool ? val : {};
}

/**
 * Disables warnings about not awaiting a promise if the intention is to not await it.
 * @param func
 */
export function runPromiseInBackground(func: () => Promise<any>) {
  func().then(() => null);
}
