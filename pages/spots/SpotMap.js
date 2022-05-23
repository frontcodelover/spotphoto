//https://dev.to/tsaxena4k/integrating-next-js-with-leaflet-js-mapbox-1351

import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";

export default function spotmap() {

  const [spot, setSpot] = useState({ name: "Pas de data geo..." });
  const [position, setPosition] = useState([]);
  const [spotName, setSpotName] = useState("");
  const [pays, setPays] = useState("");
  const user = useAuthState(auth);
  const router = useRouter();
  const { id } = router.query;



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
  }, [id, user]);
  
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

          {user[0] != null ? 
            position.length !== 0 && ( 
              <div className="map-single">
                <MapWithNoSSR position={position} zoom={12} minZoom={3} spotName={spotName} pays={pays} />
                </div>
            )
            :
            position.length !== 0 && ( 
              <div className="relative">

              <div className="map-single blur relative grayscale">
                <MapWithNoSSR position={position} zoom={12} minZoom={3} spotName={spotName} pays={pays} />
                </div>
                <div className="absolute z-20 py-5 top-20 bg-red-200 w-full">
                  <div className="text-center text-red-600 text-xl">
                  <Link href="/account/"><a className="underline">Connectez-vous</a></Link> pour voir la carte                 
                  </div>
                </div>
              </div>
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