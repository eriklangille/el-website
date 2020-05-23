import React from 'react';

import logo_border from '../media/Logo-border@2x.png';
import style from './Footer.module.css';

const Footer = () => {
  return (
    <div className={style.Footer}>
      <img src={logo_border} alt="Footer" />
      <p>© 2020</p>
    </div>
  );
};

export default Footer;