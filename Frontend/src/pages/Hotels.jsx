import { useState, useEffect } from "react";
import SearchDestination from "../components/SearchDestination";
import NavBar from "../components/NavBar";
import { Outlet, Link } from "react-router-dom";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [bufferHotels, setBufferHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      const response = await fetch(
        "https://www.google.com/imgres?q=hotel&imgurl=https%3A%2F%2Fimages.bubbleup.com%2Fwidth1920%2Fquality35%2Fmville2017%2F1-brand%2F1-margaritaville.com%2Fgallery-media%2F220803-compasshotel-medford-pool-73868-1677873697-78625-1694019828.jpg&imgrefurl=https%3A%2F%2Fwww.margaritaville.com%2Fstay&docid=3X8tUA05-lIGRM&tbnid=Kpf8HJeYbkkuWM&vet=12ahUKEwirlp78o5WJAxUlzQIHHWfNOPkQM3oECGkQAA..i&w=1920&h=1370&hcb=2&ved=2ahUKEwirlp78o5WJAxUlzQIHHWfNOPkQM3oECGkQAA"
      );
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
    <div>
      <NavBar />
      <Outlet />
      <SearchDestination onSearch={filterHotels} />
      <Link to="/add-service">
        <button>Add Hotel</button>
      </Link>
      <div>{HotelsToRender}</div>
    </div>
  );
}

export default Hotels;
