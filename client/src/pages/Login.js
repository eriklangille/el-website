import React, { useState, useContext, useEffect } from 'react';
import classnames from 'classnames';

import { UserContext } from '../App.js';

import style from './Login.module.css';
import { Redirect } from 'react-router-dom';

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
  }, [user.errors, user]);

  const renderRedirect = () => {
    if (user.auth.isAuthenticated) {
      return <Redirect to='/blog' />
    }
  };

  return (
    <div className={style.Login}>
    {renderRedirect()}
    <h3>Login</h3>
    <form noValidate onSubmit={onSubmit}>
      <div className={style.Email}>
        <input onChange={(e) => setEmail(e.target.value)} value={email} error={errors.email} type="email" id={style.EmailInput} placeholder="Email" />
        <span className={style.redText}>
          {errors.email}
          {errors.emailnotfound}
        </span>
      </div>
      <div className={style.Password}>
        <input className={classnames("", {[style.Invalid]: errors.password || errors.passwordIncorrect})} onChange={(e) => setPassword(e.target.value)} value={password} error={errors.password} type="password" id={style.PasswordInput} placeholder="Password" />
        <span className={style.redText}>
          {errors.password}
          {errors.passwordIncorrect}
        </span>
      </div>
      <div className={style.LoginArea} >
        <button type="submit" className={style.LoginButton}>
          Login
        </button>
      </div>
    </form>
    </div>
  );
};

export default Login;