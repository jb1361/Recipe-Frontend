import React, {useState} from 'react';
import styles from '../Login/Login.module.scss';
import {getLogoLink} from '../../appTheme';
import {LoadingButton} from '../../components/util/widgets/LoadingButton/LoadingButton';
import {isEmailValid} from '../../util';
import {Alert, Image} from 'react-bootstrap';
import {Form, Formik, FormikProps} from 'formik';
import Input from '../../components/util/form-components/formik-inputs/Input/Input';
import {propertyOf} from '../../common/util/object';
import Row from 'react-bootstrap/Row';
import {forgotPassword} from '../../api/authApi';
import {Link} from 'react-router-dom';
import {RoutePaths} from '../../router/RoutePaths';
import {
  getErrorResponseMessage,
  isBadRequest,
  isServerError,
  isUnknownError
} from '../../common/util/http';

interface ResetPasswordForm {
  email: string;
}

function ForgotPassword() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (form: ResetPasswordForm) => {
    setErrorMessage('');
    setSubmitting(true);
    if (!isEmailValid(form.email)) {
      setErrorMessage('Email is invalid');
      setSubmitting(false);
      return;
    }
    try {
      await forgotPassword(form.email);
      setSubmitted(true);
    } catch (e) {
      if (isBadRequest(e)) {
        setErrorMessage(getErrorResponseMessage(e));
        setSubmitting(false);
      } else if (isUnknownError(e) || isServerError(e)) {
        setErrorMessage(isUnknownError(e) ? 'Could not make a connection!' : 'A server error has occurred');
        setSubmitting(false);
      }
    }
  };

  return (
    <div className={styles['login-page']}>
      <div className={styles['logo']}>
        <Image alt='Isco Logo' src={getLogoLink()}/>
      </div>
      <div className={styles['login-form']}>
      {!submitted ? (
        <Formik<ResetPasswordForm>
          enableReinitialize={true}
          onSubmit={onSubmit}
          initialValues={{email: ''} as ResetPasswordForm}
        >
          {(formik: FormikProps<ResetPasswordForm>) => {
            const {handleSubmit} = formik;
            return (
              <Form onSubmit={handleSubmit}>
                <Input name={propertyOf<ResetPasswordForm>('email')} disabled={submitting} placeholder={'Email Address'}/>
                <Row className={styles['login-button']}>
                  <LoadingButton type='submit' loading={submitting} label='Submit'/>
                </Row>
                {errorMessage ?
                  <Alert style={{marginTop: '1rem'}} variant='danger'>{errorMessage}</Alert> : null}
              </Form>
            );
          }}
        </Formik>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <label>If an account with that email address exists you will see a password reset email shortly.</label>
          <div className={styles['forgot-password']}>
            <Link to={RoutePaths.login}>Return to Login</Link>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default ForgotPassword;
