import React from "react";
import Nav from ".././components/nav";
import Footer from "../components/footer";
import Register from "../components/profil/Register";
import mountain from "../public/assets/mountain.jpg";
import Image from "next/image";

export default function account() {
  return (
    <>
      <Nav />
      <div className="relative flex" >
      <Image src={mountain} className="z-20 absolute blur-sm object-contain w-full h-screen"/>
      <Register />
      </div>
      <Footer />
    </>
  );
}
