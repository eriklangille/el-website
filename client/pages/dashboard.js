import React, {useContext, useState, useEffect, Fragment} from 'react';
import Head from 'next/head'
import axios from 'axios'
import isempty from 'is-empty'
import { apiUrl } from '../utils/refLinks'
import { logoutUser } from '../actions/authActions';
import { UserContext } from '../utils/UserContext.js';
import getStringDate, { getDateRange } from '../utils/getStringDate';
import FormButton from '../components/FormButton.js';
import ActionButton from '../components/ActionButton';
import ItemBlockSm from '../components/ItemBlockSm'
import AuthRoute from '../components/AuthRoute'

import style from './Dashboard.module.css'

const Dashboard = (props) => {
  
  const [ItemType, setItemType] = useState("blog");
  const [ItemList, setItemList] = useState([]);

  const user = useContext(UserContext);
  const usr = user.auth.user;

  const onLogoutClick = (e) => {
    e.preventDefault();
    logoutUser();
    window.location.href = "./login";
  };

  useEffect(() => {
    if (ItemType === "projects") {
      getProjects();
    } else {
      getBlogPosts();
    }
    console.log(localStorage.jwtToken)
  }, [user]);

  const getBlogPosts = async () => {
    let data = [];
    if(user.auth.isAuthenticated) {
      await axios.get(`${apiUrl}/api/blog/posts`)
      .then(res => {
        data = res.data
      }).catch((err) => {
        console.log(err);
      });
   }

    setItemList(data);
  }

  const getProjects = async () => {
    let data = [];

    await axios.get(`${apiUrl}/api/projects/`)
    .then(res => {
      data = res.data
    }).catch((err) => {
      console.log(err);
    });

    setItemList(data);
  }

  const onBlogClick = async (e) => {
    e.preventDefault();
    setItemType("blog");
    await getBlogPosts();
  };

  const onProjectsClick = async (e) => {
    e.preventDefault();
    setItemType("projects");
    await getProjects();
  };

  return(
    <Fragment>
      <Head>
        <title>Erik Langille | Dashboard</title>
      </Head>
      <AuthRoute>
        <div className={style.Content}>
          <div className={style.UserContent}>
            <h3>Hello, {usr.name}</h3>
            <FormButton onClick={onLogoutClick}>Logout</FormButton>
          </div>
            <br />
            <div className={style.ActionBar}>
              <div className={style.ItemType}>
                <FormButton focused={ItemType === "projects" ? "true" : undefined} onClick={onProjectsClick} >Projects</FormButton>
                <FormButton focused={ItemType === "blog" ? "true" : undefined} onClick={onBlogClick} >Blog</FormButton>
              </div>
              <ActionButton Link={ItemType === "projects" ? './newproject' : './newpost'} ButtonText={ItemType === "projects" ? "New Project" : "New Post"} />
            </div>
            <div className={style.List}>
              {!isempty(ItemList) && ItemType === "blog" ? ItemList.map(item => (
                // <ItemBlockSm buttons={buttonLinks(item.blog_id,`${webUrl}/blog/${item.post_url}.${item.blog_id}`, `${webUrl}/blog/edit/${item.post_url}.${item.blog_id}`)} key={item.blog_id} Published={item.published} Image={item.image_url} Title={item.title} Date={getStringDate(item.modified_date)} ButtonNewWindow={false} />
                <ItemBlockSm buttons={[{color: '#3f3f3f', text: 'Read', newWindow: true, link: `/blog/${item.post_url}.${item.blog_id}`}, {color: '#3A2F8F', text: 'Edit', newWindow: true, link: `/blog/edit/${item.post_url}.${item.blog_id}`}, {color: '#E7292A', text: 'Delete', newWindow: true, link: ''}]} key={item.blog_id} Published={item.published} Author={item.author} Image={`${apiUrl}/images/${item.image}.${item.image_ext}`} Title={item.title} Date={getStringDate(item.created_date)} ButtonNewWindow={false} />
              )) : null}
              {!isempty(ItemList) && ItemType === "projects" ? ItemList.map(item => (
                // <ItemBlockSm buttons={buttonLinks(item.blog_id,`${webUrl}/blog/${item.post_url}.${item.blog_id}`, `${webUrl}/blog/edit/${item.post_url}.${item.blog_id}`)} key={item.blog_id} Published={item.published} Image={item.image_url} Title={item.title} Date={getStringDate(item.modified_date)} ButtonNewWindow={false} />
                <ItemBlockSm buttons={[{color: '#3A2F8F', text: 'Edit', newWindow: true, link: `/projects/edit/${item.project_id}`}, {color: '#E7292A', text: 'Delete', newWindow: true, link: ''}]} key={item.project_id} Published={item.published} Author={""} Image={`${apiUrl}/images/${item.image}.${item.image_ext}`} Title={item.title} Date={`${getDateRange(item.start_date, item.finish_date)}`} ButtonNewWindow={false} />
              )) : null}
              { /*<ItemBlockSm buttons={buttons} Title="How to build a blog with no prior experience" Author="erikl" Date="July 1 2020" Published={false} Image='/img2.jpg' ButtonText="New Click"/> */}
            </div>
        </div>
      </AuthRoute>
    </Fragment>
  );
};

export default Dashboard