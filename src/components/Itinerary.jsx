"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Search, Plus, ArrowLeft, MapPin, Star, Calendar, Globe, Utensils, Building, Camera, Info } from "lucide-react"
import useAmadeusToken from "../api/useAmadeusToken"

export default function Itinerary() {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [results, setResults] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [errorMessage, setErrorMessage] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const itemsPerPage = 6
  const tokenData = useAmadeusToken()
  const token = tokenData?.token
  const [savedItineraries, setSavedItineraries] = useState([])

  // Add Itinerary form state
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    visitedDate: "",
    places: [
      {
        name: "",
        summary: "",
        photos: [],
        restaurants: [{ name: "", rating: "", review: "" }],
        hotels: [{ name: "", rating: "", review: "" }],
      },
    ],
    travelTip: "",
  })

  useEffect(() => {
    if (query.length >= 2) {
      const timer = setTimeout(fetchCities, 500)
      return () => clearTimeout(timer)
    }
  }, [query])

  const fetchCities = async () => {
    try {
      const res = await axios.get(`https://test.api.amadeus.com/v1/reference-data/locations`, {
        params: { keyword: query, subType: "CITY" },
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = res.data.data || []
      setSuggestions(data)
      if (data.length === 0) setErrorMessage("Destination not found.")
    } catch (error) {
      console.error("Autocomplete error:", error)
      setErrorMessage("Destination not found.")
    }
  }

  const fetchItinerary = async () => {
    try {
      const location = suggestions.find((loc) => loc.address.cityName.toLowerCase().includes(query.toLowerCase()))
      if (!location || !location.geoCode) {
        setResults([])
        setErrorMessage("Destination not found.")
        return
      }
      const { latitude, longitude } = location.geoCode
      const activitiesRes = await axios.get(`https://test.api.amadeus.com/v1/reference-data/locations/pois`, {
        params: { latitude, longitude, radius: 20 },
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = activitiesRes.data.data || []
      setResults(data)
      setErrorMessage(data.length === 0 ? "No activities found." : "")
      setCurrentPage(1)
    } catch (error) {
      console.error("Fetch error:", error)
      setErrorMessage("Failed to fetch itinerary.")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchItinerary()
  }

  const totalPages = Math.ceil(results.length / itemsPerPage)
  const paginatedResults = results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // ---------- ADD FORM HANDLERS ----------
  const handlePlaceChange = (index, e) => {
    const { name, value, files } = e.target
    const updatedPlaces = [...formData.places]
    if (name === "photos") {
      updatedPlaces[index][name] = Array.from(files)
    } else {
      updatedPlaces[index][name] = value
    }
    setFormData({ ...formData, places: updatedPlaces })
  }

  const handleRestaurantChange = (placeIndex, resIndex, e) => {
    const { name, value } = e.target
    const updatedPlaces = [...formData.places]
    updatedPlaces[placeIndex].restaurants[resIndex][name] = value
    setFormData({ ...formData, places: updatedPlaces })
  }

  const handleHotelChange = (placeIndex, hotelIndex, e) => {
    const { name, value } = e.target
    const updatedPlaces = [...formData.places]
    updatedPlaces[placeIndex].hotels[hotelIndex][name] = value
    setFormData({ ...formData, places: updatedPlaces })
  }

  const addPlace = () => {
    setFormData({
      ...formData,
      places: [
        ...formData.places,
        {
          name: "",
          summary: "",
          photos: [],
          restaurants: [{ name: "", rating: "", review: "" }],
          hotels: [{ name: "", rating: "", review: "" }],
        },
      ],
    })
  }

  const addRestaurant = (placeIndex) => {
    const updatedPlaces = [...formData.places]
    updatedPlaces[placeIndex].restaurants.push({
      name: "",
      rating: "",
      review: "",
    })
    setFormData({ ...formData, places: updatedPlaces })
  }

  const addHotel = (placeIndex) => {
    const updatedPlaces = [...formData.places]
    updatedPlaces[placeIndex].hotels.push({
      name: "",
      rating: "",
      review: "",
    })
    setFormData({ ...formData, places: updatedPlaces })
  }

  const handleAddItinerarySubmit = (e) => {
    e.preventDefault()
    console.log("Itinerary submitted:", formData)
    setSavedItineraries([...savedItineraries, { ...formData, id: Date.now() }])
    setFormData({
      country: "",
      city: "",
      visitedDate: "",
      places: [
        {
          name: "",
          summary: "",
          photos: [],
          restaurants: [{ name: "", rating: "", review: "" }],
          hotels: [{ name: "", rating: "", review: "" }],
        },
      ],
      travelTip: "",
    })
    setShowAddForm(false)
  }

  // ============ RENDER ADD FORM ============
  if (showAddForm) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8 relative">
          <button
            onClick={() => setShowAddForm(false)}
            className="absolute top-6 left-6 text-blue-700 hover:text-blue-900 flex items-center transition-colors duration-200"
          >
            <ArrowLeft size={20} className="mr-1" />
            <span className="font-medium">Back</span>
          </button>

          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-blue-700 mb-2">Create Your Travel Story</h2>
            <p className="text-gray-500">Share your adventures and recommendations</p>
          </div>

          <form onSubmit={handleAddItinerarySubmit} className="space-y-8">
            {/* Country & City */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Globe size={16} className="mr-2 text-blue-700" />
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full border-0 bg-blue-50 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                  placeholder="e.g. France"
                  required
                />
              </div>
              <div className="relative">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MapPin size={16} className="mr-2 text-blue-700" />
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full border-0 bg-blue-50 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                  placeholder="e.g. Paris"
                  required
                />
              </div>
            </div>

            {/* Visited Date */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="mr-2 text-blue-700" />
                When did you visit?
              </label>
              <input
                type="date"
                name="visitedDate"
                value={formData.visitedDate}
                onChange={(e) => setFormData({ ...formData, visitedDate: e.target.value })}
                className="w-full border-0 bg-blue-50 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                required
              />
            </div>

            {/* Places Section */}
            {formData.places.map((place, pIdx) => (
              <div key={pIdx} className="border border-blue-100 rounded-xl p-6 bg-gradient-to-r from-blue-50 to-white">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center mr-3 font-bold">
                    {pIdx + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-blue-700">
                    {place.name ? place.name : `Place ${pIdx + 1}`}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <MapPin size={16} className="mr-2 text-blue-700" />
                      Place Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={place.name}
                      onChange={(e) => handlePlaceChange(pIdx, e)}
                      className="w-full border-0 bg-white rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      placeholder="e.g. Eiffel Tower"
                      required
                    />
                  </div>
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Info size={16} className="mr-2 text-blue-700" />
                      Your Experience
                    </label>
                    <textarea
                      name="summary"
                      value={place.summary}
                      onChange={(e) => handlePlaceChange(pIdx, e)}
                      className="w-full border-0 bg-white rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      rows="2"
                      placeholder="Share what made this place special..."
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Camera size={16} className="mr-2 text-blue-700" />
                    Photos
                  </label>
                  <div className="border-2 border-dashed border-blue-200 rounded-lg p-4 bg-white">
                    <input
                      type="file"
                      name="photos"
                      multiple
                      onChange={(e) => handlePlaceChange(pIdx, e)}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                </div>

                {/* Restaurants */}
                <div className="mt-6">
                  <h4 className="flex items-center text-md font-semibold text-blue-700 mb-3">
                    <Utensils size={16} className="mr-2" />
                    Restaurants
                  </h4>
                  {place.restaurants.map((rest, rIdx) => (
                    <div
                      key={rIdx}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 bg-white p-3 rounded-lg shadow-sm"
                    >
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Name</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Restaurant name"
                          value={rest.name}
                          onChange={(e) => handleRestaurantChange(pIdx, rIdx, e)}
                          className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Rating</label>
                        <input
                          type="text"
                          name="rating"
                          placeholder="1-5 stars"
                          value={rest.rating}
                          onChange={(e) => handleRestaurantChange(pIdx, rIdx, e)}
                          className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Review</label>
                        <input
                          type="text"
                          name="review"
                          placeholder="Short review"
                          value={rest.review}
                          onChange={(e) => handleRestaurantChange(pIdx, rIdx, e)}
                          className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addRestaurant(pIdx)}
                    className="text-blue-700 text-sm mt-2 hover:text-blue-900 flex items-center"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Another Restaurant
                  </button>
                </div>

                {/* Hotels */}
                <div className="mt-6">
                  <h4 className="flex items-center text-md font-semibold text-blue-700 mb-3">
                    <Building size={16} className="mr-2" />
                    Accommodations
                  </h4>
                  {place.hotels.map((hotel, hIdx) => (
                    <div
                      key={hIdx}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 bg-white p-3 rounded-lg shadow-sm"
                    >
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Name</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Hotel name"
                          value={hotel.name}
                          onChange={(e) => handleHotelChange(pIdx, hIdx, e)}
                          className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Rating</label>
                        <input
                          type="text"
                          name="rating"
                          placeholder="1-5 stars"
                          value={hotel.rating}
                          onChange={(e) => handleHotelChange(pIdx, hIdx, e)}
                          className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Review</label>
                        <input
                          type="text"
                          name="review"
                          placeholder="Short review"
                          value={hotel.review}
                          onChange={(e) => handleHotelChange(pIdx, hIdx, e)}
                          className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addHotel(pIdx)}
                    className="text-blue-700 text-sm mt-2 hover:text-blue-900 flex items-center"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Another Hotel
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addPlace}
              className="flex items-center justify-center w-full bg-blue-100 text-blue-700 px-4 py-3 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors duration-200"
            >
              <Plus size={18} className="mr-2" />
              Add Another Place
            </button>

            {/* Travel Tip */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Star size={16} className="mr-2 text-blue-700" />
                Travel Tip
              </label>
              <textarea
                name="travelTip"
                value={formData.travelTip}
                onChange={(e) => setFormData({ ...formData, travelTip: e.target.value })}
                className="w-full border-0 bg-blue-50 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                rows="3"
                placeholder="Share your best advice for fellow travelers..."
              ></textarea>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg transform hover:-translate-y-1"
              >
                Submit Your Travel Story
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // ============ RENDER ITINERARY LIST ============
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-blue-700 mb-3">Discover Amazing Places</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Find the perfect destinations for your next adventure and create your own travel stories
          </p>
        </div>

        <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="relative mb-8">
            <div className="relative">
              <div className="absolute left-4 top-4 text-blue-700">
                <Search size={20} />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setErrorMessage("")
                }}
                className="w-full pl-12 pr-4 py-4 border-0 bg-blue-50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-gray-700"
                placeholder="Search destination (e.g., Paris, Rome)"
              />
            </div>
            {suggestions.length > 0 && (
              <ul className="bg-white border border-gray-100 mt-1 rounded-xl shadow-xl absolute z-10 w-full max-h-60 overflow-y-auto">
                {suggestions.map((sug) => (
                  <li
                    key={sug.id}
                    className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-0 flex items-center"
                    onClick={() => {
                      setQuery(sug.address.cityName)
                      setSuggestions([])
                    }}
                  >
                    <MapPin size={16} className="mr-2 text-blue-700" />
                    <span className="font-medium">{sug.address.cityName}</span>
                    <span className="text-gray-500 text-sm ml-1">, {sug.address.countryName}</span>
                  </li>
                ))}
              </ul>
            )}
            <button
              type="submit"
              className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-1"
            >
              Explore Destinations
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="mt-3 w-full bg-gradient-to-r from-blue-700 to-blue-800 text-white py-4 rounded-xl hover:from-blue-800 hover:to-blue-900 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-1 flex items-center justify-center"
            >
              <Plus size={20} className="mr-2" />
              Add Your Itinerary
            </button>
          </form>

          {errorMessage && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-center font-medium p-4 rounded-xl mb-6">
              {errorMessage}
            </div>
          )}

          {results.length > 0 && (
            <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
              <MapPin className="mr-2" />
              Points of Interest
            </h3>
          )}

          <div className="grid gap-4 mt-4">
            {paginatedResults.map((item) => (
              <div
                key={item.id}
                className="bg-gradient-to-r from-blue-50 to-white border border-blue-100 rounded-xl p-4 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
              >
                <h3 className="font-bold text-lg text-blue-700 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 flex items-center">
                  <Info size={14} className="mr-1 text-blue-700" />
                  {item.category}
                </p>
              </div>
            ))}
          </div>

          {results.length > 0 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-10 h-10 rounded-full text-sm font-semibold transition-all duration-200 ${
                    currentPage === idx + 1
                      ? "bg-blue-700 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}
          {savedItineraries.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-blue-700 mb-6 flex items-center">
                <Globe className="mr-2" />
                Your Travel Stories
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedItineraries.map((itinerary) => (
                  <div
                    key={itinerary.id}
                    className="bg-white border border-blue-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-lg">
                          {itinerary.city}, {itinerary.country}
                        </h4>
                        <div className="flex items-center text-sm">
                          <Calendar size={14} className="mr-1" />
                          <span>{new Date(itinerary.visitedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="mb-4">
                        <h5 className="font-semibold text-blue-700 mb-2 flex items-center">
                          <MapPin size={16} className="mr-1" />
                          Places Visited
                        </h5>
                        <div className="space-y-2">
                          {itinerary.places.map((place, idx) => (
                            <div key={idx} className="bg-blue-50 p-3 rounded-lg">
                              <p className="font-medium text-blue-800">{place.name}</p>
                              <p className="text-sm text-gray-600 mt-1">{place.summary}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {itinerary.travelTip && (
                        <div className="mt-4 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                          <h5 className="font-semibold text-yellow-700 flex items-center">
                            <Star size={16} className="mr-1" />
                            Travel Tip
                          </h5>
                          <p className="text-sm text-gray-700 mt-1">{itinerary.travelTip}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
