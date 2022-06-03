import { useEffect, useState } from "react";
import { useAuth, upload } from "../../pages/firebase/firebase";

export default function Profile() {
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  function handleClick() {
    upload(photo, currentUser, setLoading);
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  //const dateUser = auth.currentUser.metadata.creationTime

  return (
    <div className="fields">
      <img src={photoURL} alt="Avatar" className="avatar" />
      <div className="change-img">
        <label htmlFor="file" className="label-file">
          Choisir une image
        </label>
        <input
          id="file"
          type="file"
          onChange={handleChange}
          className="btnfile"
          accept=".jpg, .jpeg, .png"
        />
      </div>
      <br />
      <button
        disabled={loading || !photo}
        onClick={handleClick}
        className="btn"
      >
        Envoyer
      </button>
    </div>
  );
}
