import React, { useRef } from "react";
import PlaceCard from "./PlaceCard";

const places = [
  {
    image: "https://source.unsplash.com/400x300/?beach",
    name: "Goa Beach",
    description:
      "Golden sands, turquoise waters, and vibrant nightlife await you in Goa!",
  },
  {
    image: "https://source.unsplash.com/400x300/?mountain",
    name: "Himalayas",
    description:
      "Explore the majestic Himalayas for trekking and breathtaking scenery.",
  },
  {
    image: "https://source.unsplash.com/400x300/?desert",
    name: "Thar Desert",
    description:
      "Adventure-filled desert safaris and stunning sunsets in Rajasthan.",
  },
  {
    image: "https://source.unsplash.com/400x300/?city,india",
    name: "Mumbai",
    description:
      "The heart of Bollywood, bustling streets, and the Arabian sea.",
  },
];

const PlaceSection = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50 relative group">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-blue-600 mb-10 tracking-tight">
         Top Places to Visit
        </h2>
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-100 transition hidden group-hover:flex items-center justify-center z-10"
            aria-label="Scroll Left"
          >
            &#8592;
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-100 transition hidden group-hover:flex items-center justify-center z-10"
            aria-label="Scroll Right"
          >
            &#8594;
          </button>

          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
          >
            {places.map((place, idx) => (
              <PlaceCard
                key={idx}
                image={place.image}
                name={place.name}
                description={place.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaceSection;
