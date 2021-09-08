import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import classnames from 'classnames'
import { apiUrl } from '../utils/refLinks';
import getImageUrl from '../utils/getImageUrl';

import style from '../pages/NewPost.module.css';
import AuthRoute from '../components/AuthRoute.js';
import FormButton from '../components/FormButton.js';
import ActionButton from '../components/ActionButton.js';

const ProjectFields = (props) => {

  const [Title, setTitle] = useState(props.Title || "");
  const [Projectid, setProjectid] = useState(props.Id || 0);
  const [Image, setImage] = useState(null);
  const [ImageLink, setImageLink] = useState(props.Image || "");
  const [ShortDescription, setShortDescription] = useState(props.ShortDescription || "");
  const [Published, setPublished] = useState(props.Published || false);
  const [ButtonText, setButtonText] = useState(props.ButtonText || "");
  const [ButtonLink, setButtonLink] = useState(props.ButtonLink || "");
  const [StartDate, setStartDate] = useState(!props.StartDate ? new Date() : new Date(props.StartDate)); //useState(props.StartDate || "");
  const [FinishDate, setFinishDate] = useState(!props.FinishDate ? new Date() : new Date(props.FinishDate)) //useState(props.FinishDate || "");

  // console.log('Start DATE:', StartDate.toISOString())
  
  //Submitting the form with the save button.
  const onSubmit = e => {
    e.preventDefault();
    console.log("click!");
    const StartDateStr = StartDate.toISOString();
    const FinishDateStr = FinishDate.toISOString();
    axios.post(`${apiUrl}/api/projects/modify`, {Title, Projectid, ShortDescription, ButtonText, ButtonLink, StartDateStr, FinishDateStr})
    .then((res) => {
      setProjectid(res.data.project_id);
    })
    .catch(err => {
      console.error(err);
    });
  }

  const onPublish = e => {
    e.preventDefault();
    const publish = Published ? "un" : "";
    axios.post(`${apiUrl}/api/projects/${publish}publish/${Projectid}`)
    .then((res) => {
      setPublished(res.data.published);
    })
    .catch(err => {
      console.error(err);
    });
  }

  //When an image is uploaded store it in state and send it to be uploaded.
  const onImageChange = e => {
    if (e.target.files[0] == null) {
      return
    }
    setImage(e.target.files[0]);
    const data = new FormData(); 
    data.set('type', '2'); //Project is type 2.
    data.append('photo', e.target.files[0]);
    console.log("Image Changed!!!")
    axios({method: 'post', url: `${apiUrl}/api/upload`, data: data, headers: {'Content-Type': 'multipart/form-data', 'Cache-Control': 'max-age=0'}}).then(res => {
      console.log("Result!!", res);
      setImageLink(getImageUrl(res.image, res.image_ext));
      const ImageUUID = res.data.image_id;
      const StartDateStr = StartDate.toISOString();
      const FinishDateStr = FinishDate.toISOString();
      axios.post(`${apiUrl}/api/projects/modify`, {Title, Projectid, ShortDescription, ButtonText, ButtonLink, ImageUUID, StartDateStr, FinishDateStr})
      .then((res) => {
        console.log("yay!");
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
          {!props.Id ? "New Project" : "Edit Project"}
        </h1>
        <div>
          <form noValidate className={style.Form} onSubmit={onSubmit}>
            <div className={classnames(style.FieldInput, style.Title)}> 
              <p>Title</p>  
              <input className={style.InputTitle} onChange={(e) => setTitle(e.target.value)} value={Title} placeholder="Project Title" type="text" />
            </div>
            <div className={classnames(style.FieldInput, style.StartDate)}> 
              <p>Start Date</p>
              <DatePicker selected={StartDate} onChange={(e) => setStartDate(e)} />
            </div>
            <div className={classnames(style.FieldInput, style.FinishDate)}> 
              <p>Finish Date</p>
              <DatePicker selected={FinishDate} onChange={(e) => setFinishDate(e)} />
            </div>
            <div className={classnames(style.FieldInput, style.ButtonText)}> 
              <p>Button Text</p>  
              <input className={style.InputTitle} onChange={(e) => setButtonText(e.target.value)} value={ButtonText} placeholder="Button Text" type="text" />
            </div>
            <div className={classnames(style.FieldInput, style.ButtonLink)}> 
              <p>Button Link</p>  
              <input className={style.InputTitle} onChange={(e) => setButtonLink(e.target.value)} value={ButtonLink} placeholder="Button Link" type="text" />
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
            <div className={style.FormButtons}>
              <div className={style.LHSFormButtons}>
                <FormButton type="submit">Save</FormButton>
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
}

export default ProjectFields