import React, { Fragment, useState, useEffect } from "react";
import axios from 'axios';

import Header from '../components/Header.js';
import style from './Blog.module.css';
import ItemBlock from "../components/ItemBlock.js";

const Blog = () => {

  const [blogPosts, setBlogPosts] = useState([]);

  const getDate = (currDate) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date(currDate);
    console.log("yeet: "+currDate);

    return today.toLocaleDateString("en-US", options);
  };

  const getBlogPosts = async () => {
    try {
      // const response = await fetch('http://localhost:5000/blog');
      // const jsonData = await response.json();

      // setBlogPosts(jsonData);
      await axios.get(`/api/blog/posts`)
      .then(res => {
        setBlogPosts(res.data);
      });

    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getBlogPosts();
  }, []);

  return(
    <Fragment>
      <Header Gradient={style.Gradient} Title="Blog" />
      <div className={style.BlogList}>
        {blogPosts !== undefined ? blogPosts.map(blogPost => (
          <ItemBlock key={blogPost.blog_id} Published={blogPost.published} Image={blogPost.image_url} Title={blogPost.title} Date={getDate(blogPost.modified_date)} ButtonText="Read More" ButtonLink={"http://localhost:3000/blog/"+blogPost.post_url+"."+blogPost.blog_id} ButtonNewWindow={false} Description={blogPost.short_desc} />
        )) : null}
      </div>
    </Fragment>
  );
};

export default Blog;