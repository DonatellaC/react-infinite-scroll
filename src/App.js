import React, { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';

function App() {
  const [photos, setPhotos] = useState([]);

  const getPhotos = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        setPhotos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPhotos();
  }, []);
  console.log("photos", photos);
  return (
    <div className="App">
      {photos.map((photo) => (
        <div key={photo.id}>
          <img src={`${photo.url}`} alt="placeholder" />
        </div>
      ))}
    </div>
  );
}

export default App;
