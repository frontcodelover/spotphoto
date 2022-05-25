import React from 'react'
import SingleSpot from './SingleSpot'
import { useRouter } from 'next/router';
import Nav from '../../components/nav';


export default function spots() {
  
  
  return (
    <div><Nav />
      <SingleSpot /></div>
    )
  }
  

export {spots}
