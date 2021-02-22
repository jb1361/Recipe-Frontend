
export type ConvertToItems<T> = {
  [key: number]: T;
};

export type ValueOf<T> = T[keyof T];

export const isOfType = <T>(
  varToBeChecked: any,
  propertyToCheckFor: keyof T
): varToBeChecked is T =>
  (varToBeChecked as T)[propertyToCheckFor] !== undefined;
