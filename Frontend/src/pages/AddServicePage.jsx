import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddServicePage.css";
import NavBar from "../components/NavBar";

const AddServicePage = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ name: "", image: "", description: "", location: "" });
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://kenya-tours.onrender.com/services", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(response.data.services || []);
    } catch (error) {
      setError("Failed to fetch services.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData };

    try {
      if (editingServiceId) {
        await axios.put(`http://127.0.0.1:5000/services/${editingServiceId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Service updated successfully!");
      } else {
        await axios.post("http://127.0.0.1:5000/services", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Service added successfully!");
      }

      setFormData({ name: "", image: "", description: "", location: "" });
      setEditingServiceId(null);
      fetchServices();
    } catch (error) {
      console.error("Error saving service:", error);
      alert("Error saving service. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      await axios.delete(`http://127.0.0.1:5000/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Service deleted successfully!");
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
      alert("Error deleting service. Please try again.");
    }
  };

  const handleEdit = (service) => {
    setFormData({
      name: service.service_name,
      image: service.image,
      description: service.description,
      location: service.location,
    });
    setEditingServiceId(service.id);
  };

  return (
    <div className="add-service-page">
      <NavBar />
      <div className="form-container">
        <h1>{editingServiceId ? "Edit Service" : "Add Service"}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
          <button type="submit">{editingServiceId ? "Update" : "Add"}</button>
        </form>
      </div>
      <div className="services-list">
        <h2>Services</h2>
        {loading ? <p>Loading...</p> : error ? <p>{error}</p> : null}
        <ul>
          {services.map((service) => (
            <li key={service.id} className="service-item">
              <h3>{service.service_name}</h3>
              <p>{service.description}</p>
              <p>Location: {service.location}</p>
              <img src={service.image} alt={service.service_name} width="100" />
              <button onClick={() => handleEdit(service)}>Edit</button>
              <button onClick={() => handleDelete(service.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddServicePage;
