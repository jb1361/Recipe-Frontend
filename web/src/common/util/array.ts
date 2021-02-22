
export const emptyArray = [];

export const makeReduceToDictionary = <T, K extends keyof any, V>(getKey: (val: T) => K, getVal: (val: T) => V) => (dictionary: Record<K, V>, item: T) =>
  ({...dictionary, [getKey(item)]: getVal(item)});

export const reduceToDictionary = <T, K extends keyof any, V>(values: T[], getKey: (val: T) => K, getVal: (val: T) => V) =>
  values.reduce<Record<K, V>>(makeReduceToDictionary(getKey, getVal), {} as Record<K, V>);
