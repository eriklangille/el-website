import React, { Fragment, useState } from 'react'
import Link from 'next/link'
import style from './Navbar.module.css'

const el_logo = '/el-logo@2x.png';
const fb = '/fb-circle.png';
const li = '/li-circle.png';
const gh = '/gh-circle.png';
const open_fb = '/open_fb.svg';
const open_li = '/open_li.svg';
const open_gh = '/open_gh.svg';

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <Fragment>
      <nav className={style.Navbar}>
        <div className={style.lhs}>
          <div className={style.logo}>
            <img className={style.logo_img} src={el_logo} alt="logo" />
            <h1><Link href="/"><a>Erik Langille</a></Link></h1>
          </div>
          <div className={menuVisible ? style.pages : style.m_pages}>
            <div><p><Link href="/"><a>Home</a></Link></p></div>
            <div><p><Link href="/projects"><a>Projects</a></Link></p></div>
            <div><p><Link href="/blog"><a>Blog</a></Link></p></div>
            <div className={style.social_link} id={style.fb}><a href="https://facebook.com/eriklangille" target="_blank" rel="noopener noreferrer"><p>Facebook</p><img src={open_fb} alt="new window" /></a></div>
            <div className={style.social_link} id={style.li}><a href="https://linkedin.com/in/eriklangille" target="_blank" rel="noopener noreferrer"><p>LinkedIn</p><img src={open_li} alt="new window" /></a></div>
            <div className={style.social_link} id={style.gh}><a href="https://github.com/eriklangille" target="_blank" rel="noopener noreferrer"><p>GitHub</p><img src={open_gh} alt="new window" /></a></div>
          </div>
        </div>
        <div className={style.social}>
          <a href="https://facebook.com/eriklangille" target="_blank" rel="noopener noreferrer"><img src={fb} alt="Facebook"/></a>
          <a href="https://linkedin.com/in/eriklangille" target="_blank" rel="noopener noreferrer"><img src={li} alt="Linkedin"/></a>
          <a href="https://github.com/eriklangille" target="_blank" rel="noopener noreferrer"><img src={gh} alt="GitHub"/></a>
        </div>
        <div className={style.menu_icon} onClick={() => setMenuVisible(!menuVisible)}>
          <div/>
          <div/>
          <div/>
        </div>
        </nav>
    </Fragment>
  );
};

export default Navbar;