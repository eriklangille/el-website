import { Fragment } from 'react'
import ItemBlockSm from '../components/ItemBlockSm';

const buttontest = () => {
  const buttons = [{color: '#3f3f3f', text: 'Read', newWindow: true}, {color: '#3A2F8F', text: 'Edit', newWindow: true}, {color: '#E7292A', text: 'Delete', newWindow: true}]
  
  return (
    <Fragment>
      <br />
      <br />
      <br />
      <br />
      <ItemBlockSm buttons={buttons} Title="How to build a blog with no prior experience" Author="erikl" Date="July 1 2020" Published={false} Image='/img2.jpg' ButtonText="New Click"/>
    </Fragment>
  )
}

export default buttontest