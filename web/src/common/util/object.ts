export function getMapKeys<K, T>(map: Map<K, T>) {
  const keys = [];
  for (const key of map.keys()) {
    keys.push(key);
  }
  return keys;
}

export function getMapEntries<K, T>(map: Map<K, T>) {
  const entries = [];
  for (const key of map.entries()) {
    entries.push(key);
  }
  return entries;
}

export type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export const propertyOf = <T>(name: keyof T ) => name;
export const exactPropertyOf = <T>() => <P extends keyof T>(name: P): P => name;

export function removePropertyRecursively<T extends (any | any[])>(obj: T, propertyName: string): T {
  if (obj === null || obj === undefined) {
    return obj;
  } else if (Array.isArray(obj)) {
    const newArray = [];
    for (const item of obj) {
      newArray.push(removePropertyRecursively(item, propertyName));
    }
    return newArray as any;
  } else if (typeof obj === 'object') {
    const newObj: any = {};
    for (const key in obj) {
      if (key !== propertyName) {
        newObj[key] = removePropertyRecursively(obj[key], propertyName);
      }
    }
    return newObj;
  } else {
    return obj;
  }
}

export function cloneObjectWithoutProperties(obj: { [key: string]: any }, ...keysToNotInclude: any[]) {
  const target: { [key: string]: any } = {};
  for (const key in obj) {
    if (keysToNotInclude.indexOf(key) >= 0) {
      continue;
    }
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      continue;
    }
    target[key] = obj[key];
  }
  return target;
}

/**
 * Returns undefined if path is not found, gets the property value via a path string
 * @param obj
 * @param fullPath ex. someArray.0.name, in {someArray: [{name: 'hello'}]}
 */
export function deepFind(obj: object, fullPath: string) {
  const paths = fullPath.split('.');
  let current: any = obj;
  for (const path of paths) {
    if (current[path] === undefined) {
      return undefined;
    } else {
      current = current[path];
    }
  }
  return current;
}

/**
 * This function affects performance and should not be called except for debug situations
 * @param obj
 * @param label
 */
export function calculateSize(obj: { [key: string]: any }, label?: string) {
  const keys = Object.keys(obj);
  let output = '';
  output += `Size breakdown of ${label}: ${estimateStringMB(JSON.stringify(obj))} MB\n`;
  const sizes = [];
  for (const key of keys) {
    sizes.push({label: key, size: estimateStringMB(JSON.stringify(obj[key]))});
  }
  sizes
    .sort((s1, s2) => s2.size - s1.size)
    .forEach(size => output += `${size.label}:\t\t${size.size.toFixed(4)} MB\n`);
  // tslint:disable-next-line:no-console
  console.log(output);
}

export function estimateStringMB(str: string) {
  return (str.length / 1000 / 1024);
}

export function isShallowEqual(a: object, b: object) {
  for (const key in a) {
    if (!(key in b) || a[key as keyof typeof a] !== b[key as keyof typeof a]) {
      return false;
    }
  }
  for (const key in b) {
    if (!(key in a) || a[key as keyof typeof a] !== b[key as keyof typeof a]) {
      return false;
    }
  }
  return true;
}

// tslint:disable-next-line:ban-types
function loop<T extends object>(iterated: T, callback: (value: any, idx: string, obj?: object) => void, thisArg?: any) {
  let i;

  if (Array.isArray(iterated)) {
    for (i = 0; i < iterated.length; i++) {
      callback.call(thisArg, iterated[i], String(i), iterated);
    }
  } else {
    for (i in iterated) {
      if (iterated.hasOwnProperty(i)) {
        callback.call(thisArg, (iterated as  any)[i] , i, iterated);
      }
    }
  }
}

export function shallowDiff<T extends object>(base: T, compared: T) {
  const unchanged: string[] = [],
    updated: string[] = [],
    deleted: string[] = [],
    added: string[] = [];

  // Loop through the compared object
  loop(compared, (value, idx) => {
    // To get the added items
    if (!(idx in base)) {
      added.push(idx);

      // The updated items
    } else if (value !== (base as any)[idx]) {
      updated.push(idx);

      // And the unchanged
    } else if (value === (base as any)[idx]) {
      unchanged.push(idx);
    }
  });

  // Loop through the before object
  loop(base, (value, idx) => {
    // To get the deleted items
    if (!(idx in compared)) {
      deleted.push(idx);
    }
  });

  return {
    updated: updated,
    unchanged: unchanged,
    added: added,
    deleted: deleted
  };
}

export const scalarArgsResolver = (...args: Array<string|number|undefined|null>) => args.join('_');
