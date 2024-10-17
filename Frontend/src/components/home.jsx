import NavBar from "./NavBar"
import { Outlet } from "react-router-dom"


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
          <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.eastafricasafaristours.com%2Ftsavo-east-national-park%2F&psig=AOvVaw1py0B354_74RxK5uioF-qQ&ust=1729169632588000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPDWqP_4kokDFQAAAAAdAAAAABAS" alt="lion" />
          <h3> National Park</h3>
          <p>Wildlife: Rich in diverse species including cheetahs, giraffes, hippos, and numerous bird species.</p>

        </div>
        <div className="image-containers">
          <img src="https://images.unsplash.com/photo-1633161112703-70b4751e9a97?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="beach" />
          <h3>Beach</h3>
          <p>Beaches: Kenya boasts stunning beaches along the Indian Ocean, offering opportunities for relaxation and water sports.</p>

        </div>
        <div className="image-containert">
          <img src="https://images.unsplash.com/photo-1688496761159-e9df8bf438a8?q=80&w=1884&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="hotel"></img>
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
