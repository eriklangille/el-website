import React from 'react';

import style from './ActionButton.module.css';

const ActionButton = (props) => {
  return (
    <div className={props.className}>
      <a href={props.Link} target={props.NewWindow ? "_blank" : ""} rel="noopener noreferrer">
        <div className={style.Button}>
          <p className={style.ButtonText}>{props.ButtonText}</p>
        </div>
      </a>
    </div>
  );
};

export default ActionButton;