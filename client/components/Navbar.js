import React, { Fragment, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import style from './Navbar.module.css'
import { apiUrl } from '../utils/refLinks'

const el_logo = '/el-logo@2x.png';
const fb = '/fb-circle.png';
const li = '/li-circle.png';
const gh = '/gh-circle.png';
const open_fb = '/open_fb.svg';
const open_li = '/open_li.svg';
const open_gh = '/open_gh.svg';

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  return (
    <Fragment>
      <nav className={style.Navbar}>
        <div className={style.Content}>
          <div className={style.Links}>
            <div><p className={router.pathname == "/" ? style.active : null}><Link href="/"><a>Home</a></Link></p></div>
            <div><p className={router.pathname == "/projects" ? style.active : null}><Link href="/projects"><a>Projects</a></Link></p></div>
            <div><p className={router.pathname.includes("/blog") ? style.active : null}><Link href="/blog"><a>Blog</a></Link></p></div>
            <div className={style.new_window}><a href={`${apiUrl}/static/ErikLangille_Resume_Web.pdf`} target="_blank" rel="noopener noreferrer"><p>Resume</p><img src={open_gh} alt="new window" /></a></div>
          </div>
          <div className={style.lhs}>
            <div className={menuVisible ? style.pages : style.m_pages}>
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
        </div>
        </nav>
    </Fragment>
  );
};

export default Navbar;