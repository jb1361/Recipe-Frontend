export interface PropsWithPrefix {
  // the field name prefix
  prefix: string;
}

export interface EditableProps {
  editable: boolean;
}

export type EditablePropsWithPrefix = PropsWithPrefix & EditableProps;
