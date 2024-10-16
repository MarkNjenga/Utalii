import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { Outlet, useNavigate } from "react-router-dom";

const AddServicePage = () => {
  const [service, setService] = useState({
    name: "",
    description: "",
    location: "",
    imageUrl: "",
    category: "parks", // Default category
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { category, ...serviceData } = service;

    fetch(`https://alurageek-api-q6u8.vercel.app/${category}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serviceData),
    })
      .then((response) => response.json())
      .then(() => {
        setModalMessage("Service added successfully");
        setModalIsOpen(true);

        setService({
          name: "",
          description: "",
          location: "",
          imageUrl: "",
          category: "parks",
        });

        navigate(`/${category}`);
      })
      .catch((error) => {
        console.error("Error:", error);
        setModalMessage("Error adding service. Please try again.");
        setModalIsOpen(true);
      });
  };

  const modalStyle = {
    display: modalIsOpen ? "flex" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalContentStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "400px",
    width: "90%",
  };

  // Inline styles for the form and button
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #007BFF",
    borderRadius: "8px",
    backgroundColor: "#f8f9fa",
  };

  const inputStyle = {
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #007BFF",
    outline: "none",
  };

  const buttonStyle = {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const closeButtonStyle = {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  };

  return (
    <div>
      <NavBar />
      <Outlet />

      <h2>Add New Service</h2>
      <button
        onClick={() => setFormVisible(true)}
        style={{ backgroundColor: "#007BFF", color: "white", padding: "10px", border: "none", borderRadius: "4px", cursor: "pointer" }}
      >
        Add Service
      </button>

      {formVisible && (
        <form onSubmit={handleSubmit} style={formStyle}>
          <label>
            Service Name:
            <input
              type="text"
              name="name"
              value={service.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={service.description}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={service.location}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              name="imageUrl"
              value={service.imageUrl}
              onChange={handleChange}
              style={inputStyle}
            />
          </label>
          <label>
            Category:
            <select
              name="category"
              value={service.category}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="parks">Parks</option>
              <option value="hotels">Hotels</option>
              <option value="beaches">Beaches</option>
            </select>
          </label>
          <button type="submit" style={buttonStyle}>Submit Service</button>
        </form>
      )}

      <div style={modalStyle}>
        <div style={modalContentStyle}>
          <h2>Notification</h2>
          <p>{modalMessage}</p>
          <button onClick={() => setModalIsOpen(false)} style={closeButtonStyle}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AddServicePage;
