import { db } from "../../pages/firebase/firebase";
import React from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import Coucou from "../coucou";

export async function getStaticProps() {
  const spotsCollectionRef = collection(db, "spots");
  const q = query(spotsCollectionRef, where("inputs.country.label", '==', "Italy"));
  console.log(q);

  const data = await getDocs(q);
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

export default function Testeurssr({ spots }) {
  return <Coucou spots={spots} />;
}
