import React, { useState, useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  collection,
  getDocs,
  where,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useAuth, db, auth } from "../firebase/firebase";
import {
  FaMapMarkerAlt,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import SunsetAndSunriseTime from "../../components/spots/SunsetAndSunriseTime";
import { useRouter } from "next/router";
import ImageOfCurrentSpot from "../../components/spots/ImageOfCurrentSpot";
import dynamic from "next/dynamic";
import Footer from "../../components/footer";

function SingleSpot() {
  const MapOfSingleSpot = dynamic(() => import("../../components/spots/SpotMap"), { ssr: false });
  const [spots, setSpot] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [count, setCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bigboss, setBigboss] = useState("");
  const [infoUserWhoAdd, setInfoUserWhoAdd] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const currentUser = useAuth({});
  const Like = useRef(null);
  const [user, load] = useAuthState(auth);
  const [loading] = useState(false);
  const [BookmarkAllreadyOk, setBookmarkAllreadyOk] = useState(false);
  const [perfectMoment, setPerfectMoment] = useState("");
  const [nameOfSpot, setNameOfSpot] = useState(null);

  const AddLike = async (e) => {
    e.preventDefault();
    if (!Like.current?.value) return;
    const spotsSelect = doc(db, "spots", id);
    updateDoc(spotsSelect, { nbLike: Like.current.value, uid: id });
    Like.current.value = +spots.nbLike + 1;
  };

  const GeoCodeHide = () => {
    return (
      <div class="bg-red-200 p-2 rounded text-red-700">
        <div className="flex">
          <FaMapMarkerAlt />
          <div className="pl-1">
            Vous devez être connecté pour voir les coordonnées GPS exactes.
          </div>
        </div>
      </div>
    );
  };

  const GeoCodeShow = () => {
    return (
      <div class="text-orange-500">
        <div className="flex">
          <FaMapMarkerAlt />
          <div className="pl-1">
            {spots.lat.toFixed(5) + " - " + spots.lon.toFixed(5)}
          </div>
        </div>
      </div>
    );
  };

  function alertFav() {
    alert("Vous devez être connecté pour ajouter ce spot dans vos favoris.") 
    ;
  };

  function BookmarkAllready() {
    if (user) {
      if (BookmarkAllreadyOk === false) {
        //*Si pas enregistré
        return (
          <>
            <div className="bg-gray-100 pt-3 pb-2 px-3 mb-2 w-fitbg-right inline-block">
              <button
                onClick={() => addToUser(currentUser, id)}
                className="btn-save text-orange-500"
              >
                <FaRegBookmark />
              </button>
            </div>
            <div className="text-sm text-green-500 font-semibold">
              Ajouter à collection
            </div>
          </>
        );
      } else {
        //*Si déjà enregistré
        return (
          <>
            <div className="bg-gray-100 pt-3 pb-2 px-3 mb-2 w-fitbg-right inline-block">
              <button
                onClick={() => removeToUser(currentUser, id)}
                className="btn-save text-orange-500"
              >
                <FaBookmark />
              </button>
            </div>
            <div className="text-sm text-green-500 font-semibold">
              Dans la collection
            </div>
          </>
        );
      }
    } else {

      return (
        //*Si pas connecté
        <>
          <div className="bg-gray-100 pt-3 pb-2 px-3 mb-2 w-fitbg-right inline-block">
            <button
              onClick={() => alertFav()}
              className="btn-save text-orange-500"
            >
              <FaBookmark />
            </button>
          </div>
          <div className="text-sm text-green-500 font-semibold">
          Ajouter à collection
          </div>
        </>
      );
    }
  }

  const fetchUserInfo = async () => {
    try {
      const docRefUser = doc(db, "users", currentUser?.uid);
      const docss = await getDoc(docRefUser);
      const userTmp = docss.data();
      userTmp.bookMark.map((element) => {
        if (element === id) {
          setBookmarkAllreadyOk(true);
        } else {
          setBookmarkAllreadyOk(false);
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  //*Ajoute le post à l'utilisateur connecté
  const addToUser = async (currentUser, spot) => {
    console.log(currentUser);
    try {
      const addSpotToUser = doc(db, "users", currentUser.uid);
      await updateDoc(addSpotToUser, { bookMark: arrayUnion(spot) });
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  //*enlève le post à l'utilisateur connecté
  const removeToUser = async (currentUser, spot) => {
    console.log(currentUser);
    try {
      const removeSpotToUser = doc(db, "users", currentUser.uid);
      await updateDoc(removeSpotToUser, { bookMark: arrayRemove(spot) });
      return console.log("c'est supprimé");
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  const handleIncrementCount = async () => {
    setCount(+spots.nbLike + 1);
  };

  const deletePost = async (e) => {
    e.preventDefault();
    const deletePostOnlyForUser = doc(db, "spots", id);
    deleteDoc(deletePostOnlyForUser);
    alert("C'est supprimé");
  };

  //* dans un premier temps il faut récupérer tous les users
  //* Si le post contient l'ID de l'user dans userWhoAdd, on récupère son nom et on l'affiche
  useEffect(() => {
    const adminUser = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setBigboss(data?.bigboss);
      } catch (err) {}
    };
    const fetchUserWhoAddThisPost = async () => {
      try {
        // Collection USERS
        const usersRef = collection(db, "users");
        const dataUsers = await getDocs(usersRef);
        const resUsers = dataUsers.docs.map((user) => ({ ...user.data() }));

        // Collection SPOTS COURANT
        const currentSpot = doc(db, "spots", id);
        const dataCurrentSpot = await getDoc(currentSpot);
        //* Renvoit l'id de l'user qui a ajouté le post
        const idOfUserWhoAddThisPost = dataCurrentSpot.data().userWhoAdd;

        //*Tableau vide qui va stocker le pseudo de l'user qui a ajouté le post
        const infoUser = [];

        //*On parcours le tableau des users pour extraire celui qui a ajouté le post
        resUsers.forEach((user) => {
          if (user.uid === idOfUserWhoAddThisPost)
            //* on ajoute au tableau le pseudo de l'user qui a ajouté le post
            infoUser.push(user.inputs.pseudo);
        });

        if (infoUser.length === 0) {
          setInfoUserWhoAdd("");
        } else {
          setInfoUserWhoAdd(
            infoUser.map((user) => (
              <div className="add" key="1">
                Spot ajouté par : {user}
              </div>
            ))
          );
        }
      } catch (err) {
        console.error(err);
        // alert("An error occured while fetching user data");
      }
    };

    const fetchAllSpot = async () => {
      try {
        //* on utilise le state de ID ici
        const docRefSpotCollection = doc(db, "spots", id);
        const data = await getDoc(docRefSpotCollection);
        const currentSpot = data.data();

        setSpot(currentSpot);
        setIsLoading(false);
        setLatitude(currentSpot.lat);
        setLongitude(currentSpot.lon);
        setNameOfSpot(currentSpot.inputs.name);
        setPerfectMoment(currentSpot.inputs.moment);
        // console.log(currentSpot.inputs.name);

        document.title = `${currentSpot.inputs.name} - ${currentSpot.inputs.pays}`;
        fetchUserWhoAddThisPost();
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllSpot();

    //* on utilise dans le tableau des dépendances ID car on s'en sert de son etat pour recuperer les datas

    if (load) return;

    fetchUserInfo();
    // if (!user) return navigate("/");
    adminUser();
    MapOfSingleSpot;
  }, [user, loading, id, load, currentUser]);

  if (isLoading) return <div>Loading...</div>;
  if (spots === null) return <div>Aucune données</div>;

  //   console.log(spots)
  return (
    <>
      <div className="main">
        

        <div className="container-post">
          {/* <ImageCurrentSpot alt={nameOfSpot} /> */}

          <div className="content-post">
            <div className="pr-3 pb-3 flex justify-center bg-neutral-800">
              <ImageOfCurrentSpot />
            </div>

            <div className="px-3 py-9 max-w-screen-xl m-auto">
              {/* {bigboss ? <button onClick={deletePost}>Supprimer</button> : ""} */}

              <div className="flex flex-col md:flex-row lg:flex-row">
                <div className="w-screen pr-8 lg:w-6/12 md:w-6/12">
                  <p className="font-semibold text-lg text-green-500">
                    {spots.inputs?.country?.label}
                  </p>
                  <h1 className="text-4xl text-zinc-700 pb-2">
                    {spots.inputs.name}
                  </h1>
                  <div className="latlon flex pb-1 text-sm text-orange-500">
                    <div className="flex pl-1">
                      {user ? GeoCodeShow() : GeoCodeHide()}
                    </div>
                  </div>

                  <div className="py-3  text-justify">
                    <h2 className="font-semibold text-lg pb-1 text-zinc-700">
                      Description du lieu
                    </h2>
                    <p className="text-zinc-500">{spots.inputs.body}</p>
                  </div>
                  <div className="py-3  text-justify">
                    <h2 className="font-semibold text-lg pb-1 text-zinc-700">
                      Quel est le matériel conseillé ?
                    </h2>
                    <p className="text-zinc-500">{spots.inputs.conseil}</p>
                  </div>
                  <div className="py-3 text-justify">
                    <h2 className="font-semibold text-lg pb-1 text-zinc-700">
                      Accès au spot photo
                    </h2>
                    <p className="text-zinc-500">{spots.inputs?.acces}</p>
                  </div>
                </div>

                <div className="w-screen pr-8 lg:w-6/12 md:w-6/12">
                  <div className="text-right text-3xl pb-9">
                    {BookmarkAllready()}
                  </div>

                  {/* {spots.lat}, {spots.lon} */}
                  <SunsetAndSunriseTime
                    latitude={latitude}
                    longitude={longitude}
                    perfectMoment={perfectMoment}
                  />

                  {infoUserWhoAdd}
                  <div className="likebtn-global">
                    {/* <button className="btn-heart" onClick={() => setCount(count + 1)}>
              <FaHeart className="heart-icon" />
            </button> */}

                    <input
                      id="heart"
                      type="checkbox"
                      onChange={AddLike}
                      ref={Like}
                      onClick={handleIncrementCount}
                      // onClick={() => setCount(+spot.nbLike + 1)}
                      value={+spots.nbLike + 1}
                    />
                    <div className="row">
                      {
                        //Check if message failed
                        count === null ? (
                          <>
                            {" "}
                            <label htmlFor="heart ">❤</label> {spots.nbLike}{" "}
                            personnes ont aimé ce spot
                          </>
                        ) : (
                          <>
                            {" "}
                            <label htmlFor="heart" className="redHeart">
                              ❤
                            </label>
                            {count} personnes ont aimé ce spot
                          </>
                        )
                      }
                    </div>
                    {/* <label htmlFor="heart">❤</label>  
              {(count === null ? spots.nbLike : count)} personnes ont aimé ce spot */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-screen-xl m-auto mb-10 py-3 px-3">
          <MapOfSingleSpot />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SingleSpot;
