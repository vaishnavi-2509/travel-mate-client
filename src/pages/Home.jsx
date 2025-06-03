import React, { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import SearchForm from "../components/SearchForm";
import PlaceCard from "../components/PlaceCard";
import Itinerary from "../components/Itinerary";
import Footer from "../components/Footer";
import UpcomingTrips from "./UpcomingTrips";

const places = [
  { name: "Paris", image: "./images/paris.jpg", description: "The city of lights and love with iconic landmarks like the Eiffel Tower, cafes, and charming streets.", location: "Paris, France" },
  { name: "Maldives", image: "./images/maldives.jpg", description: "Tropical paradise with luxury overwater bungalows and turquoise waters for the perfect escape.", location: "Maldives" },
  { name: "Kyoto", image: "./images/kyoto.jpg", description: "Explore ancient temples, gardens, traditional tea houses, and stunning cherry blossoms.",location: "Kyoto, Japan" },
  { name: "New York", image: "./images/new-york.jpg", description: "The bustling city that never sleeps, full of skyscrapers, Broadway shows, and Central Park.", location: "New York, USA" },
  { name: "Rome", image: "./images/rome.jpg", description: "Historic city featuring the Colosseum, Roman Forum, and mouth-watering Italian cuisine.",location: "Rome, Italy" },
  { name: "Sydney", image: "./images/sydney.jpg", description: "Australia’s iconic harbor city with the Opera House and sunny beaches.",location: "Sydney, Australia" },
  { name: "Dubai", image: "./images/dubai.jpg", description: "A futuristic oasis in the desert, famous for luxury shopping, skyscrapers, and adventure sports.",location: "Dubai" },
];

const Home = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
    }, 4000);
    return () => clearInterval(scrollInterval);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-cover bg-center min-h-screen">
      <Navbar />
      <div className="pt-16 px-4">
        <SearchForm />
      </div>
      <div>
      <UpcomingTrips />
    </div>
      

      <div>
        <Itinerary />
      </div>
      <section id="places" className="bg-white py-6 px-4 relative overflow-hidden">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-12 tracking-tight">
          Top Places to Visit
        </h2>

        <button
          onClick={() => scroll("left")}
          className="absolute left-2 md:left-6 top-1/2 z-20 transform -translate-y-1/2 bg-white text-blue-600 shadow-lg rounded-full p-3 hover:bg-blue-100 hover:scale-110 transition-all duration-200 hidden md:flex items-center justify-center"
          aria-label="Scroll Left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-2 md:right-6 top-1/2 z-20 transform -translate-y-1/2 bg-white text-blue-600 shadow-lg rounded-full p-3 hover:bg-blue-100 hover:scale-110 transition-all duration-200 hidden md:flex items-center justify-center"
          aria-label="Scroll Right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div ref={scrollRef} className="flex overflow-x-auto gap-6 px-4 pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory">
          {places.map((place, index) => (
            <div className="snap-start" key={index}>
              <PlaceCard {...place} />
            </div>
          ))}
        </div>
      </section>
      <Footer />
       
    </div>
  );
};



export default Home;
