//Composant de la vidéo

import React from 'react'
//  import video from "/assets/drone-moutain.mp4"

export default function VideoHome() {
  return (

    
    <div className='flex-items'>   
      <video autoPlay loop muted max-height="100vh" >
        <source src="/assets/drone-moutain.mp4" type="video/mp4" className='video' />
      </video>
   
          {/* <img src={BanPhotographer} alt='ban-photographer' className='ban__photographer__illu'/> */}
          </div>
 

  )
}