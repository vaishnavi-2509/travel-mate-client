"use client"

import { Calendar, MapPin, Users, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import { useAuth } from "../Auth/AuthContext"
import AdminTripForm from "../admin/AdminTripForm"
import axios from "axios"

const getTrips = async () => {
  const response = await axios.get("http://localhost:5500/api/trips");
  console.log(response.data);
  return response.data;
}

const getBadgeStyle = (badge) => {
  switch (badge.toLowerCase()) {
    case "filling fast":
      return "bg-red-500 text-white"
    case "new":
      return "bg-blue-500 text-white"
    case "adventure":
      return "bg-purple-500 text-white"
    case "cultural":
      return "bg-amber-500 text-white"
    case "popular":
      return "bg-green-500 text-white"
    case "wildlife":
      return "bg-orange-500 text-white"
    default:
      return "bg-gray-500 text-white"
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
};

const formatPrice = (price) => {
  return `₹${price.toLocaleString('en-IN')}`;
};

const UpcomingTrips = () => {
  const { isAdmin } = useAuth();
  const scrollContainerRef = useRef(null);

  const [trips, setTrips] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -400, behavior: "smooth" })
  }

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 400, behavior: "smooth" })
  }

  const handleEditTrip = (trip) => {
    setEditingTrip(trip);
    setShowForm(true);
  }

  const handleSaveTrip = (updatedTrip) => {
    const updatedList = trips.map(t => t._id === updatedTrip._id ? updatedTrip : t);
    setTrips(updatedList);
    setShowForm(false);
    setEditingTrip(null);
  }

  useEffect(() => {
    getTrips().then(setTrips);
  }, []);

  return (
    <div className="py-24 px-4 bg-gradient-to-r from-[#0891b2] via-[#2dd4bf] via-[#5eead4] to-[#f5d0a9] min-h-screen flex flex-col items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Upcoming Group Adventures</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join fellow travelers on carefully curated journeys around the world. Create memories that last a lifetime.
          </p>
        </div>

        <div className="relative">
          <button onClick={scrollLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg hover:shadow-xl rounded-full p-3 transition-all duration-300 group">
            <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-blue-600" />
          </button>

          <button onClick={scrollRight} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg hover:shadow-xl rounded-full p-3 transition-all duration-300 group">
            <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-blue-600" />
          </button>

          <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory px-12" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            <style dangerouslySetInnerHTML={{ __html: `div::-webkit-scrollbar { display: none; }` }} />

            {trips.map((trip) => (
              <div key={trip._id} className="min-w-[700px] snap-center group hover:shadow-2xl transition-all duration-500 bg-white rounded-2xl hover:scale-[1.02] flex overflow-hidden">
                <div className="relative w-2/5 overflow-hidden">
                  <img src={trip.imageUrl || "/placeholder.svg"} alt={trip.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {trip.tags.map((tag, idx) => (
                      <span key={idx} className={`${getBadgeStyle(tag)} px-2 py-1 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-medium text-gray-900">{trip.rating}</span>
                  </div>
                </div>

                <div className="w-3/5 p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{trip.title}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span>{formatDate(trip.startDate)} – {formatDate(trip.endDate)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span>{trip.location}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{trip.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Users className="w-4 h-4 text-green-500" />
                          <span className="font-medium">{trip.currentTravelers}/{trip.maxTravelers} Travelers</span>
                        </div>
                        <span className="text-xs text-gray-500">{Math.round((trip.currentTravelers / trip.maxTravelers) * 100)}% full</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${(trip.currentTravelers / trip.maxTravelers) * 100}%` }}></div>
                      </div>
                    </div>
                    <div className="text-left mt-4">
                      <div className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">{formatPrice(trip.price)}</div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    {isAdmin ? (
                      <>
                        <button onClick={() => handleEditTrip(trip)} className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg py-2.5 px-4 font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                          Edit Trip
                        </button>
                        <button 
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this trip?')) {
                              fetch(`http://localhost:5500/api/trips/${trip._id}`, {
                                method: 'DELETE',
                                headers: {
                                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                                }
                              })
                              .then(response => {
                                if (response.ok) {
                                  setTrips(trips.filter(t => t._id !== trip._id));
                                } else {
                                  throw new Error('Failed to delete trip');
                                }
                              })
                              .catch(error => {
                                console.error('Error deleting trip:', error);
                                alert('Failed to delete trip. Please try again.');
                              });
                            }
                          }}
                          className="px-4 py-2.5 border border-red-300 bg-red-500 text-white rounded-lg transition-all duration-300 font-medium hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg py-2.5 px-4 font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                          Join Adventure
                        </button>
                        <button className="px-4 py-2.5 border border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300 rounded-lg transition-all duration-300 font-medium">
                          Details
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Trip Button */}
        {isAdmin && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => {
                setEditingTrip(null);
                setShowForm(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Create Trip
            </button>
          </div>
        )}

        {/* Modal for AdminTripForm */}
        {isAdmin && showForm && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative p-6">
              <button onClick={() => setShowForm(false)} className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold z-10">×</button>
              <div className="pt-8">
                <AdminTripForm trip={editingTrip} onSave={handleSaveTrip} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UpcomingTrips
