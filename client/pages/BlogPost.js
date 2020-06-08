import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

import Header from '../components/Header.js';
import Article from '../components/Article.js';
import style from './Blog.module.css';

const BlogPost = () => {

  const [blogPostInfo, setBlogPost] = useState([]);

  let { id } = useParams();

  const getBlogPost = async (vid) => {
    try {
      // const response = await fetch(`http://localhost:5000/blog/${vid}`);
      // const jsonData = await response.json();
      await axios.get(`http://localhost:5000/api/blog/post/${vid}`)
      .then(res => {
        setBlogPost(res.data);
      });
      // console.log("BlogPost", jsonData);
      // setBlogPost(jsonData);
    } catch (err) {
      console.error(err.message);
      // window.location.href = "/Blog";
    }
  };

  useEffect(() => {
    getBlogPost(id);
  }, [id]);

  return(
    <Fragment>
      <Header Gradient={style.Gradient} Title="Blog" />
      <Article Image={blogPostInfo.image_url} Title={blogPostInfo.title} Date={getDate(blogPostInfo.modified_date)} Post={blogPostInfo.post} />
    </Fragment>
  );
};

export default BlogPost;