import React from 'react';

import style from './Header.module.css';

const Header = (props) => {

  return (
    <div className={props.Gradient}>
      <h1 className={style.Title}>
        {props.Title}
      </h1>
    </div>
  );
};

export default Header;