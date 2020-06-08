import React from 'react';

import style from './Footer.module.css';
const logo_border = '/Logo-border@2x.png';

const Footer = () => {
  return (
    <div className={style.Footer}>
      <img src={logo_border} alt="Footer" />
      <p>© 2020</p>
    </div>
  );
};

export default Footer;