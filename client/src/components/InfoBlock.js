import React from 'react';
import style from './InfoBlock.module.css'

const InfoBlock = (props) => {
  return (
    <div className={style.InfoBlock}>
      <img src={props.Img} className={style.image} alt={props.Title} />
      <h3>{props.Title}</h3>
      <p className={style.text}>{props.Description}</p>
    </div>
  );
};

export default InfoBlock;