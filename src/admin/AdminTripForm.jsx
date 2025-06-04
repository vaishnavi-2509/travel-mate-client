"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const AdminTripForm = ({ trip, onSave }) => {
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    price: "",
    description: "",
    image: null,
    peopleJoined: 0,
  })

  const [preview, setPreview] = useState(null)

  useEffect(() => {
    if (trip) {
      setFormData({
        destination: trip.name || "",
        startDate: trip.startDate || "",
        endDate: trip.endDate || "",
        price: trip.price || "",
        description: trip.description || "",
        image: trip.image || null,
        peopleJoined: trip.joined || 0,
        id: trip.id,
      })

      if (typeof trip.image === "string") {
        setPreview(trip.image)
      }
    }
  }, [trip])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === "file" && files[0]) {
      const file = files[0]
      setFormData({ ...formData, image: file })

      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result)
      reader.readAsDataURL(file)
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSave) onSave(formData)
  }

  return (
    <div className="max-w-4xl mx-auto my-12 p-8 bg-white rounded-xl shadow-xl border">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Edit Trip</h2>
      <p className="text-center text-gray-500 mb-8">Fill the form to update trip details</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Destination */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Destination</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Enter destination"
            required
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Dates and Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Price (USD)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              required
              className="w-full border rounded-lg p-3 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Trip Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            placeholder="Write a description..."
            required
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Image Upload and Preview */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Trip Image</label>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative w-full md:w-1/2 border-2 border-dashed border-gray-300 p-4 rounded-lg bg-gray-50 hover:border-blue-400">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <p className="text-center text-gray-500 text-sm">Click or drag to upload image</p>
            </div>
            {preview && (
              <div className="w-full md:w-1/2">
                <div className="relative h-40 w-full rounded-lg overflow-hidden border">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    onClick={() => {
                      setPreview(null)
                      setFormData({ ...formData, image: null })
                      document.getElementById("image").value = ""
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* People Joined */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">People Joined</label>
          <input
            type="number"
            name="peopleJoined"
            value={formData.peopleJoined}
            onChange={handleChange}
            min="0"
            className="w-full md:w-1/3 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold flex justify-center items-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          💾 Save Trip
        </motion.button>
      </form>
    </div>
  )
}

export default AdminTripForm
