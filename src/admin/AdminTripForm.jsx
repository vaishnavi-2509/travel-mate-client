// src/components/AdminTripForm.jsx
import { useState } from "react";

const AdminTripForm = () => {
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    price: "",
    description: "",
    image: null,
    peopleJoined: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle API submit here (e.g., send to backend)
    console.log("Form data:", formData);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Trip Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="Destination Name"
          className="w-full p-2 border rounded"
          required
        />

        <div className="flex gap-4">
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded"
            required
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded"
            required
          />
        </div>

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price (USD)"
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Trip Description"
          className="w-full p-2 border rounded h-32"
          required
        />

        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="peopleJoined"
          value={formData.peopleJoined}
          onChange={handleChange}
          placeholder="People Joined"
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Save Trip
        </button>
      </form>
    </div>
  );
};

export default AdminTripForm;
