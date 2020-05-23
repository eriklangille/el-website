import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom'
import { UserContext } from '../App.js';

const PrivateRoute = ({component: Component, ...rest}) => {
  const user = useContext(UserContext);
  const { auth } = user;

  console.log("privateRoute", auth);
  console.log("privateRoute", auth.isAuthenticated);


  return (
    <Route {...rest} render={props => auth.isAuthenticated === true ? (<Component {...props} />) : (<Redirect to="/login" />)} />
  );
};

export default PrivateRoute;