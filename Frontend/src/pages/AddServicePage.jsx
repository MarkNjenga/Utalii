import React, { useEffect, useState } from "react";
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
  const [services, setServices] = useState([]);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('https://alurageek-api-q6u8.vercel.app/parks');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Error fetching services. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { category, ...serviceData } = service;

    const method = editingServiceId ? "PUT" : "POST";
    const url = editingServiceId
      ? 'https://alurageek-api-q6u8.vercel.app/${category}/${editingServiceId}'
      : 'https://alurageek-api-q6u8.vercel.app/${category}';

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serviceData),
    })
      .then((response) => response.json())
      .then(() => {
        toast.success(editingServiceId ? "Service updated successfully!" : "Service added successfully!");
        setService({
          name: "",
          description: "",
          location: "",
          imageUrl: "",
          category: "parks",
        });
        setEditingServiceId(null);
        fetchServices(); // Refresh the service list
        setFormVisible(false); // Hide the form after submission
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error saving service. Please try again.");
      });
  };

  const handleEdit = (service) => {
    setService(service);
    setEditingServiceId(service.id); // Assuming service has an id
    setFormVisible(true);
  };

  const handleDelete = (id) => {
    const category = services.find((s) => s.id === id).category; // Get category from the service
    fetch('https://alurageek-api-q6u8.vercel.app/${category}/${id}', {
      method: "DELETE",
    })
      .then(() => {
        toast.success("Service deleted successfully!");
        fetchServices(); // Refresh the service list
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error deleting service. Please try again.");
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
          setEditingServiceId(null); // Reset editing state
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

      <h3>Services List</h3>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {services.map((service) => (
          <li key={service.id} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #007BFF", borderRadius: "4px" }}>
            <h4>{service.name}</h4>
            <p>{service.description}</p>
            <p><strong>Location:</strong> {service.location}</p>
            <img src={service.imageUrl} alt={service.name} style={{ maxWidth: "100px", maxHeight: "100px" }} />
            <div>
              <button onClick={() => handleEdit(service)} style={{ marginRight: "10px", backgroundColor: "#FFC107", color: "white", border: "none", borderRadius: "4px", padding: "5px 10px", cursor: "pointer" }}>Edit</button>
              <button onClick={() => handleDelete(service.id)} style={{ backgroundColor: "#DC3545", color: "white", border: "none", borderRadius: "4px", padding: "5px 10px", cursor: "pointer" }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <ToastContainer />
    </div>
  );
};

export default AddServicePage;