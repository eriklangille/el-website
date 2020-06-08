import React, {useContext} from 'react';
import {logoutUser } from '../actions/authActions';
import { UserContext } from '../utils/UserContext.js';
import FormButton from '../components/FormButton.js';
import ActionButton from '../components/ActionButton';
import ItemBlockSm from '../components/ItemBlockSm'

import style from './Dashboard.module.css'

const Dashboard = (props) => {
  
  const user = useContext(UserContext);
  const usr = user.auth.user;

  const onLogoutClick = (e) => {
    e.preventDefault();
    logoutUser();
    window.location.href = "./login";
  };

  const buttons = [{color: '#3f3f3f', text: 'Read', newWindow: true}, {color: '#3A2F8F', text: 'Edit', newWindow: true}, {color: '#E7292A', text: 'Delete', newWindow: true}]

  return(
    <div>
    <h3>Hello, {usr.name}</h3>
    <FormButton onClick={onLogoutClick}>Logout</FormButton>
      <br />
      <ActionButton Link='./newpost' ButtonText="New Post" />
      <br />
      <div className={style.List}>
        <ItemBlockSm buttons={buttons} Title="How to build a blog with no prior experience" Author="erikl" Date="July 1 2020" Published={false} Image='/img2.jpg' ButtonText="New Click"/>
      </div>
    </div>
  );
};

export default Dashboard