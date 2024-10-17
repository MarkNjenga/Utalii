// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Hotels from "./pages/Hotels";
import Parks from "./pages/Parks";
import Beaches from "./pages/Beaches";
import Navbar from "./components/NavBar";
import AddServicePage from "./components/AddServicePage";
import Login from './Login';
import Logout from './Logout';

const App = () => {
  const isAuth = localStorage.getItem('auth');

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" component={<Login/>} />
        <Route path="/logout" component={<Logout/>} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/parks" element={<Parks />} />
        <Route path="/beaches" element={<Beaches />} />
        <Route path="/add-service" element={<AddServicePage />} />
        <Route path="/home" render={() => (
          isAuth ? <Home /> : <Redirect to="/login" />
        )} />
        <Redirect from="/" to="/login" />
      </Routes>
    </Router>
  );
};

export default App;



// src/App.js or src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './components/Home';
// import Parks from './components/ParksPage'; // Ensure this path is correct
// import AddServicePage from './components/AddServicePage';
// import ServiceList from './components/ServiceList';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/parks" element={<Parks />} />
//         <Route path="/add-service" element={<AddServicePage />} />
//         {/* Add other routes as needed */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;
