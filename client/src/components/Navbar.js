import React, { Fragment, useState } from 'react'
import { NavLink } from 'react-router-dom';
import style from './Navbar.module.css'

import el_logo from '../media/el-logo@2x.png'
import fb from '../media/fb-circle.png'
import li from '../media/li-circle.png'
import gh from '../media/gh-circle.png'
import open_fb from '../media/open_fb.svg'
import open_li from '../media/open_li.svg'
import open_gh from '../media/open_gh.svg'

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <Fragment>
      <nav className={style.Navbar}>
        <div className={style.lhs}>
          <div className={style.logo}>
            <img className={style.logo_img} src={el_logo} alt="logo" />
            <h1>Erik Langille</h1>
          </div>
          <div className={menuVisible ? style.pages : style.m_pages}>
            <div><p><NavLink to="/">Home</NavLink></p></div>
            <div><p><NavLink to="/Projects">Projects</NavLink></p></div>
            <div><p><NavLink to="/Blog">Blog</NavLink></p></div>
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