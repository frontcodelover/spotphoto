import VideoHome from "../../components/home/VideoHome";
import Section from "../../components/home/Section";
import HomeLastSpots from "../../components/home/HomeLastSpots";
import CountryHighlightOne from "../../components/home/CountryHighlightOne";
import CountryHighlightTwo from "../../components/home/CountryHighlightTwo";
import AboutHome from "../../components/home/AboutHome";
import CountryHighlightThree from "../../components/home/CountryHighlightThree";
import { db } from "../firebase/firebase";
import React from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import CountryHighLight from "../../components/home/CountryHighLight";

var SunCalc = require('suncalc');
var times = SunCalc.getTimes(new Date(), 51.5, -0.1);
var sunriseStr = times.sunrise.getHours() + ':' + times.sunrise.getMinutes();
var sunrisePos = SunCalc.getPosition(times.sunrise, 51.5, -0.1);
var sunsetPos = SunCalc.getPosition(times.sunset, 51.5, -0.1);
var sunriseAzimuth = sunrisePos.azimuth * 180 / Math.PI;

console.log(sunrisePos)
console.log(sunsetPos)
console.log(sunriseAzimuth)

export async function getStaticProps() {
  const spotsCollectionRef = collection(db, "spots");
  const q = query(spotsCollectionRef, where("inputs.country.label", '==', "France"));
  console.log(q);

  const data = await getDocs(q);
  const spots = data?.docs?.map((doc) => ({
    data: doc.data(),
    id: doc.id,
    uid: doc.data().uid,
  }));
  console.log(spots)
  
  return {
    props: {
      spots: spots || null,
    },   
  }

}




export default function HomeIndex(spots) {
  return (
    <>
      
        <VideoHome />
        <Section />


      <div className="body-size">
        <HomeLastSpots />
        <AboutHome />
       
      </div>
    </>
  );
}
