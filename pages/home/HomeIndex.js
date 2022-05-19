import VideoHome from "./VideoHome";
import React from "react";
import Section from "./Section";
import HomeLastSpots from "./HomeLastSpots";

export default function HomeIndex() {
  return (
    <>
      <div className="flex-container">
        <VideoHome />
        <Section />
      </div>
      <div className="body-size">
       
          <HomeLastSpots />
          
        
      </div>
    </>
  );
}
