import React from 'react';

import style from './ActionButton.module.css';

// Props
// string Link, boolean NewWindow, className css.style, string ButtonText

const ActionButton = (props) => {
  const color = props.ButtonColor || '#3f3f3f'
  
  return (
    <div onClick={props.onClick} className={props.className} style={props.style} >
      <a href={props.Link} target={props.NewWindow ? "_blank" : ""} rel="noopener noreferrer">
        <div className={style.Button} style={{borderColor: color}}>
          <span className={style.ButtonBackground} style={{backgroundColor: color}}>
            <p className={style.ButtonText} style={{color: color}}>{props.ButtonText}</p>
          </span>
        </div>
      </a>
    </div>
  );
};

export default ActionButton;