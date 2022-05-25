import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { FaMapMarkerAlt } from "react-icons/fa";
import ImageForHomeSpot from "./ImageForHomeSpot";

export default function IndexBanner() {
  const [spots, setSpots] = useState([]);
  const [nameOfSpot, setNameOfSpot] = useState("");

  useEffect(() => {
    getSpots();
  }, []);

  function getSpots() {
    const spotsCollectionRef = collection(db, "spots");
    getDocs(spotsCollectionRef)
      .then((response) => {
        const spot = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
          uid: doc.data().uid,
        }));
        setSpots(spot);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <>
      <div className="title-section">
        <p className="head-title-banner">Votre prochaine photo</p>
        <h2 className="text-3xl pb-6 text-green-500">Les derniers lieux ajoutés</h2>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
        {spots.map(
          (spot, index) =>
            index < 15 &&
            spot.data.published && (
              <div key={spot.id} className="">
                {/* AJOUTER UN ATL POUR L'IMAGE AVEC LES PROPS */}
                <ImageForHomeSpot photoURL={spot.uid} />
                <div className="">
                  <a href={`/spots/${spot.id}`} className="spot-nom-two">
                    {" "}
                    {spot.data.inputs.name}
                  </a>
                  <a
                    className="link-dep"
                    href={`/departement/${spot.data.inputs.departementLower}`}
                  >
                    <FaMapMarkerAlt /> {spot.data.inputs?.country?.label}
                  </a>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
}
