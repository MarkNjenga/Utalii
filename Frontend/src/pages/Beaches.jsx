import React, { useState, useEffect } from "react";
import SearchDestination from "../components/SearchDestination";
import NavBar from "../components/NavBar";
import { Outlet, Link } from "react-router-dom";

function Beaches() {
  const [beaches, setBeaches] = useState([]);
  const [bufferBeaches, setBufferBeaches] = useState([]);

  useEffect(() => {
    const fetchBeaches = async () => {
      const response = await fetch(
        "http://127.0.0.1:5555/beaches"
      );
      const data = await response.json();
      setBufferBeaches(data);
      setBeaches(data);
    };
    fetchBeaches();
  }, []);

  const BeachesToRender = bufferBeaches.map((beach) => {
    return (
      <div className="beaches" key={beach.id}>
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
    <div>
      <NavBar />
      <Outlet />
      <SearchDestination onSearch={filterBeaches} />
      {BeachesToRender}
    </div>
  );
}

export default Beaches;
