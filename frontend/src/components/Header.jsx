import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, Package } from 'lucide-react';
import axios from 'axios';

const Header = ({ pageTitle, onMenuClick }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    axios
      .get('http://localhost:3001/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error('Error fetching user:', err);
      });
  }, []);

  return (
    <header className="w-full flex justify-between items-center px-4 py-4 sm:px-6 bg-white shadow-sm border-b border-gray-200">
      {/* Left Section: Hamburger (sm screens) + Store Name/Logo */}
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-md hover:bg-green-100 focus:outline-none mr-2" 
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 sm:w-8 sm:h-8 text-green-800" />
        </button>

        {/* Store Name / Logo - Always visible */}
        <div className="flex items-center space-x-2">
          <Package className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" /> 
          {/* Store Name */}
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-green-700 truncate max-w-[150px] sm:max-w-xs">
            {user?.StoreName || "My Store"} {/* Added fallback */}
          </h1>
        </div>
      </div>

      {/* Center Navigation - Visible only on medium screens and larger */}
      <nav className="hidden md:flex flex-1 justify-center">
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-medium transition-colors duration-200 ${
                  isActive ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `font-medium transition-colors duration-200 ${
                  isActive ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
                }`
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sale-record"
              className={({ isActive }) =>
                `font-medium transition-colors duration-200 ${
                  isActive ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
                }`
              }
            >
              Sales
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/purchase-record"
              className={({ isActive }) =>
                `font-medium transition-colors duration-200 ${
                  isActive ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
                }`
              }
            >
              Purchases
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `font-medium transition-colors duration-200 ${
                  isActive ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
                }`
              }
            >
              History
            </NavLink>
          </li>
        </ul>
      </nav>


      {/* Right Section: Profile Picture - Always visible */}
      <div className="flex items-center">
        <Link to="/profile" aria-label="Profile">
          <img
            src={user?.ImageURL || 'https://i.pinimg.com/1200x/5f/91/41/5f91413c8a9e766a5139c6cfe5caa837.jpg'} 
            alt="Profile"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-gray-300 hover:border-green-500 transition"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;


