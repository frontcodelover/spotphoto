import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

export default function Nav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  console.log(user);
  return (
    <Head>
      <title>Create Next App</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
      <header>
        <a href="/" className="logo">
          spot<span className="colorlogo">PHOTO</span>.com
        </a>
        <nav>
          <ul>
            <li>
              <Link href="/les-spots">
                <a className="hover-underline">Les spots</a>
              </Link>
            </li>
            <li>
              <Link href="/account/">
                <a className="hover-underline">Mon compte</a>
              </Link>
            </li>
            <li>
              <Link href="/addspot">
                <a className="hover-underline">
                  {!user ? "Ajouter un spot" : "Ajouter un spot"}
                </a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a className="hover-underline">Qui sommes-nous ?</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </Head>
  );
}
