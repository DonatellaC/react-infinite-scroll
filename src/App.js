import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState();
  const pageRef = useRef(null);

  //GET
  const getPhotos = () => {
    setIsLoading(true);
    axios
      .get(
        `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=15`
      )
      .then((response) => {
        const newArr = photos.concat(response.data);
        setPhotos(newArr);
        setPage((page) => page + 1);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Error: Page Not Found");
        console.log(err.response);
      });
  };

  useEffect(() => {
    getPhotos();
  }, []);

  const onIntersect = ([entry], observer) => {
    if (entry.isIntersecting && !isLoading) {
      observer.unobserve(entry.target);
      getPhotos();
      observer.observe(pageRef.current);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      const observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      if (pageRef.current) observer.observe(pageRef.current);
      return () => observer && observer.disconnect();
    }
  }, [isLoading]);

  // DELETE
  const deletePhotos = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/photos/${id}`);
    const newPhotosList = photos.filter((photo) => {
      return photo.id !== id;
    });
    setPhotos(newPhotosList);
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {!error && (
        <div>
          <div className="row">
            {photos.map((item) => {
              return (
                <div className="column" key={item.id}>
                  <img
                    src={item.url}
                    alt={item.title}
                    onClick={() => deletePhotos(item.id)}
                  />
                </div>
              );
            })}
          </div>
          <div ref={pageRef}>{isLoading && "Loading..."}</div>
        </div>
      )}
    </div>
  );
}

export default App;
