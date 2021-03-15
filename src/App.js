import React, { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';

function App() {
  const [photos, setPhotos] = useState([]);

  const getPhotos = (page) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`)
      .then((response) => {
        setPhotos(
          [...photos, ...response.data]
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPhotos();
  }, []);


  return (
    <div className="row">
      {photos.map((photo) => (
        <div className="column" key={photo.id}>
          <img src={`${photo.url}`} alt="placeholder" />
        </div>
      ))}
    </div>
  );
}

export default App;
