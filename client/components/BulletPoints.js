import React from 'react';
import style from './BulletPoints.module.css';

const BulletPoints = (props) => {
  const text = props.text || props.children
  let key = 0
  return (
    <div className={style.BulletPoints}>
      {text.includes("•") ? text.split("•").slice(1).map((item) => <div key={key++} className={style.Bullet}><p className={style.BulletObject}>•</p><p className={style.BulletText}>{item}</p></div>) : <p className={style.BulletText}>{text}</p>}
    </div>
  );
}

export default BulletPoints