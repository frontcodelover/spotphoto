// import { useCallback, useMemo, useRef, useState } from 'react'
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
// // import { Icon } from './Icon';


// function DraggableMarker({ position, setPosition }) {
//   const [draggable, setDraggable] = useState(true)
//   const markerRef = useRef(null)

//   const eventHandlers = useMemo(
//     () => ({
//       dragend() {
//         const marker = markerRef.current
//         if (marker != null) {
//           setPosition(marker.getLatLng())
//         } 
//       },
//     }),
//     [setPosition],
//   )

//   const toggleDraggable = useCallback(() => {
//     setDraggable((d) => !d)
//   }, [])

//   return (
//     <Marker
//       draggable={draggable}
//       eventHandlers={eventHandlers}
//       position={position}
//       ref={markerRef}
//       >
//       <Popup minWidth={90}>
//         <span onClick={toggleDraggable}>
//           {draggable
//             ? 'Déplacez le marqueur sur le lieu de la photo'
//             : 'Cliquez ici pour bouger le marqueur'}
//         </span>
//       </Popup>
//     </Marker>
//   )
// } 

// export const MapsResquest = ({ position, setPosition }) => {
//   function draggableMarkerExample(position, setPosition) {
//     return (
//       <>
//         <h2 className="titleAddSpotItem">2. Indiquez le lieu du spot photo</h2>
//         <div className="subTitleAddSpotItem">Ajoutez le lieu exact de la photo en déplacant le marqueur sur la carte.</div>
//       <MapContainer center={position} zoom={2} >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//         <DraggableMarker position={position} setPosition={setPosition} />
//       </MapContainer>
//           </>
//     )
//   }

//   return (
//     <div className="map-single">
//       {draggableMarkerExample(position, setPosition)}
//     </div>
//   );
// }