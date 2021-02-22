import React, {FormEvent} from 'react';
import styles from './Login.module.scss';
import {Alert, Form, Image} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import {
  BootstrapFormEvent,
  isEmailValid
} from '../../util';
import {isAuthenticated, userStore, UserWithToken} from '../../common/redux/entities/user';
import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';
import {RoutePaths} from '../../router/RoutePaths';
import {AxiosResponse} from 'axios';
import {WebState} from '../../redux/types/WebState';
import {LoadingButton} from '../../components/util/widgets/LoadingButton/LoadingButton';
import {
  ErrorResponse,
  getErrorResponseMessage,
  getResponseData, isBadRequest,
  isServerError,
  isUnknownError
} from '../../common/util/http';
import {getLogoLink} from '../../appTheme';
import {login} from '../../api/authApi';

interface LoginForm {
  email: string;
  password: string;
}

export type UserErrorResponse = ErrorResponse<LoginForm>;

interface LoginPageState {
  redirectUrl: string;
  errorMessage: string;
  submitted: boolean;
  emailTouched: boolean;
  submitting: boolean;
  form: LoginForm;
  errors?: UserErrorResponse;
}

type LoginProps = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;

class Login extends React.Component<LoginProps, LoginPageState> {
  state: LoginPageState = {
    redirectUrl: '',
    errorMessage: '',
    submitted: false,
    submitting: false,
    emailTouched: false,
    form: {
      email: '',
      password: ''
    }
  };

  componentDidMount(): void {
    if (this.props.authenticated) {
      this.setState({redirectUrl: RoutePaths.home});
    }
  }

  onInputChange = (event: BootstrapFormEvent) => {
    const input: HTMLInputElement = event.currentTarget as unknown as HTMLInputElement;
    if (input.name === 'email') {
      this.setState({emailTouched: true});
    }
    this.setState({form: {...this.state.form, [input.name]: event.currentTarget.value}});
  };

  async makeRequest(): Promise<AxiosResponse<UserWithToken>> {
      return await login(this.state.form);
  }

  onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    this.setState({submitted: true});
    this.setState({errorMessage: ''});
    if (!isEmailValid(this.state.form.email)) {
      this.setState({errorMessage: 'Email address not valid.'});
      return;
    }
    if (this.state.form.email.length === 0) {
      this.setState({errorMessage: 'You must enter an email address.'});
      return;
    }
    await this.trySubmit();
  };

  async trySubmit() {
    try {
      this.setState({submitting: true});
      const resp = await this.makeRequest();
      this.props.actions.setCurrentUser(resp.data);
      this.setState({redirectUrl: RoutePaths.home});
    } catch (e) {
      if (isBadRequest(e)) {
        this.setState({errorMessage: getErrorResponseMessage(e), submitting: false, errors: getResponseData(e)});
      } else if (isUnknownError(e) || isServerError(e)) {
        this.setState({errorMessage: isUnknownError(e) ? 'Could not make a connection!' : 'A server error has occurred', submitting: false});
      }
    }
  }

  renderRedirect() {
    if (this.state.redirectUrl.length !== 0) {
      return <Redirect to={this.state.redirectUrl} />;
    }
    return null;
  }

  render() {
    return (
    <div className={styles['login-page']}>
      {this.renderRedirect()}
      <div className={styles['logo']}>
        <Image alt='Isco Logo' src={getLogoLink()}/>
      </div>
      <div className={styles['login-form']}>
        <Form onSubmit={this.onSubmit}>
          <Form.Row>
            <Form.Control
              required={true}
              type='text'
              name='email'
              placeholder='Email'
              onChange={this.onInputChange}
              value={this.state.form.email}
            />
          </Form.Row>
          <br/>
          <Form.Row>
            <Form.Control
              required={true}
              type='password'
              name='password'
              placeholder='Password'
              onChange={this.onInputChange}
              value={this.state.form.password}
            />
          </Form.Row>
          <Form.Row className={styles['login-button']}>
            <LoadingButton type='submit' loading={this.state.submitting} label='Login'/>
          </Form.Row>
          {this.state.errorMessage ?
            <Alert style={{marginTop: '1rem'}} variant='danger'>{this.state.errorMessage}</Alert> : null}
        </Form>
      </div>
      {/*<div className={styles['forgot-password']}>*/}
      {/*  <Link to={RoutePaths.forgotPassword}>Forgot Password</Link>*/}
      {/*</div>*/}
    </div>
    );
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({actions: bindActionCreators({setCurrentUser: userStore.actions.setCurrentUser}, dispatch)});
const mapStateToProps = (state: WebState) => ({ authenticated: isAuthenticated(state)});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
