import React, { Fragment } from 'react';
import { apiUrl } from '../utils/refLinks';
import style from './RecentBlock.module.css';
import GradientButton from './GradientButton';
import BulletPoints from './BulletPoints';
//linear-gradient(90deg, rgba(99,187,70,1) 0%, rgba(123,97,255,1) 100%)

const RecentBlock = (props) => {

  return (
    <section className={style.RecentBlock}>
      <h2 className={style.TitleText} style={{backgroundImage: props.Gradient, backgroundColor: props.FallbackColor}}>
        {props.Title}
      </h2>
      <h3 className={style.ItemText}>
        {props.ItemText}
      </h3>
      <div className={style.ItemImageContainer}>
        <img className={style.ItemImage} src={props.ItemImageSrc} />
      </div>
      <div className={style.ItemDetailContainer}>
        <BulletPoints>
          {props.ItemDetailText}
        </BulletPoints>
      </div>
      <GradientButton
      className={style.LinkButton}
      ButtonGradient={props.Gradient}
      BackdropColor={props.BackdropColor}
      ButtonColor={props.FallbackColor}
      Link={props.ButtonLink}
      NewWindow={props.ButtonNewWindow}>
        {props.ButtonText}
      </GradientButton>
    </section>
  );
}

export default RecentBlock
