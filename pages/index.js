import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import HomeIndex from "./home/HomeIndex";
import Nav from "../components/nav";
import Footer from "./../components/footer";
import { db } from "./firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import CountryHighLight from "../components/home/CountryHighLight";
import CountryHighlightOne from "../components/home/CountryHighlightOne";
import CountryHighlightTwo from "../components/home/CountryHighlightTwo";
import CountryHighlightThree from "../components/home/CountryHighlightThree";

async function getCountryData(pays) {
  const spotsCollectionRef = collection(db, "spots");
  const queriedCountry = query(spotsCollectionRef, where("inputs.country.label", "==", pays));
  const data = await getDocs(queriedCountry);
  const spots = data?.docs?.map((doc) => ({
    data: doc.data(),
    id: doc.id,
    uid: doc.data().uid,
  }));
  return spots;
}

async function getCountriesData() {
const italy = getCountryData('Italy');
const portugal = getCountryData('Portugal');
const france = getCountryData('France');

const data = await Promise.allSettled([italy, portugal, france]);
return data;
}

export async function getStaticProps() {
  const data = await getCountriesData()
  console.log(data)
  return {
    props: {
      spots: {
        italyData: data[0].value,
        portugalData: data[1].value,
        franceData: data[2].value,
      }
    }
  }
}



export default function Home({spots}) {
  return (
    <div className={styles.container}>
      <Nav />

      {/* {console.log(spots)} */}
      <main className="main">
        <HomeIndex />
        {/* {console.log(spots.italy)} */}
        <CountryHighlightOne />
        <CountryHighLight spots={spots.italyData} />
        <CountryHighlightTwo />
        <CountryHighLight spots={spots.franceData} />
        <CountryHighlightThree />
        <CountryHighLight spots={spots.portugalData} />
      </main>

      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}