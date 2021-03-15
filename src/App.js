import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState(1);
  const itemRef = useRef(null);

  const getPhotos = () => {
    setIsLoading(true);

    //GET
    axios
      .get(
        `https://jsonplaceholder.typicode.com/photos?_page=${item}&_limit=10`
      )
      .then((response) => {
        const newArr = photos.concat(response.data);
        setPhotos(newArr);
        setItem((item) => item + 1);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getPhotos();
  }, []);

  const onIntersect = ([entry], observer) => {
    if (entry.isIntersecting && !isLoading) {
      observer.unobserve(entry.target);
      getPhotos();
      observer.observe(itemRef.current);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      const observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      if (itemRef.current) observer.observe(itemRef.current);
      return () => observer && observer.disconnect();
    }
  }, [isLoading]);

  return (
    <div>
      <div className="row">
        {photos.map((item) => {
          return (
            <div className="column" key={item.id}>
              <img src={item.url} alt="random color selection" />
            </div>
          );
        })}
      </div>
      <div ref={itemRef}>{isLoading && "Loading..."}</div>
    </div>
  );
}

export default App;
