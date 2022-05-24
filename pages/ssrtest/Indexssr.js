import React from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getStaticProps = async (context) => {
    const id = context.params.id
  
    console.log('id is')
    console.log(id)
  
    let spot = {}
  
    try {
      const ref = collection(db, "spots");

      
      const qsnapshot = await getDocs(ref)
      console.log(qsnapshot)
      qsnapshot.forEach((doc) => {
        const data = doc.data()
        console.log('the title is...')
        console.log(data)
      })
      return {
        props: { spot: spot },
        revalidate: 1,
      }
    } catch (e) {
      console.log(e)
    }
  }
  
  const Details = ({ spot }) => {
    // console.log('posting...')
    // console.log(spot)
    return (
      <div>
        <div className='mx-auto'>
          <h2>Post Details Page</h2>
          <h3 className='text-black'>{spot}</h3>
          <h4>Details here</h4>
        </div>
      </div>
    )
  }

  export default Details
