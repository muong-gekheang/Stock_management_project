// Menu.js
import React from 'react';
import { Link } from 'react-router-dom';

// --- Added onClose prop type for clarity ---
const Menu = ({ onClose }) => {
  return (
    <>
      {/* Backdrop - Covers entire screen but is semi-transparent */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out"
        onClick={onClose}
        aria-hidden="true" // Accessibility: indicates this is decorative/background
      ></div>

      {/* Menu Drawer - Changed positioning and size */}
      {/* --- Key Changes: w-64 (or w-3/4 max-w-xs), left-0 transform transition-transform, h-screen or h-full --- */}
      <div
        // --- Modified classes ---
        className="fixed top-0 left-0 w-64 max-w-[80vw] h-full bg-green-700 text-white flex flex-col z-50 font-sans shadow-xl transform transition-transform duration-300 ease-in-out"
        // Initial state is off-screen to the left. Parent component controls showing it.
        // You might handle the 'translate-x-0' class via a prop if needed, but typically
        // CSS or JS in the parent handles the transition based on state.
        // For simplicity here, assuming it's shown when this component renders.
        // If using state/JS to control, you'd add/remove 'translate-x-0' or similar.
        // Example using a simple conditional class (requires parent state management):
        // className={`fixed top-0 left-0 w-64 h-full ... transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        // For this static example, let's assume it slides in:
        style={{ transform: 'translateX(0)' }} // Or manage this via a prop/class
      >
        {/* Header Section inside Drawer */}
        <div className="flex w-full justify-between items-center p-4 box-border border-b border-green-600">
          <h2 className="text-xl font-bold m-0">Menu</h2> {/* Changed from h1, smaller size */}
          <button
            onClick={onClose}
            className="text-white text-2xl p-1 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close menu"
          >
            &times; {/* Or use an icon from lucide-react like X */}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow overflow-y-auto py-4"> {/* Added overflow-y-auto for long lists */}
          <ul className="list-none p-0 m-0">
            <li className="mb-1 px-2"> {/* Reduced margin */}
              <Link
                to="/"
                className="text-white no-underline text-lg font-medium block py-3 px-4 rounded-lg transition duration-300 ease-in hover:bg-white/15"
                onClick={onClose} // Close menu when link is clicked
              >
                Home
              </Link>
            </li>
            <li className="mb-1 px-2">
              <Link
                to="/products"
                className="text-white no-underline text-lg font-medium block py-3 px-4 rounded-lg transition duration-300 ease-in hover:bg-white/15"
                onClick={onClose}
              >
                Product
              </Link>
            </li>
            <li className="mb-1 px-2">
              <Link
                to="/category"
                className="text-white no-underline text-lg font-medium block py-3 px-4 rounded-lg transition duration-300 ease-in hover:bg-white/15"
                onClick={onClose}
              >
                Category
              </Link>
            </li>
            <li className="mb-1 px-2">
              <Link
                to="/sales" // Or your history path
                className="text-white no-underline text-lg font-medium block py-3 px-4 rounded-lg transition duration-300 ease-in hover:bg-white/15"
                onClick={onClose}
              >
                Sale Records
              </Link>
            </li>
            <li className="px-2">
              <Link
                to="/profile"
                className="text-white no-underline text-lg font-medium block py-3 px-4 rounded-lg transition duration-300 ease-in hover:bg-white/15"
                onClick={onClose}
              >
                Profile
              </Link>
            </li>
            {/* Add more links as needed */}
          </ul>
        </nav>

        {/* Optional Footer Section in Drawer */}
        {/* <div className="p-4 border-t border-green-600 text-sm text-green-200">
          &copy; Your App 2024
        </div> */}
      </div>
    </>
  );
};

export default Menu;