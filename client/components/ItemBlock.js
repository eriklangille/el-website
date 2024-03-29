import React from 'react';

import style from './ItemBlock.module.css';
import BulletPoints from './BulletPoints';
import ActionButton from './ActionButton';

const ItemBlock = (props) => {

  return (
    <div className={style.Backdrop}>
      <div className={style.LHS}>
        <img src={props.Image} alt={props.Title} className={style.DisplayImage} />
      </div>
      <div className={style.RHS}>
        <h1 className={style.Title}>
          {props.Title}
        </h1>
        <p className={style.Date}>
          {`${props.Date}`}
        </p>
        <div className={style.Description}>
          <BulletPoints>
            {props.Description}
          </BulletPoints>
        </div>
        <ActionButton className={style.LinkButton} ButtonText={props.ButtonText} Link={props.ButtonLink} NewWindow={props.ButtonNewWindow ? true : false} />
      </div>
    </div>
  );
};

export default ItemBlock;