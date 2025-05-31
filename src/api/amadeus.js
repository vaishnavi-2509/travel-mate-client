const authUrl = import.meta.env.VITE_AMADEUS_AUTH_URL;
const flightApi = import.meta.env.VITE_AMADEUS_FLIGHT_API;
const locationApi = import.meta.env.VITE_AMADEUS_LOCATION_API;
const apiKey = import.meta.env.VITE_AMADEUS_API_KEY;
const apiSecret = import.meta.env.VITE_AMADEUS_API_SECRET;

// Cache token in memory (simple, short-term)
let accessToken = null;
let tokenExpiry = null;

async function getAccessToken() {
  const now = Date.now();

  if (accessToken && tokenExpiry && now < tokenExpiry) {
    return accessToken;
  }

  const res = await fetch(authUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: apiKey,
      client_secret: apiSecret,
    }),
  });

  const data = await res.json();
  accessToken = data.access_token;
  tokenExpiry = now + data.expires_in * 1000;

  return accessToken;
}

export async function searchFlights({ origin, destination, date }) {
    const token = await getAccessToken();
  
    const res = await fetch(
      `${flightApi}?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${date}&adults=1&nonStop=false&max=5&currencyCode=INR`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    const data = await res.json();
    return data.data;
  }
  

export async function searchAirports(keyword) {
  const token = await getAccessToken();

  const res = await fetch(
    `${locationApi}?subType=AIRPORT,CITY&keyword=${keyword}&page[limit]=5`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  return data.data;
}
