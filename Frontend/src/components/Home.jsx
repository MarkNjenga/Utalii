import NavBar from "./NavBar"
import { Outlet } from "react-router-dom"
const fetchProtectedData = async () => {
  const token = localStorage.getItem('access_token');
  const response = await fetch('https://kenya-tours.onrender.com/home', {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      },
  });

  // Handle the response as needed
};


function Home() {
  
  return (
    <div> 
      <div className="hz-container">
      <NavBar />
        <Outlet />
      <div className="home-container">
        <h1>EXPLORE BEYOND THE ORDINARY</h1>
        <p>
          "Karibu Kenya" translates to "Welcome to Kenya" in Swahili. It's a
          common phrase used to greet visitors and make them feel at home.
          Kenya, located in East Africa, is known for its stunning landscapes,
          wildlife, and rich cultural heritage. The phrase captures the
          hospitality and warmth that Kenya is renowned for, whether you're
          arriving as a tourist or simply engaging with Kenyan culture.
        </p>
      </div>

      <section className="container">
        <div className="image-container">
          <img src="https://tinyurl.com/4e8dxjbf" alt="lion" />
          <h3> National Park</h3>
          <p>Wildlife: Rich in diverse species including cheetahs, giraffes, hippos, and numerous bird species.</p>

        </div>
        <div className="image-containers">
          <img src="https://tinyurl.com/szj326jz" alt="beach" />
          <h3>Beach</h3>
          <p>Beaches: Kenya boasts stunning beaches along the Indian Ocean, offering opportunities for relaxation and water sports.</p>

        </div>
        <div className="image-containert">
          <img src="https://tinyurl.com/hyhvc859" alt="hotel"></img>
          <h3>Hotels</h3>
          <p>Accommodation: Kenya offers a range of hotels, from luxury resorts to budget-friendly options.</p>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <h3>Contact Us</h3>
          <p>Email: info@kenyatours.com</p>
          <p>Phone: +254 712 345 678</p>
          <p>Address: 123 Main Street, Nairobi, Kenya</p>
        </div>
      </footer>
      
    </div>

    
    </div>
  );
}

export default Home;
