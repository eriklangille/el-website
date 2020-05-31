import React, {useContext} from 'react';
import {logoutUser } from '../actions/authActions';
import { UserContext } from '../App.js';
import FormButton from '../components/FormButton.js';
import ActionButton from '../components/ActionButton';

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
      <p style={{'textAlign': "center"}}>Dashboard page</p>
      <br />
      <ActionButton Link='./NewPost' ButtonText="New Post" />
      <br />
      <br />
      <br />
      <FormButton onClick={onLogoutClick}>Logout</FormButton>
    </div>
  );
};

export default Dashboard