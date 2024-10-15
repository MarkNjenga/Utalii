import React, { useState } from "react";
import NavBar from "../components/NavBar";
import "./AddServicePage.css";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Creates a list of data to be added to the database
const AddServicePage = () => {
  const [service, setService] = useState({
    name: "",
    description: "",
    location: "",
    imageUrl: "",
    category: "parks", // Default category
  });

  // Extracts the name and value from the event and updates the service state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };
  // Prevents the default form submission and sends the data to the database
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
      .then((data) => {
        const notify = () =>
          toast.success("Service added successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => {
              if (`${category}` === "parks") {
                navigate("/parks");
              } else if (`${category}` === "hotels") {
                navigate("/hotels");
              } else if (`${category}` === "beaches") {
                navigate("/beaches");
              }
            },
          });
        notify();

        // Clear the form
        setService({
          name: "",
          description: "",
          location: "",
          imageUrl: "",
          category: "parks", // Reset to default category
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        const notify = () =>
          toast.success("Service added successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => {
              if (`${category}` === "parks") {
                navigate("/parks");
              } else if (`${category}` === "hotels") {
                navigate("/hotels");
              } else if (`${category}` === "beaches") {
                navigate("/beaches");
              }
            },
          });
        notify();
        // alert("Service added successfully");
      });
  };

  return (
    <div>
      <NavBar />
      <Outlet />

      <h2>Add New Service</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Service Name:
          <input
            type="text"
            name="name"
            value={service.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={service.description}
            onChange={handleChange}
            required
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
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="imageUrl"
            value={service.image}
            onChange={handleChange}
          />
        </label>
        <label>
          Category:
          <select
            name="category"
            value={service.category}
            onChange={handleChange}
          >
            <option value="parks">Parks</option>
            <option value="hotels">Hotels</option>
            <option value="beaches">Beaches</option>
          </select>
        </label>
        <button type="submit" onClick={() => notify()}>
          Add Service
        </button>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </form>
    </div>
  );
};

export default AddServicePage;
