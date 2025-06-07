"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Toaster, toast } from "react-hot-toast"

const AdminTripForm = ({ trip, onSave }) => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
    rating: 0,
    tags: [],
    price: "",
    currentTravelers: 0,
    maxTravelers: 0,
    imageUrl: null,
  })

  const [preview, setPreview] = useState(null)
  const [tagInput, setTagInput] = useState("")

  useEffect(() => {
    if (trip) {
      setFormData({
        title: trip.title || "",
        startDate: trip.startDate || "",
        endDate: trip.endDate || "",
        location: trip.location || "",
        description: trip.description || "",
        rating: trip.rating || 0,
        tags: trip.tags || [],
        price: trip.price || "",
        currentTravelers: trip.currentTravelers || 0,
        maxTravelers: trip.maxTravelers || 0,
        imageUrl: trip.imageUrl || null,
        id: trip.id,
      })

      if (trip.imageUrl) {
        setPreview(trip.imageUrl)
      }
    }
  }, [trip])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === "file" && files[0]) {
      const file = files[0]
      setFormData({ ...formData, imageUrl: file })

      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result)
      reader.readAsDataURL(file)
    } else if (name === "rating") {
      setFormData({ ...formData, [name]: parseFloat(value) })
    } else if (name === "price" || name === "currentTravelers" || name === "maxTravelers") {
      setFormData({ ...formData, [name]: parseInt(value) })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleTagInput = (e) => {
    setTagInput(e.target.value)
  }

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({
          ...formData,
          tags: [...formData.tags, tagInput.trim()]
        })
      }
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token")
      if (!token) {
        toast.error("Authentication required")
        navigate("/login")
        return
      }

      // Prepare the data
      const tripData = {
        title: formData.title,
        startDate: formData.startDate,
        endDate: formData.endDate,
        location: formData.location,
        description: formData.description,
        rating: parseFloat(formData.rating),
        tags: formData.tags,
        price: parseInt(formData.price),
        currentTravelers: parseInt(formData.currentTravelers),
        maxTravelers: parseInt(formData.maxTravelers),
        imageUrl: formData.imageUrl
      }

      // If it's an existing trip (editing), include the ID
      if (trip?.id) {
        tripData.id = trip.id
      }

      // Make the API call
      const response = await axios({
        method: trip?.id ? 'PUT' : 'POST',
        url: `http://localhost:5500/api/trips${trip?.id ? `/${trip.id}` : ''}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        data: tripData
      })

      if (response.status === 200 || response.status === 201) {
        toast.success(trip?.id ? "Trip updated successfully!" : "Trip created successfully!")
        if (onSave) {
          onSave(response.data)
        }
        // Optionally navigate back or to a specific route
        // navigate("/admin/trips")
      }
    } catch (error) {
      console.error("Error submitting trip:", error)
      toast.error(error.response?.data?.message || "Failed to save trip. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-sm">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{trip?.id ? 'Edit Trip' : 'Create Trip'}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Trip Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter trip title"
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Dates and Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (INR)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0"
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0-5)</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
            required
            className="w-full md:w-1/3 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm flex items-center gap-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={tagInput}
            onChange={handleTagInput}
            onKeyPress={handleTagKeyPress}
            placeholder="Add tags (press Enter)"
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Travelers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Travelers</label>
            <input
              type="number"
              name="currentTravelers"
              value={formData.currentTravelers}
              onChange={handleChange}
              min="0"
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Travelers</label>
            <input
              type="number"
              name="maxTravelers"
              value={formData.maxTravelers}
              onChange={handleChange}
              min="0"
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Trip Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Write a description..."
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>

        {/* Image Upload and Preview */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Trip Image</label>
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="relative w-full md:w-1/2 border border-gray-200 p-4 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors">
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
                <div className="relative h-32 w-full rounded-md overflow-hidden border border-gray-200">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-white text-gray-600 rounded-full p-1 shadow-sm hover:bg-gray-100"
                    onClick={() => {
                      setPreview(null)
                      setFormData({ ...formData, imageUrl: null })
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

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-500 text-white py-2 rounded-md transition-colors font-medium ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </div>
          ) : (
            'Save Trip'
          )}
        </button>
      </form>
    </div>
  )
}

export default AdminTripForm
