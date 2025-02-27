import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home"; // Ensure this path is correct
import Hotels from "./pages/Hotels";
import Parks from "./pages/Parks";
import Beaches from "./pages/Beaches";
import Navbar from "./components/NavBar";
import AddServicePage from "./components/AddServicePage";
import Login from './components/login'; // Ensure this path is correct
import Logout from './Logout'; // Ensure this path is correct


const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('auth');
    setIsAuth(authStatus === 'true');
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login  />} />
        <Route path="/logout" element={<Logout setIsAuth={setIsAuth} />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/parks" element={<Parks />} />
        <Route path="/beaches" element={<Beaches />} />
        <Route path="/add-service" element={<AddServicePage />} />
        <Route path="/home" element={isAuth ? <Home /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={isAuth ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
