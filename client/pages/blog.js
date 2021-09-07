import React, { Fragment } from "react";
import { apiUrl } from '../utils/refLinks'
import getStringDate from '../utils/getStringDate'
import Head from 'next/head';
import axios from 'axios';
import isempty from 'is-empty'
import getImageUrl from "../utils/getImageUrl";

import Header from '../components/Header.js';
import style from './Blog.module.css';
import ItemBlock from "../components/ItemBlock.js";

const Blog = (props) => {

  const blogPosts = props.data;

  return(
    <Fragment>
    <Head>
      <title>Erik Langille | Blog</title>
    </Head>
      <Header Gradient="linear-gradient(90deg, rgba(58,47,143,1) 0%, rgba(231,41,42,1) 100%)" FallbackColor="rgba(231,41,42,1)">Blog</Header>
      <div className={style.BlogList}>
        {!isempty(blogPosts) && blogPosts.map !== undefined ? blogPosts.map(blogPost => (
          <ItemBlock key={blogPost.blog_id} Published={blogPost.published} Image={getImageUrl(blogPost.image, blogPost.image_ext)} Title={blogPost.title} Date={getStringDate(blogPost.created_date)} ButtonText="Read More" ButtonLink={"/blog/"+blogPost.post_url+"."+blogPost.blog_id} ButtonNewWindow={false} Description={blogPost.short_desc} />
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

    await axios.get(`${apiUrl}/api/blog/posts`)
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