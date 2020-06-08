import React, { useState, useContext, useEffect } from 'react';
import Router from 'next/router';
import classnames from 'classnames';

import { UserContext } from '../utils/UserContext.js';
import FormButton from '../components/FormButton.js';

import style from './Login.module.css';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const user = useContext(UserContext);

  const onSubmit = e => {
    e.preventDefault();
    user.handleLogin({email, password});
  }

  useEffect(() => {
    if(user.errors) {
      setErrors(user.errors);
    }
    renderRedirect();
  }, [user.errors, user]);

  const renderRedirect = () => {
    if (user.auth.isAuthenticated) {
     Router.push('/dashboard');
    }
  };

  return (
    <div className={style.Login}>
      <h3>Login</h3>
      <form noValidate className={style.Form} onSubmit={onSubmit}>
        <div className={style.Fields}>
          <div className={style.Email}>
            <input className={classnames([style.Input], {[style.Invalid]: errors.email || errors.emailnotfound})} onChange={(e) => setEmail(e.target.value)} value={email} error={errors.email} type="email" id={style.EmailInput} placeholder="Email" />
            <span className={style.redText}>
              {errors.email}
              {errors.emailnotfound}
            </span>
          </div>
          <div className={style.Password}>
            <input className={classnames([style.Input], {[style.Invalid]: errors.password || errors.passwordIncorrect})} onChange={(e) => setPassword(e.target.value)} value={password} error={errors.password} type="password" id={style.PasswordInput} placeholder="Password" />
            <span className={style.redText}>
              {errors.password}
              {errors.passwordIncorrect}
            </span>
          </div>
        </div>
        <div className={style.LoginArea} >
          <FormButton type="submit">
            Login
          </FormButton>
        </div>
      </form>
    </div>
  );
};

export default Login;