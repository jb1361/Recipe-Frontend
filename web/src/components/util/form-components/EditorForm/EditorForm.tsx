import {Formik, FormikProps, setNestedObjectValues} from 'formik';
import {Form} from 'react-bootstrap';
import {FormHeader} from '../FormHeader/FormHeader';
import React, {ReactNode} from 'react';
import {ObjectSchema} from 'yup';
import {CenteredSpinner} from '../../widgets/CenteredSpinner/CenteredSpinner';
import {CenteredErrorMessage} from '../../widgets/CenteredErrorMessage/CenteredErrorMessage';
import {delay} from '../../../../common/util';
import {StandardEditorState} from './hooks';
import {ConfirmationDialog} from '../../ConfirmationDialog/ConfirmationDialog';
import {RedErrorMessage} from '../RedErrorMessage/RedErrorMessage';
import {FormikErrors} from 'formik/dist/types';

interface Props<T extends object> {
  standardEditor: StandardEditorState<T>;
  schema?: ObjectSchema<T> | (() => ObjectSchema<T>);
  children: (formik: FormikProps<T>) => ReactNode;
  renderAfterForm?: (formik: FormikProps<T>) => ReactNode;
  touchFormOnLoad?: boolean;
  validateOnMount?: boolean;
  validate?: (values: T) => void | object | Promise<FormikErrors<T>>;
}

export function EditorForm<T extends object>({standardEditor, schema, children, renderAfterForm, touchFormOnLoad, validateOnMount, validate}: Props<T>) {
  const {
    initialValues, editable, isNew, saving, onEdit, onCancel, errorMessage,
    redirectUrl, title, onSave, loading, criticalErrorMessage, performFormTouch,
    setPerformFormTouch, performFormReset, setPerformFormReset, onFormReset,
    onClone, onCloneUrl, setRedirectUrl, newUrl, onDelete, isDeleting, setIsDeleting
  } = standardEditor;
  if (loading) {
    return <CenteredSpinner/>;
  }
  if (criticalErrorMessage) {
    return <CenteredErrorMessage message={criticalErrorMessage}/>;
  }
  if (initialValues === undefined) {
    return null;
  }
  return (
    <Formik<T>
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSave}
      validate={validate}
      validationSchema={schema}
      validateOnMount={validateOnMount}
    >
      {(formik) => {
        const {handleSubmit, values, setTouched, setFieldValue, submitCount, errors} = formik as FormikProps<any>;
        if (touchFormOnLoad && performFormTouch) {
          setPerformFormTouch(false);
          // calling setTouched immediately causes an immediate rerender of only this closure meaning the scope will be outdated.
          // if we trigger a rerender asynchronously then the scope will update with the new value of performFormTouch
          delay(10).then(() => setTouched(setNestedObjectValues(values, true)));
        }
        if (onFormReset !== undefined && performFormReset) {
          setPerformFormReset(false);
          delay(10).then(() => onFormReset(setFieldValue));
        }
        return (
          <>
            <Form onSubmit={handleSubmit}>
              <FormHeader
                title={title}
                editable={editable}
                isNew={isNew}
                saving={saving}
                onCancel={onCancel}
                onEdit={onEdit}
                onClone={onClone ? () => {
                  onClone!(values).then(() => setRedirectUrl(onCloneUrl ? onCloneUrl : newUrl));
                } : undefined}
                onDelete={onDelete ? () => {
                  setIsDeleting(true);
                } : undefined}
                errorMessage={errorMessage}
                redirectUrl={redirectUrl}
              />
              {isDeleting && (
                <ConfirmationDialog
                  onAccept={async () => {
                    const url = await onDelete!();
                    setRedirectUrl(url);
                    setIsDeleting(false);
                  }}
                  onDecline={async () => { setIsDeleting(false); }}
                  open={isDeleting}
                  prompt='Are you sure you want to delete this?'
                  positiveText='Yes'
                  negativeText='No'
                  positiveVariant='danger'
                />
              )}
              {Object.keys(errors).length > 0 && submitCount > 0  && (
                <RedErrorMessage
                  name={''}
                  style={{fontSize: 16, textAlign: 'center', marginBottom: '2rem'}}
                  genericMessage='There are errors in the form. Please check the form for red error messages'
                />
              )}
              {children(formik)}
            </Form>
            {renderAfterForm ? renderAfterForm(formik) : null}
          </>
        );
      }}
    </Formik>
  );
}
