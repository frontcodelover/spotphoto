import React, { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function ImageForHomeSpot(photoURL) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    const storage = getStorage();
    const prePath = "spots" + "/" + photoURL.photoURL + ".jpg";
    const storageRef = ref(storage, prePath);

    getDownloadURL(storageRef)
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);

        // Or inserted into an <img> element
        setUrl(url);
      })
      .catch((error) => {});
  }, [photoURL.photoURL]);

  return (
    <a href={`/spots/${photoURL.photoURL}`}>
      <img src={url} className="home-gallery-img rounded" alt="" />
    </a>
  );
}

export default ImageForHomeSpot;
