import React from 'react';
import style from './Header.module.css';

const Header = (props) => {
  const title = props.children || props.Title
  const gradient = props.Gradient
  const fallbackColor = props.FallbackColor

  return (
    <div className={style.Header}>
      <div className={style.Mid}>
        <h2 className={style.Title} style={{backgroundImage: gradient, backgroundColor: fallbackColor}}>
          {title}
        </h2>
      </div>
    </div>
  );
};

export default Header;