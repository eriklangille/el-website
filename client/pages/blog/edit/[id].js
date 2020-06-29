import axios from 'axios';
import Head from 'next/head'
import { apiUrl } from '../../../utils/refLinks'
import { useRouter } from 'next/router'
import { useState, useEffect, useContext, Fragment } from 'react'
import { UserContext } from '../../../utils/UserContext.js';

import NewPost from '../../newpost'

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
        <title>Erik Langille | Edit Article</title>
      </Head>
      {!Post ? null : <NewPost Id={Post.blog_id} Title={Post.title} ShortDescription={Post.short_desc} Published={Post.published} Link={Post.post_url} Post={Post.post} Image={`${apiUrl}/images/${Post.image}.${Post.image_ext}`} /> }
    </Fragment>
  );
};

export default Post