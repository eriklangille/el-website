import React, {useContext} from 'react';
import {logoutUser } from '../actions/authActions';
import { UserContext } from '../App.js';

const Dashboard = (props) => {
  
  const user = useContext(UserContext);
  const usr = user.auth.user;

  const onLogoutClick = (e) => {
    e.preventDefault();
    logoutUser();
    window.location.href = "./login";
  };

  return(
    <div>
      <h1>Hello, {usr.name}</h1>
      <br />
      <p>Dashboard page</p>
      <br />
      <button onClick={onLogoutClick}>Logout</button>
    </div>
  );
};

export default Dashboard