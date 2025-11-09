import { useState } from 'react';
import { searchFlights, searchAirports } from '../api/amadeus';
import backgroundImage from "../../public/images/background_img.jpg";

const airlineNames = {
  "AI": "Air India",
  "6E": "IndiGo",
  "SG": "SpiceJet",
  "UK": "Vistara",
  "G8": "Go First",
  "IX": "Air India Express",
  "EK": "Emirates",
  "QR": "Qatar Airways",
  "LH": "Lufthansa",
  "BA": "British Airways",
  "AF": "Air France",
  "SQ": "Singapore Airlines",
};

const SearchForm = () => {
  const [form, setForm] = useState({ source: '', destination: '', date: '' });
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sourceOptions, setSourceOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'source') fetchAirports(e.target.value, 'source');
    else if (e.target.name === 'destination') fetchAirports(e.target.value, 'destination');
  };

const [showTravelerForm, setShowTravelerForm] = useState(false);
const [selectedFlight, setSelectedFlight] = useState(null);
const [traveler, setTraveler] = useState({
  firstName: "",
  lastName: "",
  gender: "MALE",
  dateOfBirth: "",
  email: "",
  phone: "",
  passportNumber: "",
  nationality: "IN",
});

const handleBookClick = (flight) => {
  setSelectedFlight(flight);
  setShowTravelerForm(true);
};

