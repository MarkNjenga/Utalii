import { useEffect, useState } from "react";
import SearchDestination from "../components/SearchDestination";
import NavBar from "../components/NavBar";
import { Outlet, Link } from "react-router-dom";

function Parks() {
  const [parks, setParks] = useState([]);
  const [bufferParks, setBufferParks] = useState([]);

  useEffect(() => {
    const fetchParks = async () => {
      const response = await fetch(
        "https://alurageek-api-q6u8.vercel.app/parks"
      );
      const data = await response.json();
      setParks(data);
      // Initializes the bufferParks state with the parks data
      setBufferParks(data);
    };

    fetchParks();
  }, []);

  function filterParks(searchTerm) {
    const filteredParks = parks.filter((park) =>
      park.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Updates Park based on the filter setting
    setBufferParks(filteredParks);
  }

  const parksToRender = bufferParks.map((park) => {
    return (
      <div key={park.id}>
        <h2>{park.name}</h2>
        <img src={park.image} alt={park.name} />
        <h3>{park.location}</h3>
        <p>{park.description}</p>
      </div>
    );
  });

  return (
    <div>
      <NavBar />
      <Outlet />
      <SearchDestination parks={parks} onSearch={filterParks} />
      <Link to="/add-service">
        <button>Add Park</button>
      </Link>
      <div>{parksToRender}</div>
    </div>
  );
}

export default Parks;
