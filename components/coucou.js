import React from 'react'

export default function Coucou({ spots }) {
  return (
    <div>
      {/* <h1>{spots[0].uid}</h1> */}
      {spots.map((spot) => (
        <div key={spot.id}>
          <h2>{spot.uid}</h2>
          <p>{spot.data.inputs?.body}</p>
        </div>
      ))}
      <p></p>
    </div>
  )
} 