import {RouteComponentProps} from 'react-router';
import {FormikHelpers} from 'formik';
import {useEffect, useState} from 'react';
import {handleAxiosError} from '../../../../common/util/http';
import {FormikSetFieldValue, SetStateFunctional} from '../../../../util';
import {propertyOf} from '../../../../common/util/object';

export type StandardEditorProps = {} & RouteComponentProps;

export type ApplySEModifications<T> = (state: StandardEditorCoreState<T>) => StandardEditorChanges<T>;

export interface StandardEditorCoreState<T> extends StandardEditorOverridableProperties {
  title: string;
  initialValues: T;
  setInitialValues: SetStateFunctional<T>;
  errorMessage?: string;
  setErrorMessage: SetStateFunctional<string | undefined>;
  saving: boolean;
  setSaving: SetStateFunctional<boolean>;
  redirectUrl: string | undefined;
  setRedirectUrl: SetStateFunctional<string | undefined>;
  editable: boolean;
  path: string;
  getFieldName: (name: keyof T) => keyof T;
  route: RouteComponentProps<any>;
  criticalErrorMessage: string | undefined;
  setCriticalErrorMessage: SetStateFunctional<string | undefined>;
  loading: boolean;
  setLoading: SetStateFunctional<boolean>;
  performFormTouch: boolean;
  setPerformFormTouch: SetStateFunctional<boolean>;
  performFormReset: boolean;
  setPerformFormReset: SetStateFunctional<boolean>;
  onFormReset?: (setFieldValue: FormikSetFieldValue) => Promise<void>;
  newUrl?: string;
  onClone?: (values: T) => Promise<void>;
  onCloneUrl?: string;
  // returns the url to redirect to
  onDelete?: () => Promise<string>;
  isDeleting: boolean;
  setIsDeleting: SetStateFunctional<boolean>;
}

export interface StandardEditorOverridableProperties {
  isNew: boolean;
  editable: boolean;
}

export type StandardEditorState<T> = StandardEditorCoreState<T> & StandardEditorRequiredChanges<T> & {
  onEdit?: () => void;
  onCancel: () => void;
  onSave: (form: T, {setErrors}: FormikHelpers<T>) => Promise<void>;
  onClone?: (values: T) => Promise<void>;
  onCloneUrl?: string;
};

export type StandardEditorChanges<T> = StandardEditorRequiredChanges<T> & Partial<StandardEditorCoreState<T>>;

export interface StandardEditorRequiredChanges<T> {
  getEditUrl: () => string;
  getCancelUrl: () => string;
  onLoadForm: () => Promise<T>;
  onNewForm: () => Promise<T>;
  saveAndRedirect: (form: T) => Promise<string>;
}

export function useStandardEditor
<T>(title: string, initialValue: T, props: StandardEditorProps, applyChanges: ApplySEModifications<T>): StandardEditorState<T> {
  const {match: {path}} = props;
  const editable = path.indexOf('/edit') !== -1 || path.indexOf('/new') !== -1;
  const isNew = path.indexOf('/new') !== -1;
  const [initialValues, setInitialValues] = useState<T>(initialValue);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [saving, setSaving] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [criticalErrorMessage, setCriticalErrorMessage] = useState<string>();
  const [performFormTouch, setPerformFormTouch] = useState(false);
  const [performFormReset, setPerformFormReset] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const getFieldName = (name: keyof T) => name;
  const state: StandardEditorCoreState<T> = {
    isDeleting, setIsDeleting,
    initialValues, setInitialValues,
    errorMessage, setErrorMessage,
    saving, setSaving,
    redirectUrl, setRedirectUrl,
    criticalErrorMessage, setCriticalErrorMessage,
    performFormTouch, setPerformFormTouch,
    performFormReset, setPerformFormReset,
    loading, setLoading,
    isNew,
    editable,
    path,
    getFieldName,
    route: {
      history: props.history,
      location: props.location,
      match: props.match,
      staticContext: props.staticContext
    },
    title
  };
  const changes = applyChanges(state);
  const onEdit = () => setRedirectUrl(changes.getEditUrl());
  const onCancel = () => setRedirectUrl(changes.getCancelUrl());
  const coreSettings = {
    ...state,
    ...changes,
    onEdit: onEdit,
    onCancel: onCancel,
    onClone: changes.onClone,
    onDelete: changes.onDelete,
    onFormReset: changes.onFormReset
  };

  const onSave = makeOnStandardEditorSave(coreSettings);
  const standardEditor = {
    ...coreSettings,
    onSave
  };
  useOnNavigation(standardEditor);
  return standardEditor;
}

export function useOnNavigation<T>(standardEditor: StandardEditorState<T>) {
  const {
    setRedirectUrl, isNew, setInitialValues, route: {match: {url}}, onNewForm, onLoadForm, editable,
    setCriticalErrorMessage, setLoading, setPerformFormTouch, setPerformFormReset
  } = standardEditor;
  useEffect(() => {
    async function handleNavigation() {
      try {
        setLoading(true);
        setRedirectUrl(undefined);
        setCriticalErrorMessage(undefined);
        if (isNew) {
          setInitialValues(await onNewForm() as any);
          setLoading(false);
          return;
        }
        setInitialValues(await onLoadForm() as any);
        setPerformFormTouch(true);
        setPerformFormReset(true);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setCriticalErrorMessage(handleAxiosError(e));
        // tslint:disable-next-line:no-console
        console.error(e);
      }
    }

    // noinspection JSIgnoredPromiseFromCall
    handleNavigation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNew, url, editable]);
}

export function makeOnStandardEditorSave<T>(standardEditor: StandardEditorCoreState<T> & StandardEditorRequiredChanges<T>) {
  return async (form: T, {setErrors}: FormikHelpers<T>) => {
    const {setSaving, setErrorMessage, setRedirectUrl, saveAndRedirect} = standardEditor;
    try {
      setSaving(true);
      setErrorMessage(undefined);
      setRedirectUrl(await saveAndRedirect(form));
      setSaving(false);
    } catch (e) {
      setSaving(false);
      setErrorMessage(handleAxiosError(e, {}, setErrors));
    }
  };
}
