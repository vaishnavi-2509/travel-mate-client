import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const checkAuthToken = () => {
      const token = localStorage.getItem("token");
      console.log("Stored Token:", token);
      if (token) {
        try {
          const tokenData = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
          console.log("Decoded Token:", tokenData);

          const expirationTime = tokenData.exp * 1000; // Convert to milliseconds
          if (expirationTime > Date.now()) {
            setIsLoggedIn(true);
            setUserName(tokenData.name);
          } else {
            // Token expired
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            setUserName(null);
          }
        } catch (error) {
          console.error("Error checking auth token:", error);
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          setUserName(null);
        }
      }
    };

    checkAuthToken();
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    try {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      setIsLoggedIn(true);
      setUserName(tokenData.name);
    } catch (error) {
      console.error("Invalid token during login");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserName(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
