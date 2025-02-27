import React, { useState, useEffect } from "react";
import SearchDestination from "../components/SearchDestination";
import NavBar from "../components/NavBar";
import { Outlet, Link } from "react-router-dom";

function Beaches() {
  const [beaches, setBeaches] = useState([]);
  const [bufferBeaches, setBufferBeaches] = useState([]);

  useEffect(() => {
    const fetchBeaches = async () => {
      const response = await fetch("https://kenya-tours.onrender.com/beaches");
      const data = await response.json();
      setBufferBeaches(data);
      setBeaches(data);
    };
    fetchBeaches();
  }, []);

  const BeachesToRender = bufferBeaches.map((beach) => {
    return (
      <div className="beach" key={beach.id}>
        <h1>{beach.name}</h1>
        <img src={beach.image} alt={beach.name} />
        <p>{beach.description}</p>
        <h3>{beach.location}</h3>
      </div>
    );
  });

  function filterBeaches(searchTerm) {
    const filteredBeaches = beaches.filter((beach) =>
      beach.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBufferBeaches(filteredBeaches);
  }

  return (
    <div className="beaches-page">
      <NavBar />
      <Outlet />
      <div className="search-bar">
        <SearchDestination onSearch={filterBeaches} />
      </div>
      <div className="beaches-list">{BeachesToRender}</div>
    </div>
  );
}

export default Beaches;
