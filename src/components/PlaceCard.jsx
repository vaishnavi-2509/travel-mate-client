"use client"

import { useState } from "react"
import { MapPin, Clock, Star, Users, Camera, X, ThumbsUp } from "lucide-react"

const PlaceCard = ({
  image,
  name,
  description,
  location,
  rating = 4.5,
  visitTime = "2-3 hours",
  visitors = "1.2M yearly",
  highlights = ["Beautiful scenery", "Rich history", "Great for photos"],
  fullDescription,
  gallery = [],
  initialVotes = 0,
}) => {
  const [showModal, setShowModal] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [upvoted, setUpvoted] = useState(false)
  const [voteCount, setVoteCount] = useState(initialVotes)

  const allImages = [image, ...gallery]
  const expandedDescription =
    fullDescription ||
    description +
      " This destination offers an incredible experience with stunning views, rich cultural heritage, and unforgettable memories. Perfect for travelers seeking adventure and beauty in one place."

  const handleUpvote = (e) => {
    e.stopPropagation()
    if (upvoted) {
      setUpvoted(false)
      setVoteCount((prev) => prev - 1)
    } else {
      setUpvoted(true)
      setVoteCount((prev) => prev + 1)
    }
  }

  return (
    <>
      <div
        className="group w-80 min-w-[20rem] bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 cursor-pointer relative flex flex-col border border-gray-100 hover:-translate-y-2"
        onClick={() => setShowModal(true)}
      >
        {/* Image Section */}
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-3 py-1.5 rounded-full shadow-lg font-medium">
            Explore
          </div>
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {rating}
          </div>
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {location}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
              {name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
              {description}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {visitTime}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {visitors}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={handleUpvote}
              className={`flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-full transition-all ${
                upvoted
                  ? "bg-blue-100 text-blue-700 border border-blue-400"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${upvoted ? "fill-blue-500" : "fill-gray-400"}`} />
              {voteCount}
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium py-2.5 px-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Read More
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm text-gray-600 hover:text-red-500 p-2 rounded-full shadow-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Gallery */}
            <div className="relative h-80 w-full">
              <img
                src={allImages[activeImageIndex] || "/placeholder.svg"}
                alt={name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {allImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveImageIndex(index)
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === activeImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}

              <div className="absolute bottom-6 left-6 text-white">
                <h2 className="text-3xl font-bold mb-2">{name}</h2>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {rating}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
                  <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Visit Time</div>
                  <div className="font-semibold text-gray-800">{visitTime}</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl">
                  <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Annual Visitors</div>
                  <div className="font-semibold text-gray-800">{visitors}</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                  <Camera className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Photo Spots</div>
                  <div className="font-semibold text-gray-800">Unlimited</div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">About This Place</h3>
                <p className="text-gray-700 leading-relaxed text-base">{expandedDescription}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Plan Your Visit
                </button>
                <button className="flex-1 border-2 border-gray-200 text-gray-500 font-medium py-3 px-6 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300">
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PlaceCard
