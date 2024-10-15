import React, { useState } from 'react';
import { FaSearchLocation } from "react-icons/fa";

function SearchDestination({ onSearch}) {
    const [searchTerm, setSearchTerm] = useState('');


    function handleChange(e) {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    }
    return (
    <div>
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange}
            />
            <i className="search-icon"><FaSearchLocation /></i>  
               </div>
    );
};

export default SearchDestination
