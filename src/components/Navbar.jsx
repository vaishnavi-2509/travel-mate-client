import { Link } from "react-router-dom";
import { Menu, X, LogIn, UserPlus, CircleUserRound } from "lucide-react";
import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 md:py-4">
        {/* Logo */}
        <div className="text-3xl font-extrabold text-blue-700 tracking-wide hover:scale-105 transition-transform">
          <Link to="/">Travel Mate</Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-semibold text-gray-700">
          <li>
            <a href="#home" className="hover:text-blue-600">
              Home
            </a>
          </li>
          <li>
            <a href="#places" className="hover:text-blue-600">
              Places
            </a>
          </li>
          <li>
            <a href="#popular" className="hover:text-blue-600">
              Popular
            </a>
          </li>
          <li>
            <a href="#reviews" className="hover:text-blue-600">
              Reviews
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-blue-600">
              Contact
            </a>
          </li>
        </ul>

        {/* Desktop Auth Buttons */}
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <CircleUserRound size={36} />
            <div className="text-sm font-medium text-gray-800">
              Welcome, User
            </div>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
              className="text-sm text-red-500 hover:underline"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden md:flex space-x-4">
            <Link
              to="/login"
              className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:underline hover:scale-105 transition-transform"
            >
              <LogIn size={16} /> Login
            </Link>
            <Link
              to="/signup"
              className="flex items-center gap-1 bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow hover:bg-blue-700 hover:scale-105 transition-transform"
            >
              <UserPlus size={16} /> Sign Up
            </Link>
          </div>
        )}

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 py-4 space-y-3 shadow-md">
          <a
            href="#home"
            className="block text-gray-700 font-semibold hover:text-blue-600"
          >
            Home
          </a>
          <a
            href="#places"
            className="block text-gray-700 font-semibold hover:text-blue-600"
          >
            Places
          </a>
          <a
            href="#popular"
            className="block text-gray-700 font-semibold hover:text-blue-600"
          >
            Popular
          </a>
          <a
            href="#reviews"
            className="block text-gray-700 font-semibold hover:text-blue-600"
          >
            Reviews
          </a>
          <a
            href="#contact"
            className="block text-gray-700 font-semibold hover:text-blue-600"
          >
            Contact
          </a>
          <div className="pt-3 flex flex-col space-y-2">
            <Link
              to="/login"
              className="flex items-center gap-1 text-blue-600 font-semibold hover:underline"
            >
              <LogIn size={16} /> Login
            </Link>
            <Link
              to="/signup"
              className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold shadow hover:bg-blue-700"
            >
              <UserPlus size={16} /> Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
