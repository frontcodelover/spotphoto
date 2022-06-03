import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Nav from ".././components/nav";
import Footer from ".././components/footer";
import styles from "../styles/Home.module.css";
import React, { useState } from "react";

export default function about() {
  return (
    <>
      <Nav />
      <main className="main">
      <section className="body-size py-9">
        <h1 className="text-9xl w-3/6 font-bold pb-9">Trouvez votre prochain spot photo</h1>
        <h2 className="text-4xl text-zinc-900 pb-4 font-semibold">Qui sommes-nous ?</h2>
        <p>
          Si vous aimez la photo mais que vous ne savez pas
          comment trouver les bons spots, SPOTPHOTO.com est fait pour vous. Vous
          trouvez sur ce site tous les spots les plus emblématiques. <br />
          La Bretagne c'est comme la montagne, ça vous gagne !
        </p>
      </section>
      </main>
      <footer className="bottom-0 fixed">
        <Footer />
      </footer>
    </>
  );
}
