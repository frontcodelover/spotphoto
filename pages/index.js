import styles from "../styles/Home.module.css";
import React from "react";
import Nav from "../components/nav";
import Footer from "./../components/footer";
import { db } from "./firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import CountryHighLight from "../components/home/CountryHighLight";
import CountryHighlightOne from "../components/home/CountryHighlightOne";
import CountryHighlightTwo from "../components/home/CountryHighlightTwo";
import CountryHighlightThree from "../components/home/CountryHighlightThree";
import VideoHome from "../components/home/VideoHome";
import Section from "../components/home/Section";
import AboutHome from "../components/home/AboutHome";
import HomeLastSpots from "../components/home/HomeLastSpots";

// https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type
// https://jsfiddle.net/L1cs6gt5/3/

async function getCountryData(pays) {
  const spotsCollectionRef = collection(db, "spots");
  const queriedCountry = query(
    spotsCollectionRef,
    where("inputs.country.label", "==", pays)
  );
  const data = await getDocs(queriedCountry);
  const spots = data?.docs?.map((doc) => ({
    data: doc.data(),
    id: doc.id,
    uid: doc.data().uid,
  }));
  return spots;
}

async function getCountriesData() {
  const italy = getCountryData("Italie");
  const portugal = getCountryData("Portugal");
  const france = getCountryData("France");

  const data = await Promise.allSettled([italy, portugal, france]);
  return data;
}

export async function getStaticProps() {
  const data = await getCountriesData();

  return {
    props: {
      spots: {
        italyData: data[0].value,
        portugalData: data[1].value,
        franceData: data[2].value,
      },
    },
  };
}

export default function Home({ spots }) {
  return (
    <div className={styles.container}>
      <Nav />

      {/* {console.log(spots)} */}
      <VideoHome />
      <Section />
      <div className="body-size">
        <AboutHome />
      </div>
      <main className="main bg-gray-100">
        <div className="body-size py-16">
          <HomeLastSpots />
        </div>
      </main>
      <main className="main bg-white">
        <div className="body-size py-16">
          {/* <HomeIndex /> */}
          {/* {console.log(spots.italy)} */}
          <CountryHighlightOne />
          <CountryHighLight spots={spots.italyData} />
          <CountryHighlightTwo />
          <CountryHighLight spots={spots.franceData} />
          <CountryHighlightThree />
          <CountryHighLight spots={spots.portugalData} />
        </div>
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
