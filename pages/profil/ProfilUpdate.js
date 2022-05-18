import { useState } from "react";
import { doc, updateDoc  } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getAuth } from "firebase/auth";
import { FaWrench } from "react-icons/fa"



export default function ProfilUpdate() {
   // user collection
  const [inputs, setInputs] = useState({});
  const auth = getAuth();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
     setInputs(values => ({...values, [name]: value}))
   }
 
   const handleSubmit = async (event) => {
     event.preventDefault();

     await updateDoc(doc(db, "users", auth.currentUser.uid), {
       uid: auth.currentUser.uid,
       bigboss: false,
       inputs,
      });
      refreshPage()
  }
  
  function refreshPage() {
    window.location.reload(false);
  }
  
    return (
      <form onSubmit={handleSubmit} className="formuseredit">
        <h2 className="title-params">Editer mon profil <FaWrench /></h2>
        <p className="label-login"><label>Votre pseudo <small>(sera affiché publiquement)</small></label ></p>
      <input 
        type="text" 
        name="pseudo" 
        value={inputs.pseudo || ""} 
        onChange={handleChange}
        className="input-user"
      />
      
        <p className="label-login">
          <label>Votre prénom :</label></p>
      <input 
        type="text" 
        name="name" 
        value={inputs.name || ""} 
        onChange={handleChange}
        className="input-user"
      />
        
        <p className="label-login"><label className="label-login">Votre nom :</label></p>
      <input 
        type="text" 
        name="surname" 
        value={inputs.surname || ""} 
        onChange={handleChange}
        className="input-user"
          />
      <p className="label-login"><label className="label-login">Votre date de naissance :</label></p>
        <input 
          type="date" 
          name="age" 
          value={inputs.age || ""} 
          onChange={handleChange}
          className="input-user"  
          />
        
        <p className="label-login"><label className="label-login">Commune : </label></p>
         <input 
          type="text" 
          name="ville" 
          value={inputs.ville || ""} 
          onChange={handleChange}
          className="input-user"
          />
        

        <p className="label-login"><label className="label-login">Votre adresse :</label></p>
         <input 
          type="text" 
          name="adresse" 
          value={inputs.adresse || ""} 
          onChange={handleChange}
          className="input-user"
          />
          
          <p className="label-login"><label className="label-login">Code postal :</label></p>
         <input 
          type="number" 
          name="codePostal" 
          value={inputs.codePostal || ""} 
          onChange={handleChange}
          className="input-user"
          />
        
        <p className="label-login"><label className="label-login">Quelle type de photo aimez-vous prendre ? Depuis quand...</label></p>
         <input 
          type="textarea" 
          name="bio" 
          value={inputs.bio || ""} 
          onChange={handleChange}
          className="input-user"
          />
        
        <p className="label-login"><label className="label-login">Où pouvons-nous vous trouver ? <small>(instagram, facebook, site web...)</small></label></p>
         <input 
          type="test" 
          name="personnalLink" 
          value={inputs.personnalLink || ""} 
          onChange={handleChange}
          className="input-user"
          />
           <br />
        <input type="submit" value="Sauvegarder" className="cta-call"/>
    </form>
    );
}
