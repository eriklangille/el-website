import axios from 'axios';
import getStringDate from '../../utils/getStringDate.js';
import { apiUrl } from '../../utils/refLinks'
import { Fragment } from 'react'

import style from '../Blog.module.css';

import Header from '../../components/Header';
import Article from '../../components/Article';

const getAllPostIds = async() => {
  let data = null;
  await axios.get(`${apiUrl}/api/blog/posts`)
  .then(res => {
    data = res.data;
  }).catch((err) => {
    console.error(err);
  });
  return data.map(post => {
    return {
      params: {
        id: `${post.post_url}.${post.blog_id}`
      }
    }
  }) || [];
};

const getPostData = async(id) => {
  let data = null;

  console.log("getPostData", id)

  await axios.get(`${apiUrl}/api/blog/post/${id}`)
  .then(res => {
    data = res.data;
  }).catch((err) => {
    console.error(err);
  });

  return {
    data
  }
}

const Post = (props) => {
  const blogPostInfo = props.postData.data;
  
  console.log("blogPostInfo", blogPostInfo, props);
  return (
    <Fragment>
      <Header Gradient={style.Gradient} Title="Blog" />
      <Article Image={`${apiUrl}/images/${blogPostInfo.image}.${blogPostInfo.image_ext}`} Title={blogPostInfo.title} Date={getStringDate(blogPostInfo.created_date)} Post={blogPostInfo.post} />
    </Fragment>
  );
};

export default Post

export const getStaticPaths = async () => {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false
  }
};

export const getStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}