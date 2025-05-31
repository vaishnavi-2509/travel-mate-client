"use client"

import PlaceCard from "../components/PlaceCard"

export default function Demo() {
  const samplePlaces = [
    {
      image: "/placeholder.svg?height=300&width=400",
      name: "Santorini, Greece",
      description:
        "A stunning Greek island known for its white-washed buildings, blue domes, and breathtaking sunsets over the Aegean Sea.",
      location: "Cyclades, Greece",
      rating: 4.8,
      visitTime: "3-4 days",
      visitors: "2M yearly",
      highlights: [
        "Iconic blue-domed churches",
        "Spectacular sunset views",
        "Volcanic beaches",
        "Traditional Greek cuisine",
        "Charming village streets",
        "Wine tasting experiences",
      ],
      fullDescription:
        "Santorini is one of the most photographed destinations in the world, famous for its dramatic cliffs, stunning sunsets, and distinctive Cycladic architecture. The island was shaped by a massive volcanic eruption, creating its unique crescent shape and dramatic landscape. Visitors can explore charming villages like Oia and Fira, relax on unique volcanic beaches, sample local wines, and enjoy some of the most romantic sunsets on Earth. The island offers a perfect blend of natural beauty, rich history, and modern luxury.",
      gallery: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
    },
    {
      image: "/placeholder.svg?height=300&width=400",
      name: "Machu Picchu, Peru",
      description:
        "An ancient Incan citadel set high in the Andes Mountains, offering incredible views and rich historical significance.",
      location: "Cusco Region, Peru",
      rating: 4.9,
      visitTime: "1-2 days",
      visitors: "1.5M yearly",
      highlights: [
        "Ancient Incan architecture",
        "Breathtaking mountain views",
        "Rich cultural history",
        "Hiking trails",
        "Archaeological wonders",
        "Spiritual experience",
      ],
      fullDescription:
        "Machu Picchu, often called the 'Lost City of the Incas,' is a 15th-century Inca citadel located in the Eastern Cordillera of southern Peru. This UNESCO World Heritage Site sits on a mountain ridge 2,430 meters above sea level and is one of the most significant archaeological sites in the world. The site showcases the incredible engineering and architectural skills of the Inca civilization, with precisely cut stone structures that have withstood centuries of earthquakes and weather. Visitors can explore the Temple of the Sun, the Room of the Three Windows, and the Intihuatana stone while enjoying panoramic views of the surrounding Andes Mountains.",
      gallery: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    },
    {
      image: "/placeholder.svg?height=300&width=400",
      name: "Bali, Indonesia",
      description:
        "A tropical paradise known for its beautiful beaches, lush rice terraces, and vibrant Hindu culture.",
      location: "Indonesia",
      rating: 4.7,
      visitTime: "5-7 days",
      visitors: "6M yearly",
      highlights: [
        "Beautiful beaches",
        "Rice terrace landscapes",
        "Hindu temples",
        "Spa and wellness",
        "Vibrant nightlife",
        "Traditional arts and crafts",
      ],
      fullDescription:
        "Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches, and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple. To the south, the beachside city of Kuta has lively bars, while Seminyak, Sanur, and Nusa Dua are popular resort towns. The island is also known for its yoga and meditation retreats, traditional dance performances, and delicious Indonesian cuisine. Whether you're seeking adventure, relaxation, or cultural immersion, Bali offers something for every type of traveler.",
      gallery: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Discover Amazing Places</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the world's most beautiful destinations and create unforgettable memories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {samplePlaces.map((place, index) => (
            <PlaceCard key={index} {...place} />
          ))}
        </div>
      </div>
    </div>
  )
}
