import axios from 'axios';
import Head from 'next/head'
import isempty from 'is-empty'
import { apiUrl } from '../../../utils/refLinks'
import { useRouter } from 'next/router'
import { useState, useEffect, useContext, Fragment } from 'react'
import { UserContext } from '../../../utils/UserContext.js';
import getImageUrl from '../../../utils/getImageUrl';

import ProjectFields from '../../../components/ProjectFields'

const EditProject = (props) => {
  
  const [ProjectData, setProjectData] = useState({});
  const user = useContext(UserContext);
  const router = useRouter()

  const id = router.query.id;

  const getProjectData = async(id) => {
    let data = {};

    if(isNaN(id)) {
      return;
    }
  
    if(user.auth.isAuthenticated) {
      await axios.get(`${apiUrl}/api/projects/${id}`)
      .then(res => {
        data = res.data;
      }).catch((err) => {
        console.error(err);
      });
      setProjectData(data);
      }
    }

  useEffect(() => {
    getProjectData(id);
  }, [user]);

  return (
    <Fragment>
      <Head>
        <title>Erik Langille | Edit Project</title>
      </Head>
      {isempty(ProjectData) ? null : <ProjectFields Id={ProjectData.project_id} Title={ProjectData.title} ShortDescription={ProjectData.description} Published={ProjectData.published} StartDate={ProjectData.start_date} FinishDate={ProjectData.finish_date} ButtonLink={ProjectData.button_link} ButtonText={ProjectData.button_text} Image={getImageUrl(ProjectData.image, ProjectData.image_ext)} /> }
    </Fragment>
  );
};

export default EditProject