const handleBookFlight = async (flight, traveler) => {
  const payload = {
    data: {
      type: "flight-order",
      flightOffers: [flight],
      travelers: [
        {
          id: "1",
          dateOfBirth: traveler.dateOfBirth,
          name: {
            firstName: traveler.firstName,
            lastName: traveler.lastName,
          },
          gender: traveler.gender,
          contact: {
            emailAddress: traveler.email,
            phones: [
              {
                deviceType: "MOBILE",
                countryCallingCode: "91",
                number: traveler.phone,
              },
            ],
          },
          documents: [
            {
              documentType: "PASSPORT",
              number: traveler.passportNumber,
              expiryDate: "2030-12-31",
              issuanceCountry: traveler.nationality,
              nationality: traveler.nationality,
              holder: true,
            },
          ],
        },
      ],
      payments: [
        {
          method: "CARD",
          card: {
            vendorCode: "VI",
            cardNumber: "4111111111111111",
            expiryDate: "2026-11",
          },
        },
      ],
    },
  };

  try {
    const res = await fetch("https://test.api.amadeus.com/v1/booking/flight-orders", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AMADEUS_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    console.log("Booking response:", result);
    setShowTravelerForm(false);
    setSelectedFlight(null);
    alert("Booking successful! Confirmation sent.");
    // Optional: navigate to confirmation page
    // navigate(`/confirmation?bookingId=${result?.data?.id}`);
  } catch (error) {
    console.error("Booking failed:", error);
    alert("Booking failed. Check console for details.");
  }
};


  const fetchAirports = async (keyword, field) => {
    if (keyword.length < 2) return;
    try {
      const results = await searchAirports(keyword);
      const options = results.map((item) => ({
        code: item.iataCode,
        name: item.name,
        city: item.address.cityName,
      }));
      field === 'source' ? setSourceOptions(options) : setDestinationOptions(options);
    } catch (err) {
      console.error('Airport search error:', err);
    }
  };

  const handleSelect = (code, field) => {
    setForm({ ...form, [field]: code });
    if (field === 'source') setSourceOptions([]);
    else setDestinationOptions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const results = await searchFlights({
        origin: form.source,
        destination: form.destination,
        date: form.date,
      });
      setFlights(results || []);
      setShowResults(true);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
    setLoading(false);
  };

  const handleBack = () => {
    setShowResults(false);
    setFlights([]);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center text-white px-4 py-10 relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-2xl text-center mb-8 animate-fadeIn">
        <h1 className="text-4xl font-bold mb-4">Discover Amazing Flights with Travel Mate</h1>
        <p className="text-lg text-gray-100">Find the best deals and plan your next adventure effortlessly.</p>
      </div>

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-white text-blue-700 font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition text-lg animate-bounce"
        >
          Explore Flights
        </button>
      )}

      {showForm && (
        <div className="w-full max-w-2xl space-y-6 mt-8 animate-fadeInUp">
          {!showResults && (
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-3xl shadow-xl space-y-6 text-gray-700"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-blue-700">Search Flights</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-blue-400 hover:text-blue-600 text-2px font-bold transition"
                  title="Close"
                >
                  ✖
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="source"
                  value={form.source}
                  onChange={handleInputChange}
                  placeholder="Source (e.g., NYC)"
                  className="w-full p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400"
                  required
                />
                {sourceOptions.length > 0 && (
                  <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full max-h-40 overflow-y-auto mt-1">
                    {sourceOptions.map((opt, idx) => (
                      <li
                        key={idx}
                        onClick={() => handleSelect(opt.code, 'source')}
                        className="p-2 hover:bg-blue-100 cursor-pointer"
                      >
                        {opt.city} ({opt.code}) – {opt.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="destination"
                  value={form.destination}
                  onChange={handleInputChange}
                  placeholder="Destination (e.g., LAX)"
                  className="w-full p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400"
                  required
                />
                {destinationOptions.length > 0 && (
                  <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full max-h-40 overflow-y-auto mt-1">
                    {destinationOptions.map((opt, idx) => (
                      <li
                        key={idx}
                        onClick={() => handleSelect(opt.code, 'destination')}
                        className="p-2 hover:bg-blue-100 cursor-pointer"
                      >
                        {opt.city} ({opt.code}) – {opt.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400"
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition font-semibold text-lg"
              >
                {loading ? 'Searching...' : 'Search Flights'}
              </button>
            </form>
          )}

          {showResults && (
            <div className="bg-white p-6 rounded-3xl shadow-lg space-y-4 text-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-blue-700">Available Flights</h3>
                <button
                  onClick={handleBack}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition text-sm font-semibold"
                >
                  ← Back
                </button>
              </div>

              {flights.length === 0 && (
                <p className="text-gray-500 text-center">No flights found for your search.</p>
              )}
              <div className="grid gap-4">
                {flights.map((flight, idx) => {
                  const itinerary = flight?.itineraries?.[0];
                  const segments = itinerary?.segments;
                  if (!segments || segments.length === 0) return null;
                  const firstSegment = segments[0];
                  const lastSegment = segments[segments.length - 1];
                  const stops = segments.length - 1;
                  const currency = flight.price?.currency || 'INR';

                  return (
                    <div key={idx} className="border p-4 rounded-2xl shadow hover:shadow-lg transition bg-gray-50">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-medium text-gray-700">
                          ✈️ {firstSegment.departure.iataCode} → {lastSegment.arrival.iataCode}
                        </div>
                        <div className="text-lg font-bold text-green-600">
                          ₹{Number(flight.price?.total || 0).toLocaleString('en-IN')} {currency}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <p><strong>Departure:</strong> {new Date(firstSegment.departure.at).toLocaleString()}</p>
                          <p><strong>Arrival:</strong> {new Date(lastSegment.arrival.at).toLocaleString()}</p>
                        </div>
                        <div>
                          <p><strong>Duration:</strong> {itinerary?.duration?.replace('PT', '').toLowerCase()}</p>
                          <p><strong>Stops:</strong> {stops === 0 ? 'Non-stop' : `${stops} stop(s)`}</p>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        Airline: {airlineNames[firstSegment.carrierCode] || firstSegment.carrierCode} | Flight #: {firstSegment.number}
                      </div>
                     <button
                        onClick={() => handleBookClick(flight)}
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition text-sm font-semibold">
                        Book Now
                      </button>

                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
      {showTravelerForm && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-2xl p-8 w-full max-w-xl text-gray-800 relative">
      <h2 className="text-xl font-bold mb-4">Enter Traveler Information</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleBookFlight(selectedFlight, traveler);
        }}
        className="space-y-4"
      >
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="First Name"
            required
            className="w-full p-2 border rounded"
            value={traveler.firstName}
            onChange={(e) => setTraveler({ ...traveler, firstName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Last Name"
            required
            className="w-full p-2 border rounded"
            value={traveler.lastName}
            onChange={(e) => setTraveler({ ...traveler, lastName: e.target.value })}
          />
        </div>
        <input
          type="date"
          required
          className="w-full p-2 border rounded"
          value={traveler.dateOfBirth}
          onChange={(e) => setTraveler({ ...traveler, dateOfBirth: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
          value={traveler.email}
          onChange={(e) => setTraveler({ ...traveler, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          required
          className="w-full p-2 border rounded"
          value={traveler.phone}
          onChange={(e) => setTraveler({ ...traveler, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Passport Number"
          required
          className="w-full p-2 border rounded"
          value={traveler.passportNumber}
          onChange={(e) => setTraveler({ ...traveler, passportNumber: e.target.value })}
        />
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => setShowTravelerForm(false)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default SearchForm;
