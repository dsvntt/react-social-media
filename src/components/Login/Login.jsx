import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { required } from '../../utils/validators/validators'
import { createField, Input } from '../common/FormsControls/FormsControls'
import { connect } from 'react-redux'
import { login } from '../../redux/authReducer'
import s from './Login.module.css'

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
  console.log({error})
  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <h3 className={s.formHeading}>Login</h3>

      <div className={s.emailInput}>
        <label htmlFor='email' className={s.formLabel}>
          Email
        </label>

        <Field
          placeholder={'Email'}
          name={'email'}
          component={Input}
          validate={[required]}
        />
      </div>

      <div className={s.passwordInput}>
        <label htmlFor='password' className={s.formLabel}>
          Password
        </label>

        <Field
          placeholder={'Password'}
          name={'password'}
          component={Input}
          validate={[required]}
          type='password'
        />
      </div>
      {captchaUrl && <img src={captchaUrl} className={s.captchaPhoto} />}
      {captchaUrl && createField('captcha', 'captcha', [required], Input, {})}

      {error && <div className={s.formSummaryError}>{error}</div>}
      <div className={s.buttonDiv}>
        <button className={s.formButton}>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    )
  }

  useEffect(() => {
    document.body.classList.add(s.noOverflow);
    return () => {
      document.body.classList.remove(s.noOverflow);
    };
  }, []);

  if (props.isAuth) {
    return <Navigate to={'/profile'} />
  }
  return (
    <div className={s.loginContainer}>
      <div className={s.wrapper}>
        <div className={s.background}>
          <div className={s.shape}></div>
          <div className={s.shape}></div>
        </div>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, { login })(Login)
