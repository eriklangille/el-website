import React, { useState } from 'react';
import axios from 'axios';
import classnames from 'classnames'

import style from './NewPost.module.css';
import FormButton from '../components/FormButton.js';
import ActionButton from '../components/ActionButton.js';

const NewPost = () => {

  const [Title, setTitle] = useState("");
  const [URL, setURL] = useState("");
  const [URLmod, setURLmod] = useState(false);
  const [URLid, setURLid] = useState(0);
  const [SavedURL, setSavedURL] = useState("");
  const [Image, setImage] = useState(null);
  const [ShortDescription, setShortDescription] = useState("");
  const [Post, setPost] = useState("");

  //Submitting the form with the save button.
  const onSubmit = e => {
    e.preventDefault();
    console.log("click!");
    axios.post("/api/blog/newpost", {Title, URL, ShortDescription, Post, URLid})
    .then((res) => {
      setURLid(res.data.blog_id);
      setSavedURL(res.data.post_url);
    })
    .catch(err => {
      console.error(err);
    });
  }

  //Prevent certain characters from being typed when modifying the URL hyphenated input.
  const urlFiltering = (e) => {
    const re = /[0-9A-Za-z-]+/g;
    setURLmod(true);
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }

  //When the title is first being typed limit certain characters and replace spaces with a hyphen.
  const titleTyping = (e) => {
    const re = /[^0-9A-Za-z\s-]+/g;
    const re2 = /\s/gi;
    setTitle(e.target.value);
    const filterString = e.target.value.replace(re, '');
    if (!URLmod) {
      setURL(filterString.replace(re2, '-'))
    }
  }

  //When an image is uploaded store it in state and send it to be uploaded.
  const onImageChange = e => {
    setImage(e.target.files[0]);
    const data = new FormData();
    data.append('file', Image);
    axios.post("/api/upload", data, {
      // Receive two parameter endpoint url, form data.
    }).then(res => {
      console.log(res.statusText);
    });
  }

  return (
    <div className={style.Backdrop}>
      <h1>
        New Blog Post
      </h1>
      <div>
        <form noValidate className={style.Form} onSubmit={onSubmit}>
          <div className={classnames(style.FieldInput, style.Title)}> 
            <p>Title</p>  
            <input className={style.InputTitle} onChange={(e) => titleTyping(e)} value={Title} placeholder="Blog Post" type="text" />
          </div>
          <div className={classnames(style.FieldInput, style.Url)}> 
            <p>URL hyphenated</p>
            <input className={style.InputUrl} onKeyPress={e => urlFiltering(e)} onChange={(e) => setURL(e.target.value)} value={URL} placeholder="Blog-Post" type="text" />
          </div>
          <div className={classnames(style.FieldInput, style.ImageFile)}> 
            <p>Display Image</p>
            <input className={style.InputImageFile} onChange={onImageChange} type="file" name="Image" accept="image/png, image/jpeg" />
          </div>
          <div className={classnames(style.FieldInput, style.ShortDescription)}> 
            <p>Short Description</p>
            <textarea className={style.InputShortDescription} onChange={(e) => setShortDescription(e.target.value)} value={ShortDescription} />
          </div>
          <div className={classnames(style.FieldInput, style.Post)}>
            <p>Markdown Blog Post</p>
            <textarea className={style.InputPost} onChange={(e) => setPost(e.target.value)} value={Post} />
          </div>
          <div className={style.FormButtons}>
            <div className={style.LHSFormButtons}>
              <FormButton type="submit">Save</FormButton>
              <ActionButton Link={URLid === 0 ? null : `/blog/${SavedURL}.${URLid}`} ButtonText="Preview" NewWindow={true}/>
            </div>
            <div>
              <FormButton>Publish</FormButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;