// // src/components/ServiceList.jsx
// import React, { useEffect, useState } from 'react';

// const ServiceList = ({ category }) => {
//   const [services, setServices] = useState([]);

//   useEffect(() => {
//     fetch(`https://alurageek-api-eight.vercel.app/parks${category}`)
//       .then(response => response.json())
//       .then(data => setServices(data))
//       .catch(error => console.error('Error fetching services:', error));
//   }, [category]);

//   return (
//     <div>
//       <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Services</h2>
//       <ul>
//         {services.map(service => (
//           <li key={service.id}>
//             <h3>{service.name}</h3>
//             <p>{service.description}</p>
//             <p>Location: {service.location}</p>
//             <p>Price: ${service.price}</p>
//             {service.imageUrl && <img src={service.image} alt={service.name} />}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ServiceList;


// // add styling