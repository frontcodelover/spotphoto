import { db } from "../firebase/firebase";
import React from "react";
import { collection, getDocs } from "firebase/firestore";
import Coucou from "../../components/coucou";

export async function getStaticProps() {
  const spotsCollectionRef = collection(db, "spots");
  const data = await getDocs(spotsCollectionRef);
  const spots = data?.docs?.map((doc) => ({
    data: doc.data(),
    id: doc.id,
    uid: doc.data().uid,
  }));

  return {
    props: {
      spots: spots || null,
    },
  };
}

export default function Details({ spots }) {
  return (
    <Coucou spots={spots} />
)}