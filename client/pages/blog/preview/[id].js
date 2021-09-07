import axios from 'axios';
import Head from 'next/head'
import { apiUrl } from '../../../utils/refLinks'
import { useRouter } from 'next/router'
import { useState, useEffect, useContext, Fragment } from 'react'
import { UserContext } from '../../../utils/UserContext.js';
import getStringDate from '../../../utils/getStringDate.js';
import getImageUrl from '../../../utils/getImageUrl';

import style from '../../Blog.module.css';

import Header from '../../../components/Header';
import Article from '../../../components/Article';
import AuthRoute from '../../../components/AuthRoute';

const Post = (props) => {
  const [Post, setPost] = useState({});
  const user = useContext(UserContext);
  const router = useRouter()

  const id = router.query.id;

  const getPostData = async(id) => {
    let data = null;
  
    await axios.get(`${apiUrl}/api/blog/post/${id}`)
    .then(res => {
      data = res.data;
    }).catch((err) => {
      console.error(err);
    });
  
    setPost(data);
  }

  useEffect(() => {
    getPostData(id);
  }, [user]);

  return (
    <Fragment>
      <Head>
        <title>Erik Langille | Preview Article</title>
      </Head>
      <AuthRoute>
        <Header Gradient={style.Gradient} Title="Blog - Preview" />
        <Article Image={getImageUrl(Post.image, Post.image_ext)} Title={Post.title} Date={getStringDate(Post.created_date)} Post={Post.post} />
      </AuthRoute>
      </Fragment>
  );
};

export default Post