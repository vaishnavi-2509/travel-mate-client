"use client";

import {
  Calendar,
  MapPin,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import AdminTripForm from "./AdminTripForm"; // make sure the path is correct

const trips = [
  {
    id: 1,
    name: "Bali Adventure Week",
    startDate: "June 18",
    endDate: "June 25, 2025",
    location: "Bali, Indonesia",
    joined: 7,
    total: 10,
    createdBy: "Maria",
    creatorImg: "https://randomuser.me/api/portraits/women/68.jpg",
    description:
      "Explore ancient rice terraces, pristine beaches, and immerse yourself in rich cultural experiences.",
    image: "../upcoming_trip_photos/bali.jpg",
    badges: ["Filling Fast", "Adventure"],
    rating: 4.8,
    price: "$1,299",
  },
  {
    id: 2,
    name: "Alps Hiking Tour",
    startDate: "July 10",
    endDate: "July 18, 2025",
    location: "Swiss Alps",
    joined: 3,
    total: 8,
    createdBy: "Liam",
    creatorImg: "https://randomuser.me/api/portraits/men/44.jpg",
    description:
      "A breathtaking scenic hiking adventure through the majestic Swiss Alps with experienced guides.",
    image: "../upcoming_trip_photos/bali.jpg",
    badges: ["New"],
    rating: 4.9,
    price: "$1,899",
  },
  {
    id: 3,
    name: "Tokyo Culture Deep Dive",
    startDate: "August 5",
    endDate: "August 12, 2025",
    location: "Tokyo, Japan",
    joined: 6,
    total: 12,
    createdBy: "Yuki",
    creatorImg: "https://randomuser.me/api/portraits/women/58.jpg",
    description:
      "Discover hidden gems, traditional temples, and modern marvels in Japan's vibrant capital.",
    image: "../upcoming_trip_photos/bali.jpg",
    badges: ["Cultural", "Popular"],
    rating: 4.7,
    price: "$2,199",
  },
  {
    id: 4,
    name: "Safari Adventure Kenya",
    startDate: "September 15",
    endDate: "September 22, 2025",
    location: "Masai Mara, Kenya",
    joined: 4,
    total: 8,
    createdBy: "James",
    creatorImg: "https://randomuser.me/api/portraits/men/32.jpg",
    description:
      "Experience the great migration and witness Africa's incredible wildlife in their natural habitat.",
    image: "../upcoming_trip_photos/bali.jpg",
    badges: ["Wildlife", "Adventure"],
    rating: 4.9,
    price: "$2,899",
  },
];

const getBadgeStyle = (badge) => {
  switch (badge.toLowerCase()) {
    case "filling fast":
      return "bg-red-500 text-white";
    case "new":
      return "bg-blue-500 text-white";
    case "adventure":
      return "bg-purple-500 text-white";
    case "cultural":
      return "bg-amber-500 text-white";
    case "popular":
      return "bg-green-500 text-white";
    case "wildlife":
      return "bg-orange-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const AdminUpcomingTrips = () => {
  const scrollContainerRef = useRef(null);
  const [showForm, setShowForm] = useState(false);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <div className="py-16 px-4 bg-gradient-to-r from-[#0891b2] via-[#2dd4bf] via-[#5eead4] to-[#f5d0a9] min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">
            Upcoming Group Adventures
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join fellow travelers on carefully curated journeys around the
            world. Create memories that last a lifetime.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg hover:shadow-xl rounded-full p-3 transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-blue-600" />
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg hover:shadow-xl rounded-full p-3 transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-blue-600" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory px-12"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style
              dangerouslySetInnerHTML={{
                __html: `
                div::-webkit-scrollbar {
                  display: none;
                }
              `,
              }}
            />

            {trips.map((trip) => (
              <div
                key={trip.id}
                className="min-w-[700px] snap-center group hover:shadow-2xl transition-all duration-500 bg-white rounded-2xl hover:scale-[1.02] flex overflow-hidden"
              >
                <div className="relative w-2/5 overflow-hidden">
                  <img
                    src={trip.image || "/placeholder.svg"}
                    alt={trip.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />

                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {trip.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className={`${getBadgeStyle(
                          badge
                        )} px-2 py-1 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-medium text-gray-900">
                      {trip.rating}
                    </span>
                  </div>
                </div>

                <div className="w-3/5 p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {trip.name}
                      </h3>
                      <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {trip.price}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span>
                          {trip.startDate} – {trip.endDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span>{trip.location}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                      {trip.description}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Users className="w-4 h-4 text-green-500" />
                          <span className="font-medium">
                            {trip.joined}/{trip.total} Travelers
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {Math.round((trip.joined / trip.total) * 100)}% full
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${(trip.joined / trip.total) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={trip.creatorImg || "/placeholder.svg"}
                        alt={trip.createdBy}
                        className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Created by {trip.createdBy}
                        </p>
                        <p className="text-xs text-gray-500">Trip Organizer</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg py-2.5 px-4 font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                      Join Adventure
                    </button>
                     <button className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 font-medium">
                      Details
                    </button>
                  </div>
                  
                </div>
                
              </div>
              
            ))}
            
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {trips.map((_, idx) => (
              <div
                key={idx}
                className="w-2 h-2 rounded-full bg-gray-300 hover:bg-blue-500 transition-colors cursor-pointer"
              />
            ))}
          </div>
        </div>
        <button
         className="px-4 py-4 text-white rounded-lg bg-blue-600 hover:bg-blue-800 hover:border-blue-500 transition-all duration-300 font-medium mx-130 my-4"
         onClick={() => setShowForm(true)}
         >
          Create Trip
        </button>
      </div>

      {/* Trip Form Modal */}
      {showForm && (
  <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 overflow-y-auto">
    <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
      <button
        onClick={() => setShowForm(false)}
        className="absolute top-3 right-3 bg-gray-100 p-1.5 rounded-full hover:bg-gray-200"
      >
        <X className="w-5 h-5 text-gray-700" />
      </button>
      <AdminTripForm />
    </div>
  </div>
)}
    </div>
  );
};

export default AdminUpcomingTrips;
