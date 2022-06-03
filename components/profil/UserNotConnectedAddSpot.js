import Link from "next/link";
import React, { useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useRouter } from "next/router";

export default function () {
  // const router = useRouter()
  // useEffect(() => {
  //     setTimeout(() => {
  //         router.push('/account')

  //     },5000
  //     )
  // },[])

  return (
    <div className="main body-size">
      <h1 className="text-4xl text-zinc-700 mb-6 flex">
        <FaRegEdit /> Ajouter un spot
      </h1>
      <h2>Vous allez être redirigé automatiquement</h2>
      <p className="pb-9">
        {" "}
        Si vous souhaitez ajouter un post vous devez vous connecter ou vous
        inscrire gratuitement.
      </p>
      <Link href="/account">
        <a className="text-sm my-4 py-2 text-center px-4 rounded-full border-0 text-sm font-semibold bg-green-500 text-white hover:bg-green-600 w-44 hover:cursor-pointer">
          S'inscrire
        </a>
      </Link>
    </div>
  );
}
