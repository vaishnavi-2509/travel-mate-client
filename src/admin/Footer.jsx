// Footer.jsx
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 grid-cols-1 md:grid-cols-4 text-sm">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-extrabold mb-2">Travel Mate</h2>
          <p className="text-white/80">Your ultimate travel companion. Discover, explore, and enjoy the world with us.</p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-white/80">
            <li><a href="#home" className="hover:text-white">Home</a></li>
            <li><a href="#places" className="hover:text-white">Places</a></li>
            <li><a href="#popular" className="hover:text-white">Popular</a></li>
            <li><a href="#reviews" className="hover:text-white">Reviews</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Auth Links */}
        <div>
          <h3 className="font-semibold mb-2">Account</h3>
          <ul className="space-y-1 text-white/80">
            <li>
              <Link to="/login" className="hover:text-white">Login</Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-white">Sign Up</Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="font-semibold mb-2">Connect with us</h3>
          <div className="flex items-center space-x-4 text-white/80">
            <a href="#" aria-label="Facebook" className="hover:text-white">
              <Facebook size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-white">
              <Instagram size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-white">
              <Twitter size={20} />
            </a>
            <a href="mailto:contact@travelmate.com" className="hover:text-white">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center py-4 text-xs text-white/60 border-t border-white/30">
        © {new Date().getFullYear()} Travel Mate. All rights reserved.
      </div>
    </footer>
  );
}
