import React, { Fragment } from "react";

import InfoBlock from '../components/InfoBlock.js';
import style from './Home.module.css';

import img1 from '../media/img1.JPG';
import img2 from '../media/img2.jpg';
import img3 from '../media/img3.jpg';

const Home = () => {

  return(
    <Fragment>
      <div className={style.Gradient} />
      <div className={style.Info}>
        <InfoBlock Img={img1} Title="Learn." Description="I believe that learning is a lifelong process and teachings can come from anywhere. My passion for knowledge started off young by questioning everything. Fortunately, I was born in the era of the search engine, where any knowledge is within reach at a moment’s notice. This superpower has enabled me to educate myself on the software and hardware that is built into our world. I now continue my passion for learning as a full-time Engineering Student at the University of British Columbia." />
        <InfoBlock Img={img2} Title="Create." Description="The knowledge I acquire goes in hand with the creations I build. Creating is important to my wellbeing. Growing up, I began creating with sand in a sandbox, but the constant uncleanliness of the dirt convinced me to move to digital sandboxes. Recently, I have created an app to control a RC Car and an IoT toaster oven. In addition, my spare time is devoted to small projects, such as a cloud-based task app to help manage my time." />
        <InfoBlock Img={img3} Title="Inspire." Description="I try not to think in terms of never. I am inspired by many individuals who have faced and overcame adversity. I hope one day I can be an inspiration, whether that be through something I have created or by performing theatre on stage. I will continue to work on this one a bit everyday." />
      </div>
    </Fragment>
  );
};

export default Home;