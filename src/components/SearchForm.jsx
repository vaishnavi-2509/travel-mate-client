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
  const [showResults, setShowResults] = useState(false); // NEW state

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'source') fetchAirports(e.target.value, 'source');
    else if (e.target.name === 'destination') fetchAirports(e.target.value, 'destination');
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
      setShowResults(true); // Show results
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
    setLoading(false);
  };

  const handleBack = () => {
    setShowResults(false); // Hide results and go back to form
    setFlights([]); // Optionally clear flights
  };

  return (
      <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-10"
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
              <h2 className="text-2xl font-bold text-center text-blue-700">Search Flights</h2>

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
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
