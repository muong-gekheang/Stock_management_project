// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, User } from 'lucide-react';

const Header = ({ pageTitle, onMenuClick }) => {
  return (
    <header className="w-full flex justify-between items-center px-6 py-8 bg-white shadow-sm border-b border-gray-200">
      {/* Hamburger Menu Icon */}
      <button
        onClick={onMenuClick}
        className="text-gray-700 p-2 rounded-md hover:bg-gray-100 focus:outline-none"
        aria-label="Open menu"
      >
        <Menu className="w-10 h-10 text-black" />
      </button>

      {/* App Title */}
      <h1 className="text-4xl font-bold text-[#6E53AB]">{pageTitle}</h1>

      {/* Profile Icon - Wrapped in Link */}
      <Link to="/profile" aria-label="Profile">
        <User className="w-10 h-10 text-black hover:text-gray-600 transition" />
      </Link>
    </header>
  );
};

export default Header;
