import React from 'react';
import classnames from 'classnames';

import style from './FormButton.module.css';

const FormButton = (props) => {
  const color = props.ButtonColor || '#3f3f3f'
  const filled = props.focused ? "true" : null || false;
  
  return (
    <div className={style.Enclosure}>
    <button className={style.Button} style={{borderColor: color}} {...props} >
      <div style={{backgroundColor: color}} className={classnames(style.ButtonBackground, {[style.ButtonBackground_h]: !filled}, {[style.ButtonBackground_s]: filled})}>
        <p className={style.ButtonText} style={{color: filled ? "#f3f3f3" : color}}>
          {props.children}
        </p>
      </div>
    </button>
    </div>
  );
};

export default FormButton;