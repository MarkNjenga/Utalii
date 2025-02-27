import { useEffect, useState } from "react";
import SearchDestination from "../components/SearchDestination";
import NavBar from "../components/NavBar";
import { Outlet, Link } from "react-router-dom";

function Parks() {
  const [parks, setParks] = useState([]);
  const [bufferParks, setBufferParks] = useState([]);

  useEffect(() => {
    const fetchParks = async () => {
      const response = await fetch("https://kenya-tours.onrender.com/parks");
      const data = await response.json();
      setParks(data);
      setBufferParks(data);
    };
    fetchParks();
  }, []);

  function filterParks(searchTerm) {
    const filteredParks = parks.filter((park) =>
      park.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBufferParks(filteredParks);
  }

  const parksToRender = bufferParks.map((park) => {
    return (
      <div className="park" key={park.id}>
        <h2>{park.name}</h2>
        <img src={park.image} alt={park.name} />
        <h3>{park.location}</h3>
        <p>{park.description}</p>
      </div>
    );
  });

  return (
    <div className="parks-page">
      <NavBar />
      <Outlet />
      <div className="search-bar">
        <SearchDestination parks={parks} onSearch={filterParks} />
      </div>
      <div className="parks-list">{parksToRender}</div>
    </div>
  );
}

export default Parks;
