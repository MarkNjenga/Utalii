import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddServicePage = () => {
  const [service, setService] = useState({
    name: "",
    description: "",
    location: "",
    imageUrl: "",
    category: "parks", // Default category
  });

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
        toast.success("Service added successfully!"); 
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
        toast.error("Error adding service. Please try again."); 
      });
  };

  return (
    <div>
      <NavBar />
      <Outlet />

      <h2>Add New Service</h2>
      <button
        onClick={() => {
          setFormVisible(true);
        }}
        style={{
          backgroundColor: "#007BFF",
          color: "white",
          padding: "10px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Add Service
      </button>

      {formVisible && (
        <div style={{ position: "relative" }}>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "400px",
              margin: "20px auto",
              padding: "20px",
              border: "1px solid #007BFF",
              borderRadius: "8px",
              backgroundColor: "#f8f9fa",
            }}
          >
            <label>
              Service Name:
              <input
                type="text"
                name="name"
                value={service.name}
                onChange={handleChange}
                required
                style={{
                  marginBottom: "15px",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #007BFF",
                  outline: "none",
                }}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={service.description}
                onChange={handleChange}
                required
                style={{
                  marginBottom: "15px",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #007BFF",
                  outline: "none",
                }}
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
                style={{
                  marginBottom: "15px",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #007BFF",
                  outline: "none",
                }}
              />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                name="imageUrl"
                value={service.imageUrl}
                onChange={handleChange}
                style={{
                  marginBottom: "15px",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #007BFF",
                  outline: "none",
                }}
              />
            </label>
            <label>
              Category:
              <select
                name="category"
                value={service.category}
                onChange={handleChange}
                style={{
                  marginBottom: "15px",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #007BFF",
                  outline: "none",
                }}
              >
                <option value="parks">Parks</option>
                <option value="hotels">Hotels</option>
                <option value="beaches">Beaches</option>
              </select>
            </label>
            <button
              type="submit"
              style={{
                backgroundColor: "#007BFF",
                color: "white",
                padding: "10px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background-color 0.3s",
                marginBottom: "10px", // Add margin for spacing
              }}
            >
              Submit Service
            </button>
            <button
              onClick={() => setFormVisible(false)}
              type="button"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
                color: "#FF5733",
                textAlign: "center",
              }}
            >
              ✖ Close Form
            </button>
          </form>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default AddServicePage;
