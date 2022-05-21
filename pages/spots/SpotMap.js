//https://dev.to/tsaxena4k/integrating-next-js-with-leaflet-js-mapbox-1351

import React, { useState, useEffect } from "react";
// import { useParams } from "react-router";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility';
// import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
// import Icon from "./IconSingle";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

export default function spotmap() {
  // //On récupère les paramètres de l'ID de l'URL
  const [spot, setSpot] = useState({ name: "Pas de data geo..." });
  const [position, setPosition] = useState([]);
  const [isBrowser, setIsBrowser] = useState(false);
  const [spotName, setSpotName] = useState("");
  const [pays, setPays] = useState("");
  // // const { id } = useParams();
  const router = useRouter();
  const { id } = router.query;
  // console.log(id);


  const MapWithNoSSR = dynamic(() => import("./Map"), {
    ssr: false
  });

  useEffect(() => {
    const fetchLatLon = async () => {
      try {
        const docRefSpot = doc(db, "spots", id);
        const docss = await getDoc(docRefSpot);
        const spotTmp = docss.data();
        setSpot(spotTmp);

        spotTmp.inputs.name 
          ? setSpotName(spotTmp.inputs.name)
          : setSpotName("Pas de nom");

        spotTmp.inputs.pays
          ? setPays(spotTmp.inputs.pays)
          : setPays("Pas de pays");
        
        spotTmp.lat && spotTmp.lon
          ? setPosition([spotTmp.lat, spotTmp.lon])
          : setPosition([0, 0]);
        
          
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
    };
    fetchLatLon();
  }, [id]);
  
  // console.log(position)
  //Le Marker
  // let DefaultIcon = L.icon({
  //   iconUrl: icon,
  //   shadowUrl: iconShadow,
  // });
  // L.Marker.prototype.options.icon = DefaultIcon;
  if (!spot) return <div>Loading...</div>;

  return (
          // <h1>TA MERE</h1>
    <>
      {
        <div className="map-single">
          {position.length !== 0 &&  ( 
            <MapWithNoSSR position={position} zoom={10} minZoom={4} spotName={spotName} pays={pays}/>
          
          )} 
         
        </div>
      }
    </>
  );
}


// <MapContainer center={position} zoom={14} minZoom={4}>
            //   <TileLayer
            //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            //   />
            //   <Marker position={position}  >
            //     <Popup>
            //       <b>{spot.inputs?.name}</b> <br /> {spot.inputs?.pays}
            //     </Popup>
            //   </Marker>
            // </MapContainer>