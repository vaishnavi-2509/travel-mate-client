// src/hooks/useAmadeusToken.js
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useAmadeusToken() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const params = new URLSearchParams();
      params.append('grant_type', 'client_credentials');
      params.append('client_id', import.meta.env.VITE_AMADEUS_API_KEY);
      params.append('client_secret', import.meta.env.VITE_AMADEUS_API_SECRET);

      try {
        const res = await axios.post(
          'https://test.api.amadeus.com/v1/security/oauth2/token',
          params
        );
        setToken(res.data.access_token);
      } catch (err) {
        console.error('Token fetch error:', err);
        setError('Failed to fetch Amadeus token.');
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  return { token, loading, error };
}
