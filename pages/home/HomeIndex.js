import VideoHome from "./VideoHome";
import Section from "./Section";
import HomeLastSpots from "./HomeLastSpots";
import CountryHighlightOne from "./CountryHighlightOne";
import CountryHighlightTwo from "./CountryHighlightTwo";
import AboutHome from "./AboutHome";
import CountryHighlightThree from "./CountryHighlightThree";
import { db } from "../firebase/firebase";
import React from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import CountryHighLight from "../../components/home/CountryHighLight";

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
        <CountryHighlightOne />

        <CountryHighlightTwo />
        <CountryHighlightThree />
      </div>
    </>
  );
}
