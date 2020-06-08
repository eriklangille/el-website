import React from 'react';
import jwt_decode from 'jwt-decode'
import setAuthToken from './setAuthToken';

import authReducer from '../reducers/authReducer';
import errorReducer from '../reducers/errorReducer';
import { loginUser, setCurrentUser, logoutUser } from '../actions/authActions';

export const UserContext = React.createContext({});

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: true
};

const ErrorInitialState = {};

export const UserContextProvider = props => {
  const [state, authDispatch] = React.useReducer(authReducer, initialState);
  const [state1, errorDispatch] = React.useReducer(errorReducer, ErrorInitialState);

  const dispatch = (params) => {
    authDispatch(params);
    errorDispatch(params);
  };

  React.useEffect(() => {
    if (localStorage.jwtToken && !state.isAuthenticated) {
      // Set auth token header auth
      const token = localStorage.jwtToken;
      console.log("Logged in");
      setAuthToken(token);
      //Decode token and get user info and exp
      const decoded = jwt_decode(token);
      //Set user and isAuthenticated
      dispatch(setCurrentUser(decoded));

      //Check if the token is expired
      const currentTime = Date.now() / 1000; //convert to ms.
      if (decoded.exp < currentTime) {
        //Logout user
        dispatch(logoutUser());
        //Redirect to login screen.
        window.location.href = "./login";
      }
    }
  },[]);
  
  return (
    <UserContext.Provider value={{auth: state, errors: state1, handleLogin: (userData) => loginUser(userData).then(res => dispatch(res))}}>
    {props.children}
    </UserContext.Provider>
  );
};