import { useState } from "react";

const AddItineraryModal = () => {
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
  });

  const handlePlaceChange = (index, e) => {
    const { name, value, files } = e.target;
    const updatedPlaces = [...formData.places];
    if (name === "photos") {
      updatedPlaces[index][name] = Array.from(files);
    } else {
      updatedPlaces[index][name] = value;
    }
    setFormData({ ...formData, places: updatedPlaces });
  };

  const handleRestaurantChange = (placeIndex, resIndex, e) => {
    const { name, value } = e.target;
    const updatedPlaces = [...formData.places];
    updatedPlaces[placeIndex].restaurants[resIndex][name] = value;
    setFormData({ ...formData, places: updatedPlaces });
  };

  const handleHotelChange = (placeIndex, hotelIndex, e) => {
    const { name, value } = e.target;
    const updatedPlaces = [...formData.places];
    updatedPlaces[placeIndex].hotels[hotelIndex][name] = value;
    setFormData({ ...formData, places: updatedPlaces });
  };

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
    });
  };

  const addRestaurant = (placeIndex) => {
    const updatedPlaces = [...formData.places];
    updatedPlaces[placeIndex].restaurants.push({
      name: "",
      rating: "",
      review: "",
    });
    setFormData({ ...formData, places: updatedPlaces });
  };

  const addHotel = (placeIndex) => {
    const updatedPlaces = [...formData.places];
    updatedPlaces[placeIndex].hotels.push({
      name: "",
      rating: "",
      review: "",
    });
    setFormData({ ...formData, places: updatedPlaces });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Itinerary submitted! Check console for data.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 py-12 px-6 md:px-10">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-4xl font-extrabold text-center text-indigo-600 mb-8">
          Create Your Travel Itinerary
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Country & City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-lg font-semibold text-gray-800">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                className="mt-2 block w-full border-2 border-gray-300 rounded-lg p-4 shadow-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter country"
                required
              />
            </div>
            <div>
              <label className="text-lg font-semibold text-gray-800">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="mt-2 block w-full border-2 border-gray-300 rounded-lg p-4 shadow-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter city"
                required
              />
            </div>
          </div>

          {/* Visited Date */}
          <div>
            <label className="text-lg font-semibold text-gray-800">Visited Date</label>
            <input
              type="date"
              name="visitedDate"
              value={formData.visitedDate}
              onChange={(e) =>
                setFormData({ ...formData, visitedDate: e.target.value })
              }
              className="mt-2 block w-full border-2 border-gray-300 rounded-lg p-4 shadow-md focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Places Section */}
          {formData.places.map((place, pIdx) => (
            <div
              key={pIdx}
              className="border-t pt-6 mt-6 bg-gray-50 rounded-lg p-6 shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-indigo-500 mb-4">
                Place {pIdx + 1}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-lg font-semibold text-gray-800">Place Name</label>
                  <input
                    type="text"
                    name="name"
                    value={place.name}
                    onChange={(e) => handlePlaceChange(pIdx, e)}
                    className="mt-2 block w-full border-2 border-gray-300 rounded-lg p-4 shadow-md focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-lg font-semibold text-gray-800">Summary</label>
                  <textarea
                    name="summary"
                    value={place.summary}
                    onChange={(e) => handlePlaceChange(pIdx, e)}
                    className="mt-2 block w-full border-2 border-gray-300 rounded-lg p-4 shadow-md focus:ring-2 focus:ring-indigo-500"
                    rows="3"
                    placeholder="Brief summary about this place"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Photos */}
              <div className="mt-6">
                <label className="text-lg font-semibold text-gray-800">Photos</label>
                <input
                  type="file"
                  name="photos"
                  multiple
                  onChange={(e) => handlePlaceChange(pIdx, e)}
                  className="mt-2 block w-full text-sm file:border-2 file:border-gray-300 file:px-6 file:py-2 file:rounded-lg file:text-indigo-500"
                />
              </div>

              {/* Restaurants Section */}
              <div className="mt-6">
                <h4 className="text-xl font-semibold text-indigo-400 mb-4">Restaurants</h4>
                {place.restaurants.map((rest, rIdx) => (
                  <div key={rIdx} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <input
                      type="text"
                      name="name"
                      placeholder="Restaurant Name"
                      value={rest.name}
                      onChange={(e) => handleRestaurantChange(pIdx, rIdx, e)}
                      className="border-2 border-gray-300 rounded-lg p-4 shadow-md focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    <input
                      type="text"
                      name="rating"
                      placeholder="Rating"
                      value={rest.rating}
                      onChange={(e) => handleRestaurantChange(pIdx, rIdx, e)}
                      className="border-2 border-gray-300 rounded-lg p-4 shadow-md focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    <input
                      type="text"
                      name="review"
                      placeholder="Review"
                      value={rest.review}
                      onChange={(e) => handleRestaurantChange(pIdx, rIdx, e)}
                      className="border-2 border-gray-300 rounded-lg p-4 shadow-md focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addRestaurant(pIdx)}
                  className="text-indigo-600 text-sm hover:underline mt-2"
                >
                  + Add Another Restaurant
                </button>
              </div>

              {/* Hotels Section */}
              <div className="mt-6">
                <h4 className="text-xl font-semibold text-indigo-400 mb-4">Hotels</h4>
                {place.hotels.map((hotel, hIdx) => (
                  <div key={hIdx} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <input
                      type="text"
                      name="name"
                      placeholder="Hotel Name"
                      value={hotel.name}
                      onChange={(e) => handleHotelChange(pIdx, hIdx, e)}
                      className="border-2 border-gray-300 rounded-lg p-4 shadow-md focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    <input
                      type="text"
                      name="rating"
                      placeholder="Rating"
                      value={hotel.rating}
                      onChange={(e) => handleHotelChange(pIdx, hIdx, e)}
                      className="border-2 border-gray-300 rounded-lg p-4 shadow-md focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    <input
                      type="text"
                      name="review"
                      placeholder="Review"
                      value={hotel.review}
                      onChange={(e) => handleHotelChange(pIdx, hIdx, e)}
                      className="border-2 border-gray-300 rounded-lg p-4 shadow-md focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addHotel(pIdx)}
                  className="text-indigo-600 text-sm hover:underline mt-2"
                >
                  + Add Another Hotel
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addPlace}
            className="bg-indigo-100 text-indigo-600 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-indigo-200"
          >
            + Add Another Place
          </button>

          {/* Travel Tip */}
          <div>
            <label className="text-lg font-semibold text-gray-800">Travel Tip</label>
            <textarea
              name="travelTip"
              value={formData.travelTip}
              onChange={(e) =>
                setFormData({ ...formData, travelTip: e.target.value })
              }
              className="mt-2 block w-full border-2 border-gray-300 rounded-lg p-4 shadow-md focus:ring-2 focus:ring-indigo-500"
              rows="4"
              placeholder="Add a helpful travel tip"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Submit Itinerary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItineraryModal;
