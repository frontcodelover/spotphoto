// ecran qui affiche les infos d'un utilisateur connecté
// youtube.com/watch?v=O4db8oycL0k&t=3072s
// https://stackoverflow.com/questions/58547671/firebase-user-profile-add-custom-fields
// Afficher la liste des spots ajoutés par l'utilisateur grâce à UID
// avoir une liste de favoris avec les ID des spots

import { useState, useEffect } from "react";
import { logout, auth, db } from "../firebase/firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
// import { useNavigate } from "react-router-dom";
import Profile from "./profil";
import Register from "./Register";
import ProfilUpdate from "./ProfilUpdate";
import {collection, getDocs } from "firebase/firestore"; 
import {FaGlobeAmericas, FaBirthdayCake, FaMapMarkerAlt} from "react-icons/fa"
import Nav from "../../components/nav";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "../../components/footer";


export default function UserBoard() {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [user, load] = useAuthState(auth);
  // const navigate = useNavigate();
  const [spotNameBookMark, setSpotNameBookMark] = useState("");
  const [infoCurrentUser, setInfoCurrentUser] = useState("")
  const currentUser = getAuth();
  const router = useRouter()
  const { pid } = router.query
  
  async function handleLogout() {
        setLoading(true);
        try {
          logout();
        } catch {
          alert("Error!");
        }
        setLoading(false);
      
  }


  // Permet d'afficher les infos user pour l'id correspondant

  useEffect(() => {
    
  const fetchBookmarkPost = async () => {
    try {
      
      //Collection USER
      const usersRef = collection(db, "users")
      const dataUsers = await getDocs(usersRef);
      const resUsers = dataUsers.docs.map((user) => ({...user.data()}) )

      // Collection SPOTS
      const postsCollectionRef = collection(db, "spots")
      const data = await getDocs(postsCollectionRef);
      const res = data.docs.map((doc) => ({...doc.data()}) )

      // Tableaux vides qui permettent de stocker les infos
      const bookmarkedPost = []
      const infoUser = []

      // On détermine si l'iud de l'user est l'user courant dans notre DB
      const currentUserId = resUsers.filter(user => user.uid === currentUser.currentUser.uid)
      // console.log(currentUserId[0].bookMark)
      
      //? on map les bookmarks de Users pour un iud 
      res.forEach(doc => {
        if (currentUserId[0].bookMark.includes(doc.uid)) {
          bookmarkedPost.push(doc)
        }
      })
      console.log(bookmarkedPost)
      
      //? on map les infos de Users pour un iud 
      //const arr = res.filter(doc => currentUserId[0].bookMark.includes(doc.uid));
      resUsers.forEach(document => {
        if (currentUserId[0].uid.includes(document.uid)) {
          infoUser.push(document)
        }   
      })
      
      setIsLoading(true)
     
      //*Display spot info
      if (bookmarkedPost.length === 0) {
        setSpotNameBookMark("Aucun spot favoris")
      } else {
        setSpotNameBookMark(bookmarkedPost.map(spot =>
          <div key={spot.uid ? spot.iud : "no spot"} className="grid-banner hover-scale-card">
            <a href={`/spots/${spot.uid}`}><img src={spot.imgUrl} alt={`${spot.inputs.name ? spot.inputs.name : "Aucun spot"}`} className="home-gallery-img" /></a>
            <div className="link-card">
            {/* {{"pid" : spot.uid}} */}
            <Link href="/spots/[id]" as={`/spots/${spot.uid}`} className='spot-nom-two'>
              <a>{spot.inputs.name}</a>
            </Link>
              {/* <link href={`/spots/${pid}`} className='spot-nom-two' > {spot.inputs.name}</link> */}
              {/* <link className='link-dep' href={`/departement/${spot.inputs.departementLower}`}><FaMapMarkerAlt /> {spot.inputs.departement}</link> */}
            </div>
          </div>
        ))
      }  
    
      //*Display user info
      setInfoCurrentUser(infoUser.map(user =>
        <div key={user.uid}>
          <div className="badge body-size">
               <div className="picuser">
                <Profile />
            </div>
            <div className="">
             
              <h1 className="text-2xl">{user.inputs.pseudo ? user.inputs.pseudo : "Non renseigné"}</h1>
                <p className="text-lg pt-3 pb-9"> {user.inputs.bio ? user.inputs.bio : "Vous n'avez pas encore renseigné votre bio"} </p>
                <div className="infouser-detail">

                <div className="flex align-middle"><FaBirthdayCake className="pr-2 pt-2 text-xl"/> {user.inputs.age ? user.inputs.age : "Non renseigné"} <br /></div>
                <div className="flex align-middle"><FaGlobeAmericas className="pr-2 pt-2 text-xl"/> {user.inputs.personnalLink ? user.inputs.personnalLink : "Non renseigné"} <br /></div>
                <div className="flex align-middle"><FaMapMarkerAlt className="pr-2 pt-2 text-xl"/> {user.inputs.codePostal ? user.inputs.codePostal : "non renseigné"} {user.inputs.ville ? user.inputs.ville : ""}</div>
              </div>
            </div>
            </div>
          </div>
      )) 
    }
    catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    } 
    }
    if (isLoading) {
      
      fetchBookmarkPost();
      setIsLoading(false)
      if (load) {
    return
    }
    }
    // if (!user) navigate(`/register`);

  }, [user, load, currentUser]);

  if (!isLoading) return <div>Loading...</div>;


  return (
    <>
         {!currentUser && 
        <>
                <Register />
        </>
        }
      {currentUser &&    
      <>  
      <Nav />   
          <div className='main'>
          <div className="page-account">
           
            {infoCurrentUser}
            <div className='section-home-two'>
              <div className='body-size'>
          <h2 className="title-params">Mes spots favoris</h2>
              <div className="section-post-home">
                {spotNameBookMark}
              </div>
              </div>
              </div>        
            <div className="body-size useredit">
              <ProfilUpdate />           
          <button disabled={ loading || !currentUser } onClick={handleLogout} className="btn-logout">Se déconnecter</button>
          </div> 

          </div>
        </div>
        <Footer />
        </>
          }
      </>
  )
}