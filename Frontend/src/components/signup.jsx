// signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';  // Import the CSS file for styling
import './signup.css'; // Import CSS

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    password: '',
  });
  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data before submitting
    if (!formData.name || !formData.email || !formData.phone_number || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }
  
    try {
      // Make API call to signup endpoint
      const response = await fetch('https://kenya-tours.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });
  
      const result = await response.json();
  
      // Handle response from the server
      if (response.ok) {
        // On successful signup, redirect to login page
        navigate('/login');
      } else {
        // Set error message returned from the backend
        setError(result.error);
      }
    } catch (error) {
      // Handle any network or other errors
      setError('Something went wrong.');
    }
  };
  
  return (
    <div className="auth-form">
      <h2>Signup</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
