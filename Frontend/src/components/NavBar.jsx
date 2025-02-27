// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="nav-bar">
      <NavLink to="/" >
        <IoHome size={24} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/parks">Parks</NavLink>
      <NavLink to="/hotels">Hotels</NavLink>
      <NavLink to="/beaches">Beaches</NavLink>
      <NavLink to="/add-service">Add Service</NavLink> {/* New link */}
      <NavLink to="/login">Login</NavLink>
    </nav>
  );
};

export default Navbar;
