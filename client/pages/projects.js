import React, { Fragment } from "react";
import axios from 'axios';
import Head from 'next/head';
import isempty from 'is-empty'
import { apiUrl } from '../utils/refLinks.js'
import { getDateRange } from '../utils/getStringDate'
import getImageUrl from "../utils/getImageUrl.js";
import Header from '../components/Header.js';
import style from './Projects.module.css';
import ItemBlock from "../components/ItemBlock.js";

// const img1 = '/img1.JPG'; //Template image for now.

const Projects = (props) => {

  const Projects = props.data;

  return(
    <Fragment>
      <Head>
        <title>Erik Langille | Projects</title>
      </Head>
      <Header 
      Gradient="linear-gradient(90deg, rgba(99,187,70,1) 0%, rgba(58,47,143,1) 100%)"
      FallbackColor="rgba(58,47,143,1)"
      Title="Projects"
      />
      <div className={style.ProjectsList}>
        {/* <ItemBlock Image={img1} Title="Pomodoro Task Management" Date="January to April 2020" ButtonText="GitHub" ButtonLink="https://github.com/eriklangille/pomodoro" ButtonNewWindow={true} Description="The knowledge I acquire goes in hand with the creations I build. Creating is important to my wellbeing. Growing up, I began creating with sand in a sandbox, but the constant uncleanliness of the dirt convinced me to move to digital sandboxes." /> */}
        {!isempty(Projects) && Projects.map !== undefined ? Projects.map(Project => (
          <ItemBlock key={Project.project_id} Published={Project.published} Image={getImageUrl(Project.image, Project.image_ext)} Title={Project.title} Date={`${getDateRange(Project.start_date, Project.finish_date)}`} ButtonText={Project.button_text} ButtonLink={Project.button_link} ButtonNewWindow={true} Description={Project.description} />
        )) : null}
      </div>
    </Fragment>
  );
};

export const getServerSideProps = async (ctx) => {
    let data = null;

    await axios.get(`${apiUrl}/api/projects/`)
    .then(res => {
      data = res.data
    }).catch((err) => {
      console.log(err);
    });

    return {props: {data: data}};
};

export default Projects;