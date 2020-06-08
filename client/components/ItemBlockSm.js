import React from 'react';

import style from './ItemBlockSm.module.css';
import ActionButton from './ActionButton';

//Props
//string Image link to image, string Title, string Date, string Published, string Description, string ButtonText, bool ButtonNewWindow

const ItemBlockSm = (props) => {

  const buttons = props.buttons || [{color:"#ff0000", text: "Click", link: "https://eriklangille.com", newWindow: true}, {color:"#00ff00", text: "Click2", link: "https://eriklangille.com", newWindow: true}]
  let buttonCount = 0;

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
          {`${props.Date} • ${props.Author}${props.Published ? '' : ' • Not Published'}`}
        </p>
        <div className={style.Buttons}>
          {buttons.map((button) => 
            <ActionButton style={{marginLeft: buttonCount !== 0 ? '10px' : '0'}} key={buttonCount++} ButtonText={button.text} Link={button.link} NewWindow={button.newWindow} ButtonColor={button.color} /> 
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemBlockSm;