import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../pages/firebase/firebase";
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
        <p className="font-semibold text-xl text-zinc-900">
          Votre prochaine photo
        </p>
        <h2 className="text-4xl pb-9 text-green-500 font-bold">
          Les derniers lieux ajoutés
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {spots.map(
          (spot, index) =>
            index < 13 &&
            spot.data.published && (
              <div key={spot.id} className="">
                {/* AJOUTER UN ATL POUR L'IMAGE AVEC LES PROPS */}
                <ImageForHomeSpot photoURL={spot.uid} />
                <div className="my-2">
                  <a
                    href={`/spots/${spot.id}`}
                    className="text-lg font-semibold text-zinc-900"
                  >
                    {" "}
                    {spot.data.inputs.name}
                  </a>
                  <a
                    className="link-dep"
                    href={`/departement/${spot.data.inputs.departementLower}`}
                  >
                    <div className="flex text-md text-green-500 font-normal">
                      <FaMapMarkerAlt className="text-xl py-1" />{" "}
                      <div className="pl-1">
                        {spot.data.inputs?.country?.label}
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
}
