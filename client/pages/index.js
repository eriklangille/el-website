import React, { Fragment } from "react";
import Head from 'next/head';
import { apiUrl } from '../utils/refLinks';
import style from './Index.module.css';
import RecentBlock from "../components/RecentBlock.js";

const HomePage = () => {

  return(
    <Fragment>
      <Head>
        <title>Erik Langille | Homepage</title>
      </Head>
      <div className={style.Info}>
        <div className={style.Introduction}>
          {/* <img src="/backdrop_sm.jpg" alt="words"></img> */}
          <span>
            <img className={style.Headshot} src="/headshot_256.jpg" alt="words"></img>
            <p className={style.Text}><b>Hi!</b> I’m Erik — a software engineer looking for a full-time position after I graduate in April 2022.</p>
          </span>
        </div>
      </div>
      <div className={style.Gradient}></div>
      <div className={style.Main}>
        <RecentBlock 
        Title="Recent Project"
        ItemText="Time Management Mobile App"
        ItemImageSrc={`${apiUrl}/images/0b5f1b65-c37d-4350-b979-b62bc4eb1f7e.jpg`} 
        ItemDetailText={`
          • Increased personal time management by prototyping a multi-platform mobile app in Adobe XD and building it in Flutter
          • Implemented account functionality and cloud data storage developed using Firebase’s Authentication and NoSQL database solutions
        `}
        ButtonLink="https://github.com/eriklangille/pomotask"
        ButtonNewWindow={true}
        ButtonText="Learn more on GitHub"
        Gradient="linear-gradient(90deg, rgba(99,187,70,1) 0%, rgba(123,97,255,1) 100%)" 
        BackdropColor="#ffffff"
        FallbackColor="rgba(99,187,70,1)"
        />
        <RecentBlock 
        Title="Recent Blog Post"
        ItemText="Feature complete?"
        ItemImageSrc={`${apiUrl}/images/0b5f1b65-c37d-4350-b979-b62bc4eb1f7e.jpg`} 
        ItemDetailText={`
        I think I might be done the blog for now. Fingers crossed.
        `}
        ButtonLink="https://github.com/eriklangille/pomotask"
        ButtonNewWindow={true}
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

export default HomePage;