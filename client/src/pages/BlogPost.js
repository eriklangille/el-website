import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from '../components/Header.js';
import Article from '../components/Article.js';
import style from './Blog.module.css';

const BlogPost = () => {

  const [blogPostInfo, setBlogPost] = useState([]);

  let { id } = useParams();

  const getDate = (currDate) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date(currDate);
    console.log("yeet: "+currDate);

    return today.toLocaleDateString("en-US", options);
  };

  const getBlogPost = async (vid) => {
    try {
      const response = await fetch(`http://localhost:5000/blog/${vid}`);
      const jsonData = await response.json();

      setBlogPost(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getBlogPost(id);
  }, [id]);

  return(
    <Fragment>
      <Header Gradient={style.Gradient} Title="Blog" />
      <Article Image={blogPostInfo.image_url} Title={blogPostInfo.title} Date={getDate(blogPostInfo.modified_date)} Post={"```javascript\n\nif(a==b){\n\tn=0;\n}\n\n````"} />
    </Fragment>
  );
};

export default BlogPost;