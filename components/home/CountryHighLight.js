import React from 'react'
import Link from 'next/link'
import ImageForHighLight from './ImageForHighLight'
import { FaMapMarkerAlt } from 'react-icons/fa'

export default function CountryHighLight({ spots }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* <h1>{spots[0].uid}</h1> */}
      {spots.map((spot) => (
        <div className="my-2">
           <ImageForHighLight photoURL={spot.uid} />
          <Link href={`/spots/${spot.id}`}>
         <a className="text-lg font-semibold text-zinc-900">
           {" "}
           {spot.data.inputs.name}
            </a>
          </Link>
         <a
           className="link-dep"
           href={`/departement/${spot.data.inputs.departementLower}`}
         >
           <div className="flex text-md text-green-500 font-normal"><FaMapMarkerAlt className="text-xl py-1" /> <div className="pl-1">{spot.data.inputs?.country?.label}</div></div>
         </a>
       </div>
      ))}
      </div>
  )
}