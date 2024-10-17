import React from 'react'

function Modal() {
    return (
        <div className="modalBackground">
            <div className="modalContainer">

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
                  
                </form>

            </div>


        </div>
    )
}

export default Modal
