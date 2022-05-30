import React, {useState, useEffect} from 'react'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/router";

export default function ImageOfCurrentSpot(nameOfSpot) {
    const [url, setUrl] = useState('')
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
   
    const storage = getStorage();
    const prePath = "spots" + '/' + id + '.jpg';
    const storageRef = ref(storage, prePath);
    // const path = storageRef.bucket + "/"+ storageRef.fullPath;
    
    getDownloadURL(storageRef)
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'
  
      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
        
      };
      xhr.open('GET', url);

      setUrl(url)
      
      
  
      // // Or inserted into an <img> element
      // const img = document.getElementById('myimg');
      // img.setAttribute('src', url);
    })
    .catch((error) => {
      // Handle any errors
    });
  }, [nameOfSpot, id])

       
    
    return (
        
            <img src={url} className="single-image object-scale-down" alt={nameOfSpot.alt} />
            
     
        )
       
       
}