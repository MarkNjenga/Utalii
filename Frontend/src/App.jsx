// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Hotels from "./pages/Hotels";
import Parks from "./pages/Parks";
import Beaches from "./pages/Beaches";
import Navbar from "./components/Navbar";
import AddServicePage from "./components/AddServicePage";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/parks" element={<Parks />} />
        <Route path="/beaches" element={<Beaches />} />
        <Route path="/add-service" element={<AddServicePage />} />
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
