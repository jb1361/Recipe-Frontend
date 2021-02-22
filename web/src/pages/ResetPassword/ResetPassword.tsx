import React, {useState} from 'react';
import styles from '../Login/Login.module.scss';
import {getLogoLink} from '../../appTheme';
import {LoadingButton} from '../../components/util/widgets/LoadingButton/LoadingButton';
import {Alert, Image} from 'react-bootstrap';
import {Form, Formik, FormikProps} from 'formik';
import Input from '../../components/util/form-components/formik-inputs/Input/Input';
import {propertyOf} from '../../common/util/object';
import Row from 'react-bootstrap/Row';
import {Link, Redirect} from 'react-router-dom';
import {RoutePaths} from '../../router/RoutePaths';
import {RouteComponentProps} from 'react-router';
import {PasswordResetRequest, resetPassword, validateToken} from '../../api/authApi';
import {getErrorResponseMessage, isBadRequest} from '../../common/util/http';
import {CenteredSpinner} from '../../components/util/widgets/CenteredSpinner/CenteredSpinner';
import {useMount} from '../../hooks/useMount';

interface PasswordResetRequestForm {
  password: string;
  confirmPassword: string;
}

type Props = RouteComponentProps<{email: string; token: string}>;

function ResetPassword(props: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const params = new URLSearchParams(props.location.search);
  const resetRequest = {email: params.get('email'), passwordResetToken: params.get('token'), password: '', confirmPassword: ''} as PasswordResetRequest;

  useMount(() => {
    async function isTokenValid(token: string) {
      try {
        await validateToken(token);
      } catch (e) {
        if (isBadRequest(e)) {
          setRedirectUrl(RoutePaths.login);
        }
      }
      setLoading(false);
    }
    isTokenValid(resetRequest.passwordResetToken);
  });

  const onSubmit = async (form: PasswordResetRequestForm) => {
    if (form.password !== form.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    setSubmitting(true);
    resetRequest.password = form.password;
    resetRequest.confirmPassword = form.confirmPassword;
    try {
      await resetPassword(resetRequest);
    } catch (e) {
      if (isBadRequest(e)) {
        setErrorMessage(getErrorResponseMessage(e));
        setSubmitting(false);
        return;
      }
    }
    setSubmitted(true);
  };

  const renderRedirect = () => {
    if (redirectUrl.length !== 0) {
      return <Redirect to={redirectUrl} />;
    }
    return null;
  };

  const renderContent = () => {
    return (
      <div className={styles['login-page']}>
        {renderRedirect()}
        <div className={styles['logo']}>
          <Image alt='Isco Logo' src={getLogoLink()}/>
        </div>
        <div className={styles['login-form']}>
          {!submitted ? (
            <Formik<PasswordResetRequestForm>
              enableReinitialize={true}
              onSubmit={onSubmit}
              initialValues={{password: '', confirmPassword: ''} as PasswordResetRequestForm}
            >
              {(formik: FormikProps<PasswordResetRequestForm>) => {
                const {handleSubmit} = formik;
                return (
                  <Form onSubmit={handleSubmit}>
                    <div style={{marginBottom: '10px'}}>
                      <Input
                        name={propertyOf<PasswordResetRequestForm>('password')}
                        disabled={submitting}
                        placeholder={'Password'}
                        type={'password'}
                        overrideDebouncePeriod={1}
                      />
                    </div>
                    <Input
                      name={propertyOf<PasswordResetRequestForm>('confirmPassword')}
                      disabled={submitting}
                      placeholder={'Confirm Password'}
                      type={'password'}
                      overrideDebouncePeriod={1}
                    />
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
              <label>Your Password has been Reset.</label>
              <div className={styles['forgot-password']}>
                <Link to={RoutePaths.login}>Return to Login</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {loading ?  <CenteredSpinner/> : renderContent()}
    </>
  );
}

export default ResetPassword;
