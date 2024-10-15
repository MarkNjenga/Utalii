// // ServiceForm.js
// import React, { useState } from 'react';

// const ServiceForm = () => {
//   const [service, setService] = useState({
//     name: '',
//     description: '',
//     location: '',
//     price: '',
//     imageUrl: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setService({ ...service, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetch('https://alurageek-api-eight.vercel.app/parks', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(service),
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Success:', data);
//       // Optionally, clear form or redirect user
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Service Name:
//         <input type="text" name="name" value={service.name} onChange={handleChange} required />
//       </label>
//       <label>
//         Description:
//         <textarea name="description" value={service.description} onChange={handleChange} required />
//       </label>
//       <label>
//         Location:
//         <input type="text" name="location" value={service.location} onChange={handleChange} required />
//       </label>
//       <label>
//         Price:
//         <input type="number" name="price" value={service.price} onChange={handleChange} required />
//       </label>
//       <label>
//         Image URL:
//         <input type="text" name="imageUrl" value={service.image} onChange={handleChange} />
//       </label>
//       <button type="submit">Add Service</button>
//     </form>
//   );
// };

// export default ServiceForm;



// //add styling