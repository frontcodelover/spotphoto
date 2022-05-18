import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/router';

import { signup, useAuth, logout, login, auth } from "../firebase/firebase";
import { useRef } from "react";
import Profile from "./profil";

function Register() {
  
  const router = useRouter();
  const [user, load] = useAuthState(auth);
  // const navigate = useNavigate();
  const currentUser = useAuth();

  useEffect(() => {
    if (load) {
      // maybe trigger a loading screen
      return;
    }
    
if (user) {
  router.push({
    pathname: 'profil/userboard',
    // query: { returnUrl: router.asPath }
})
} 

  }, [user, load]);

  const [ loading, setLoading ] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const alertError = "Email ou mot de passe invalide";

  async function handleSignup() {
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert(alertError)

    }
    setLoading(false);
  }


  async function handleLogin() {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert("Email ou mot de passe invalide");
    }
    setLoading(false);
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
    } catch {
      alert("Erreur");
    }
    setLoading(false);
  
  }

  return (
    <div className="body-size main">

            {!currentUser && 
        <>
          <div className="login">
        <div className="login__container">
          <div className="logo-login">GWELED<span className="logo-login-color">VA</span></div>
            <p className="label-login">Email </p>
            <input ref={emailRef} placeholder="Email" className="inputUser" />
            <p className="label-login">Mot de passe </p>
            <input ref={passwordRef} type="password" placeholder="Password" className="inputUser" />
        <button className="login__btn login__google" disabled={ loading } onClick={handleLogin}>
        S'identifier
        </button>
            <button className="btn-register" disabled={ loading } onClick={handleSignup} >
            S'inscrire gratuitement
        </button>

       
     

      </div>
    </div>


              </>
            }

            {currentUser && 
              <>
                <Profile />
              
                <button disabled={ loading || !currentUser } onClick={handleLogout}>Se déconnecter</button>
              </>
            }

     
    </div>
  );
}
export default Register;
