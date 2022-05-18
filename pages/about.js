import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Nav from "./nav";
import Footer from "./footer";
import styles from "../styles/Home.module.css";
import React, { useState } from "react";

export default function about() {
  return (
    <>
      <Nav />
      <main className="main">
        <h1 className="">Qui sommes-nous ?</h1>
        <p>
          Si vous aimez la photo et la Bretagne mais que vous ne savez pas
          comment trouver les bons spots, GWELEDVA est fait pour vous. Vous
          trouvez sur ce site tous les spots les plus emblématiques. <br />
          La Bretagne c'est comme la montagne, ça vous gagne !
        </p>
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </>
  );
}
