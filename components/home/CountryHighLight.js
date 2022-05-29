import React from 'react'

export default function CountryHighLight({ spots }) {
  return (
    <div>
      {/* <h1>{spots[0].uid}</h1> */}
      {spots.map((spot) => (
        <div key={spot.id}>
          <h2 className='text-lg font-semibold text-zinc-900'>{spot.data.inputs.name}</h2>
          <p className='flex text-md text-green-500 font-normal'>{spot.data.inputs?.country.label}</p>
        </div>
      ))}
      <p></p>
    </div>
  )
} 