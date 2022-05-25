import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import HomeIndex from "./home/HomeIndex";
import Nav from "../components/nav";
import Footer from "./footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <Nav />

      <main className="main">
        <HomeIndex />
      </main>

      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
