import React from 'react';
import style from './GradientButton.module.css';
import classnames from 'classnames'

const Link = (props) => {
  if (props.Url !== null) {
    return (
      <a className={style.a} href={props.Url} target={props.NewWindow ? "_blank" : ""} rel="noopener noreferrer">
        {props.children}
      </a>
    )
  }
  return (props.children)
}

const GradientButton = (props) => {
  const color = props.ButtonColor || "#3f3f3f"
  const backdropColor = props.BackdropColor || "#ffffff"
  const gradient = props.ButtonGradient
  const filled = props.focused ? "true" : null || false;

  return (
    <button className={style.Button} style={{backgroundImage: gradient}}>
      <Link Url={props.Link} NewWindow={props.NewWindow}>
        <div className={style.Backdrop} style={{backgroundColor: backdropColor}}>
          <div style={{backgroundColor: color, backgroundImage: gradient}} className={classnames(style.ButtonBackground, {[style.ButtonBackground_h]: !filled}, {[style.ButtonBackground_s]: filled})}>
            <p className={style.ButtonText} style={{backgroundColor: filled ? "#f3f3f3" : color, backgroundImage: gradient}}>
              {props.children}
            </p>
          </div>
        </div>
      </Link>
    </button>
  );
}

export default GradientButton;