import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Auth/AuthContext.jsx";


const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5500/api/users/login", formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.data.token) {
        // localStorage.setItem('token', response.data.token); 
        login(response.data.token);
        navigate("/");
      }
    } catch (error) {
      alert(JSON.stringify(error.response?.data || "Login failed"));
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-700">Login to Travel Mate</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 text-blue-600" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>

        <div className="flex items-center justify-center space-x-2">
          <div className="h-px w-full bg-gray-300"></div>
          <span className="text-sm text-gray-400">OR</span>
          <div className="h-px w-full bg-gray-300"></div>
        </div>

        <div className="space-y-2">
          <button className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors">
            <i className="fab fa-google"></i> Continue with Google
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 transition-colors">
            <i className="fab fa-facebook-f"></i> Continue with Facebook
          </button>
        </div>

        <div className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
