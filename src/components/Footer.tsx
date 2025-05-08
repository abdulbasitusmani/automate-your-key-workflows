
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-keysai-secondary text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Keys-AI</h3>
            <p className="text-gray-300">
              Powerful automation solutions for the modern business.
            </p>
          </div>

          {/* Center section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/agents" className="text-gray-300 hover:text-white transition-colors">
                  Agents
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-300 hover:text-white transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Right section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-gray-300 mr-1">Email:</span>
                <a href="mailto:info@keys-ai.com" className="text-gray-300 hover:text-white transition-colors">
                  info@keys-ai.com
                </a>
              </li>
              <li className="flex items-center">
                <span className="text-gray-300 mr-1">Phone:</span>
                <a href="tel:(123)456-7890" className="text-gray-300 hover:text-white transition-colors">
                  (123) 456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300 text-sm">
          &copy; {new Date().getFullYear()} Keys-AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
