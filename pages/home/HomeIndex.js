import VideoHome from "./VideoHome";
import React from "react";
import Section from "./Section";
import HomeLastSpots from "./HomeLastSpots";
import CountryHighlightOne from "./CountryHighlightOne";
import CountryHighlightTwo from "./CountryHighlightTwo";
import AboutHome from "./AboutHome";
import CountryHighlightThree from "./CountryHighlightThree";

export default function HomeIndex() {
  return (
    <>
      <div className="flex-container">
        <VideoHome />
        <Section />
      </div>
      <div className="body-size">
        <HomeLastSpots />
        <AboutHome />
        <CountryHighlightOne />
        <CountryHighlightTwo />
        <CountryHighlightThree />
      </div>
    </>
  );
}
