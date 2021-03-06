import { setDoc, doc } from "firebase/firestore";
import { db } from "../../pages/firebase/firebase";
import { getAuth } from "firebase/auth";
import { useAuth } from "../../pages/firebase/firebase";
import { FaRegEdit } from "react-icons/fa";
import NoticeAddSpot from "./NoticeAddSpot";
import { nanoid } from "nanoid";
import { useState, useRef, useMemo } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { photoStyle } from "./PhotoStyle";
import { listOfCountry } from "./ListOfCountry";
import React from "react";
import MapWithNoSSR from "./MapWithNoSSR";

// Validation de formulaire si non empty
// https://stackoverflow.com/questions/41296668/how-do-i-add-validation-to-the-form-in-my-react-component
//! mettre ici la logique d'upload de photo pour les spots
// creuser cette piste https://stackoverflow.com/questions/69035352/how-to-show-image-upload-previews-with-react

const uuid = nanoid();

const center = {
  lat: 48.8588897,
  lng: 2.3200410217200766,
};

const animatedComponents = makeAnimated();

export default function AddSpotForConnectUser() {
  const [position, setPosition] = useState(center);
  const currentUser = useAuth();
  const userWhoAddThePost = getAuth();
  const [photo, setPhoto] = useState(null);
  const storage = getStorage();

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    // console.log(event)
  };

  const handleChangeTags = (tags) => {
    setInputs((values) => ({ ...values, tags }));
  };

  const handleChangeSelect = (country) => {
    setInputs((values) => ({ ...values, country }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await setDoc(doc(db, "spots", uuid), {
      uid: uuid,
      nbLike: 0,
      userWhoAdd: userWhoAddThePost.currentUser.uid,
      published: false,
      lat: position.lat,
      lon: position.lng,
      photoURL: uuid + ".jpg",
      // tags: tags,
      inputs,
    });
    //  refreshPage()
  };
  console.log(inputs);

  function refreshPage() {
    window.location.reload(false);
  }

  async function upload(file) {
    const fileRef = ref(storage, "spots/" + uuid + ".jpg");
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
  }
  function handleClick() {
    upload(photo);
  }
  function handleChangeSetPhoto(e) {
    if (e.target.files[0].type === "image/jpeg") {
      if (e.target.files[0].size < 5242880) {
        if (e.target.files[0]) {
          setPhoto(e.target.files[0]);
        }
      } else {
        alert("Votre photo ne doit pas exc??der 5 mo.");
      }
    } else {
      alert("Merci de selectionner uniquement un fichier image .jpg");
    }
  }

  return (
    <>
      {currentUser && (
        <div className="main body-size">
          <div className="containerAddPost">
            <div className="titleAndMap">
              <h1 className="text-4xl text-zinc-700 mb-6 flex">
                <FaRegEdit /> Ajouter un spot
              </h1>

              <NoticeAddSpot />

              <h2 className="font-semibold text-lg my-6 text-zinc-700">
                1. Choisissez votre image
              </h2>
              <div className="fieldsAddPic">
                <div className="text-sm my-4 py-2 text-center px-4 rounded-full border-0 text-sm font-semibold bg-green-500 text-white hover:bg-green-600 w-44 hover:cursor-pointer">
                  <label htmlFor="file" className="labelFileAddPic">
                    Choisir une image
                  </label>
                  <input
                    id="file"
                    type="file"
                    onChange={handleChangeSetPhoto}
                    className="btnfile"
                    accept=".jpg"
                  />
                </div>
                <br />
                {/* <button onClick={handleClick} className="btn">Envoyer</button> */}
              </div>
              <h2 className="font-semibold text-lg  text-zinc-700 my-6 ">
                2. D??placez le marqueur sur le lieu exact de la prise de vue
              </h2>
              <MapWithNoSSR
                position={position}
                setPosition={setPosition}
                zoom={10}
                minZoom={1}
                spotName={undefined}
                pays={undefined}
                draggable={true}
              />
            </div>

            <div className="formuseredit">
              <h2 className="font-semibold text-lg my-6  text-zinc-700">
                3. Ajoutez les infos de votre spot
              </h2>

              <form onSubmit={handleSubmit}>
                <Select
                  required
                  components={animatedComponents}
                  options={photoStyle}
                  isMulti
                  placeholder="Indiquez le style de photo"
                  onChange={handleChangeTags}
                  name="tags"
                  className="border-green-500"
                />

                <p className="label-login">
                  <label className="label-login">Pays </label>
                </p>
                <Select
                  required
                  placeholder="Indiquez le pays"
                  components={animatedComponents}
                  options={listOfCountry}
                  onChange={handleChangeSelect}
                  name="country"
                  className="border-green-500"
                />

                <p className="label-login">Quel est le nom de votre spot ?</p>
                <input
                  required
                  type="text"
                  name="name"
                  value={inputs.name || ""}
                  onChange={handleChange}
                  className="border rounded py-2 px-2 w-full border-green-500"
                  placeholder={`Ex : Plage du Paradie`}
                />

                <p className="label-login">
                  D??crivez votre spot, type de lieu, ce que vous aimez
                </p>
                <textarea
                  required
                  name="body"
                  value={inputs.body}
                  onChange={handleChange}
                  className="border rounded py-2 px-2 w-full border-green-500"
                  placeholder="D??crivez votre spot, l'acc??s le type de spot, son histoire..."
                ></textarea>

                <p className="label-login">Comment acc??der ?? celui-ci ?</p>
                <input
                  required
                  type="text"
                  name="acces"
                  value={inputs.acces || ""}
                  onChange={handleChange}
                  className="border rounded py-2 px-2 w-full border-green-500"
                  placeholder={`Ex : Est-ce payant ? Il y a un parking ? Randonn??es ? Facile ou difficile d'acc??s...`}
                />

                <p className="label-login">Quel est l'heure id??ale ?</p>
                <select
                  required
                  name="moment"
                  value={inputs.moment}
                  onChange={handleChange}
                  className="border rounded py-2 px-2 w-full border-green-500"
                >
                  <option value="coucher de soleil">Coucher de soleil</option>
                  <option value="lever de soleil">Lever de soleil</option>
                  <option value="nuit">Nuit</option>
                  <option value="toute la journ??e">La journ??e</option>
                </select>

                <p className="label-login">Quelle saison est la meilleure ?</p>
                <select
                  required
                  name="saison"
                  value={inputs.saison}
                  onChange={handleChange}
                  className="border rounded py-2 px-2 w-full border-green-500"
                >
                  <option value="toutes les saisons">Toutes les saisons</option>
                  <option value="printemps">Printemps</option>
                  <option value="??t??">??t??</option>
                  <option value="automne">Automne</option>
                  <option value="hiver">Hiver</option>
                </select>

                <p className="label-login">
                  Votre meilleur conseil pour une photo r??ussie ?
                </p>
                <textarea
                  required
                  type="text"
                  name="conseil"
                  value={inputs.conseil}
                  placeholder={`Quel est votre meilleur conseil ? Vous pouvez ??voquer le mat??riel, focal, cadre...`}
                  className="border rounded py-2 px-2 w-full border-green-500"
                  onChange={handleChange}
                />

                <input
                  type="submit"
                  value="Sauvegarder"
                  onClick={handleClick}
                  className="cta-call"
                />
              </form>

              {/* <UploadPicture /> */}
            </div>
          </div>
        </div>
      )}
      {!currentUser && (
        <>
          <div className="main body-size gridAddPost">
            <div className="containerAddPost">
              <h2 className="title-params">
                <FaRegEdit /> Ajouter un spot
              </h2>
              Pour ajouter un spot vous devez ??tre connect?? ou vous inscrire
              gratuitement.
              <br />
              <a href="/register">Inscrivez-vous gratuitement</a>
            </div>
            <NoticeAddSpot />
          </div>
        </>
      )}
    </>
  );
}
