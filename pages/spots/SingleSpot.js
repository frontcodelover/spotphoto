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
// import { useParams } from 'react-router';
import { useAuth, db, auth } from "../firebase/firebase";
import {
  FaRegClock,
  FaMapMarkerAlt,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
// import SpotMap from "./SpotMap";
// import SunsetAndSunriseTime from './SunsetAndSunriseTime';
import { useRouter } from "next/router";
// import ImageCurrentSpot from "./ImageCurrentSpot";
import dynamic from "next/dynamic";

const MyAwesomeMap = dynamic(
  () => import("./spotmap"), 
  { ssr: false }
  );



function SingleSpot() {
  const [spots, setSpot] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [count, setCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bigboss, setBigboss] = useState("");
  const [infoUserWhoAdd, setInfoUserWhoAdd] = useState("");
  const router = useRouter();
  const { id } = router.query;
  // const { id } = useParams();
  const currentUser = useAuth({});
  const Like = useRef(null);
  const [user, load] = useAuthState(auth);
  const [loading] = useState(false);
  const [BookmarkAllreadyOk, setBookmarkAllreadyOk] = useState(false);
  const [nameOfSpot, setNameOfSpot] = useState(null);

  const AddLike = async (e) => {
    e.preventDefault();
    if (!Like.current?.value) return;
    const spotsSelect = doc(db, "spots", id);
    updateDoc(spotsSelect, { nbLike: Like.current.value, uid: id });
    Like.current.value = +spots.nbLike + 1;
  };

  function BookmarkAllready() {
    if (BookmarkAllreadyOk === false) {
      //*Si pas enregistré
      return (
        <>
          <button
            onClick={() => addToUser(currentUser, id)}
            className="btn-save"
          >
            <FaRegBookmark />
          </button>
        </>
      );
    } else {
      //*Si déjà enregistré
      return (
        <>
          <button
            onClick={() => removeToUser(currentUser, id)}
            className="btn-save"
          >
            <FaBookmark />
          </button>
        </>
      );
    }
  }

  const fetchUserInfo = async () => {
    try {
      const docRefUser = doc(db, "users", currentUser.uid);
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
        setBigboss(data.bigboss);
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
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
        console.log(currentSpot.inputs.name);

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
    MyAwesomeMap
  }, [user, loading, id, load, currentUser]);

  if (isLoading) return <div>Loading...</div>;
  if (spots === null) return <div>Aucune données</div>;

  //   console.log(spots)
  return (
    <div className="main">
      <div className="body-size">
        <div className="container-post">
          <MyAwesomeMap />

          {/* <ImageCurrentSpot alt={nameOfSpot} /> */}

          <div className="content-post">
            {bigboss ? <button onClick={deletePost}>Supprimer</button> : ""}

            {/* <ImageCurrentSpot /> */}

            {BookmarkAllready()}

            {/* <button onClick={() => addToUser(currentUser, id)} className="btn-save">{BookmarkAllready()}</button>
            <br />
            <button onClick={() => removeToUser(currentUser, id)} className="btn-save">{BookmarkAllready()}</button> */}

            <p className="head-title-banner">{spots.inputs.pays}</p>
            <h1 className="title-banner">{spots.inputs.name}</h1>
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
                    <div>
                      {" "}
                      <label htmlFor="heart">❤</label> {spots.nbLike} personnes
                      ont aimé ce spot
                    </div>
                  ) : (
                    <div>
                      {" "}
                      <label htmlFor="heart" className="redHeart">
                        ❤
                      </label>
                      {count} personnes ont aimé ce spot
                    </div>
                  )
                }
              </div>
              {/* <label htmlFor="heart">❤</label>  
              {(count === null ? spots.nbLike : count)} personnes ont aimé ce spot */}
            </div>

            {spots.inputs.body}

            <div className="moment">
              <FaRegClock /> {spots.inputs.moment}
            </div>

            {/* <SunsetAndSunriseTime latitude={latitude} longitude={longitude} /> */}
            {spots.inputs.conseil}
            <div className="latlon">
              <FaMapMarkerAlt />
              {spots.lat}, {spots.lon}
              {infoUserWhoAdd}
            </div>
          </div>
        </div>

        {/* <SpotMap />  */}
        <div className=""></div>
      </div>
    </div>
  );
}

export default SingleSpot;
