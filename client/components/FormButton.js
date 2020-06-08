import React from 'react';

import style from './FormButton.module.css';

const FormButton = (props) => {
  return (
    <button className={style.Button} {...props} ><p className={style.ButtonText}>{props.children}</p></button>
  );
};

export default FormButton;