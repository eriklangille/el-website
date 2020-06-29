import { Fragment } from 'react';
import Head from 'next/head';

import ProjectFields from '../components/ProjectFields';

const NewProject = () => {

  return (
    <Fragment>
      <Head>
        <title>Erik Langille | New Project</title>
      </Head>
      <ProjectFields />
    </Fragment>
  );
}

export default NewProject;