import { useState, useEffect } from "react";
import SearchDestination from "../components/SearchDestination";
import NavBar from "../components/NavBar";
import { Outlet, Link } from "react-router-dom";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [bufferHotels, setBufferHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      const response = await fetch("https://kenya-tours.onrender.com/hotels");
      const data = await response.json();
      setBufferHotels(data);
      setHotels(data);
    };
    fetchHotels();
  }, []);

  const HotelsToRender = bufferHotels.map((hotel) => {
    return (
      <div className="hotel" key={hotel.id}>
        <h1>{hotel.name}</h1>
        <img src={hotel.image} alt={hotel.name} />
        <p>{hotel.description}</p>
        <h3>{hotel.location}</h3>
      </div>
    );
  });

  function filterHotels(searchTerm) {
    const filteredHotels = hotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBufferHotels(filteredHotels);
  }

  return (
    <div className="hotels-page">
      <NavBar />
      <Outlet />
      <div className="search-bar">
        <SearchDestination onSearch={filterHotels} />
      </div>
      <div className="hotels-list">{HotelsToRender}</div>
    </div>
  );
}

export default Hotels;
