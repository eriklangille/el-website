import React, { Fragment } from "react";

import Header from '../components/Header.js';
import style from './Projects.module.css';
import ItemBlock from "../components/ItemBlock.js";

const img1 = '/img1.JPG'; //Template image for now.

const Projects = () => {

  return(
    <Fragment>
      <Header Gradient={style.Gradient} Title="Projects" />
      <div className={style.ProjectsList}>
        <ItemBlock Image={img1} Title="Pomodoro Task Management" Date="January to April 2020" ButtonText="GitHub" ButtonLink="https://github.com/eriklangille/pomodoro" ButtonNewWindow={true} Description="The knowledge I acquire goes in hand with the creations I build. Creating is important to my wellbeing. Growing up, I began creating with sand in a sandbox, but the constant uncleanliness of the dirt convinced me to move to digital sandboxes." />
      </div>
    </Fragment>
  );
};

export default Projects;