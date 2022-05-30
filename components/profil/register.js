import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

import { signup, useAuth, logout, login, auth } from "../../pages/firebase/firebase";
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
        pathname: "profil/userboard",
        // query: { returnUrl: router.asPath }
      });
    }
  }, [user, load]);

  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const alertError = "Email ou mot de passe invalide";

  async function handleSignup() {
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert(alertError);
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
    <div className="flex h-screen items-center justify-items-center flex-col m-auto w-screen">
      {!currentUser && (
        <>
          <div className="m-auto w-9/12 text-center">
              <h1 className="text-2xl">
                GWELED<span className="logo-login-color">VA</span>
              </h1>
              <p className="text-gray-700">Email </p>
              <input
                ref={emailRef}
                placeholder="Email"
                className="px-4 py-3 items-center mb-4 border border-gray-300 rounded-md text-base leading-6 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              />
              <p className="text-gray-700">Mot de passe </p>
              <input
                ref={passwordRef}
                type="password"
                placeholder="Password"
                className="px-4 py-3 items-center mb-4 border border-gray-300 rounded-md text-base leading-6 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              />
              <br />
              <button
                className=" mb-4 bg-cyan-500 px-4 py-3 rounded-full text-white items-center"
                disabled={loading}
                onClick={handleLogin}
                type="button"
              >
                S'identifier
              </button>
              <br />
              <button
                className=" mb-4 bg-green-500 px-4 py-3 rounded-full text-white items-center bloc"
                disabled={loading}
                onClick={handleSignup}
                type="button"
              >
                S'inscrire gratuitement
              </button>
            
          </div>
        </>
      )}

      {currentUser && (
        <>
          <Profile />

          <button disabled={loading || !currentUser} onClick={handleLogout}>
            Se déconnecter
          </button>
        </>
      )}
    </div>
  );
}
export default Register;
