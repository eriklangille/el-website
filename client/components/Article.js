import React from 'react';
import ReactMarkdown from 'react-markdown';

import CodeBlock from './CodeBlock.js';
import style from './Article.module.css';

const Article = (props) => {

  return (
    <div className={style.ArticleBackground}>
      <div className={style.Article}>
        <h1 className={style.Title}>{props.Title}</h1>
        <h2 className={style.Date}>{props.Date}</h2>
        <div className={style.ImageDiv}>
          <img className={style.Image} src={props.Image} alt={props.Title} />
        </div>
        <ReactMarkdown source={props.Post} renderers={{code: CodeBlock}} />
      </div>
    </div>
  );
};

export default Article;