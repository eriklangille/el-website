import React, { Fragment, useState } from "react";
import Head from 'next/head';
import axios from 'axios';

import Header from '../components/Header.js';
import style from './Blog.module.css';
import ItemBlock from "../components/ItemBlock.js";

const Blog = (props) => {

  // const [blogPosts, setBlogPosts] = useState([]);

  const blogPosts = props.data;

  // console.log("Blog Post", props.data)

  const getDate = (currDate) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date(currDate);
    console.log("yeet: "+currDate);

    return today.toLocaleDateString("en-US", options);
  };

  // useEffect(() => {
  //   getBlogPosts();
  // }, []);

  return(
    <Fragment>
    <Head>
      <title>Erik Langille | Blog</title>
    </Head>
      <Header Gradient={style.Gradient} Title="Blog" />
      <div className={style.BlogList}>
        {blogPosts !== null ? blogPosts.map(blogPost => (
          <ItemBlock key={blogPost.blog_id} Published={blogPost.published} Image={blogPost.image_url} Title={blogPost.title} Date={getDate(blogPost.modified_date)} ButtonText="Read More" ButtonLink={"http://localhost:3000/blog/"+blogPost.post_url+"."+blogPost.blog_id} ButtonNewWindow={false} Description={blogPost.short_desc} />
        )) : null}
      </div>
    </Fragment>
  );
};

export const getServerSideProps = async (ctx) => {
  // try {
    // const response = await fetch('http://localhost:5000/api/blog/posts');
    // const jsonData = await response.json();

    // return {props: {data: jsonData}};

    // setBlogPosts(jsonData);

    let data = null;

    await axios.get(`http://localhost:5000/api/blog/posts`)
    .then(res => {
      // setBlogPosts(res.data);
      data = res.data
    }).catch((err) => {
      console.log(err);
    });

    return {props: {data: data}};

  // } catch (err) {
  //   console.error(err.message);
  //   return {};
  // }
};

export default Blog;