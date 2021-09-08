import React, { useState } from 'react';
import { apiUrl } from '../utils/refLinks';
import getImageUrl from '../utils/getImageUrl';
import axios from 'axios';
import classnames from 'classnames'

import style from './NewPost.module.css';
import AuthRoute from '../components/AuthRoute.js';
import FormButton from '../components/FormButton.js';
import ActionButton from '../components/ActionButton.js';

const NewPost = (props) => {

  console.log("FIELDS", props)

  const [Title, setTitle] = useState(props.Title || "");
  const [URL, setURL] = useState(props.Link || "");
  const [URLmod, setURLmod] = useState(false);
  const [URLid, setURLid] = useState(props.Id || 0);
  const [SavedURL, setSavedURL] = useState(props.Link || "");
  const [Image, setImage] = useState(null);
  const [ImageLink, setImageLink] = useState(props.Image || "");
  const [ShortDescription, setShortDescription] = useState(props.ShortDescription || "");
  const [Post, setPost] = useState(props.Post || "");
  const [Published, setPublished] = useState(props.Published || false);

  //Submitting the form with the save button.
  const onSubmit = e => {
    e.preventDefault();
    console.log("click!");
    axios.post(`${apiUrl}/api/blog/newpost`, {Title, URL, ShortDescription, Post, URLid})
    .then((res) => {
      setURLid(res.data.blog_id);
      setSavedURL(res.data.post_url);
    })
    .catch(err => {
      console.error(err);
    });
  }

  const onPublish = e => {
    e.preventDefault();
    const publish = Published ? "un" : "";
    axios.post(`${apiUrl}/api/blog/${publish}publish/.${URLid}`)
    .then((res) => {
      setPublished(res.data.published);
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
    if (e.target.files[0] == null) {
      return
    }
    setImage(e.target.files[0]);
    const data = new FormData(); 
    data.set('type', '1'); //Blog is type 1.
    data.append('photo', e.target.files[0]);
    console.log("Image Changed!!!")
    axios({method: 'post', url: `${apiUrl}/api/upload`, data: data, headers: {'Content-Type': 'multipart/form-data'}}).then(res => {
      console.log("Result!!", res);
      setImageLink(getImageUrl(res.image, res.image_ext));
      const ImageUUID = res.data.image_id;
      axios.post(`${apiUrl}/api/blog/newpost`, {Title, URL, ShortDescription, Post, URLid, ImageUUID})
      .then((res) => {
        setURLid(res.data.blog_id);
        setSavedURL(res.data.post_url);
      })
      .catch(err => {
        console.error(err);
      });
      console.log(res.statusText);
    }).catch(err => {
      console.error(err);
    });
  }

  return (
    <AuthRoute>
      <div className={style.Backdrop}>
        <h1 className={style.MainText}>
          {!props.Id ? "New Blog Post" : "Edit Blog Post"}
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
              {ImageLink !== "" && ImageLink !== null ? <img className={style.Image} src={ImageLink} alt={Title} /> : null}
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
                <ActionButton Link={URLid === 0 ? null : `/blog/preview/${SavedURL}.${URLid}`} ButtonText="Preview" NewWindow={true}/>
              </div>
              <div>
                <ActionButton onClick={onPublish} ButtonText={Published ? "Unpublish" : "Publish"} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </AuthRoute>
  );
};

export default NewPost;