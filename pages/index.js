import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import HomeIndex from "./home/HomeIndex";

export default function Home() {

  const [user, setUser] = useState(null);
  
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
  
    })
  return (
    
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <header>
            <a href="/" className="logo">spot<span className='colorlogo'>PHOTO</span>.com</a>
            <nav>    
              <ul>
                <li><Link href="/les-spots" className="hover-underline">Les spots</Link></li>
                <li><Link href="/register/" className="hover-underline">{user? "Mon compte" : "S'inscrire"}</Link></li>
                <li><Link href="/addspot" className="hover-underline">{user ? "Ajouter un spot" : "Ajouter un spot"}</Link></li>
                <li><Link href="/a-propos" className="hover-underline">Qui sommes-nous ?</Link></li>
              </ul>
            </nav>
        </header>
      </Head>

      <main className="main">
        <HomeIndex />
        
      </main>

      <footer className={styles.footer}>
       
      </footer>
    </div>
  )
}