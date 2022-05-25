import React from 'react'
import AddSpotForConnectUser from '../components/profil/AddSpotForConnectUser'
import Nav from "../components/nav";
import Footer from '../components/footer';
import { useAuth } from './firebase/firebase';
import UserNotConnectedAddSpot from '../components/profil/UserNotConnectedAddSpot';


export default function addspot() {
  const user = useAuth()
  console.log(user)
  return (
    <>
      <Nav />
      {user ? <AddSpotForConnectUser /> : <UserNotConnectedAddSpot />}
      
      <Footer />
    </>
  )
}
