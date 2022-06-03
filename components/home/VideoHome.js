import React from "react";

export default function VideoHome() {
  return (
    <div className="flex top-0 h-3/6">
      <video autoPlay loop muted width="100%">
        <source src="/assets/drone-moutain.mp4" type="video/mp4" className="" />
      </video>

      {/* <img src={BanPhotographer} alt='ban-photographer' className='ban__photographer__illu'/> */}
    </div>
  );
}
