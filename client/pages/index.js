import React, { Fragment } from "react";
import Head from 'next/head';
import { apiUrl } from '../utils/refLinks';
import getImageUrl from "../utils/getImageUrl";
import axios from 'axios';
import style from './Index.module.css';
import RecentBlock from "../components/RecentBlock.js";
import isempty from 'is-empty'

const HomePage = (props) => {
  const Project = props.projectData
  const Blog = props.blogData

  return (
    <Fragment>
      <Head>
        <title>Erik Langille | Homepage</title>
      </Head>
      <div className={style.Info}>
        <div className={style.Introduction}>
          <span className={style.IntroSpan}>
            <img className={style.Headshot} src="/headshot_256.jpg" alt="words"></img>
            <p className={style.Text}><b>Hi!</b> I’m Erik — a full-stack software developer graduating in April 2022.</p>
          </span>
        </div>
      </div>
      <div className={style.GradientWrapper}>
        <div className={style.Gradient}></div>
      </div>
      <div className={style.Main}>
        <RecentBlock 
        Title="Recent Project"
        ItemText={Project.title}
        ItemImageSrc={getImageUrl(Project.image,Project.image_ext)} 
        ItemDetailText={Project.description}
        ButtonLink={Project.button_link}
        ButtonNewWindow={true}
        ButtonText={Project.button_text}
        Gradient="linear-gradient(90deg, rgba(99,187,70,1) 0%, rgba(123,97,255,1) 100%)" 
        BackdropColor="#ffffff"
        FallbackColor="rgba(99,187,70,1)"
        />
        <RecentBlock 
        Title="Recent Blog Post"
        ItemText={Blog.title}
        ItemImageSrc={getImageUrl(Blog.image,Blog.image_ext)} 
        ItemDetailText={Blog.short_desc}
        ButtonLink={"/blog/"+Blog.post_url+"."+Blog.blog_id}
        ButtonNewWindow={false}
        ButtonText="Read more"
        Gradient="linear-gradient(90deg, rgba(123,97,255,1) 0%, rgba(231,41,42,1) 100%)" 
        BackdropColor="#ffffff"
        FallbackColor="rgba(123,97,255,1)"
        />
      </div>
      <div style={{height: "100px"}}></div>
    </Fragment>
  );
};

export const getServerSideProps = async (ctx) => {
    let projectData = null;
    let blogData = null;

    const projectGet = axios.get(`${apiUrl}/api/projects/recent`)
    .then(res => {
      projectData = res.data
    }).catch((err) => {
      console.log(err);
    });

    const blogGet = axios.get(`${apiUrl}/api/blog/recent`)
    .then(res => {
      blogData = res.data
    }).catch((err) => {
      console.log(err);
    });

    await projectGet;
    await blogGet;

    projectData = projectData !== null ? projectData[0] : null
    blogData = blogData !== null ? blogData[0] : null

    return {props: {projectData: projectData, blogData: blogData}};
};

export default HomePage;