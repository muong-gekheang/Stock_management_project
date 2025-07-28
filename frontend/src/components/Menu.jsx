
import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Menu Drawer - Partial Screen */}
      <div
        className="fixed top-0 left-0 w-64 max-w-[80vw] h-full bg-green-700 text-white flex flex-col z-50 font-sans shadow-xl transform transition-transform duration-300 ease-in-out"
        style={{ transform: 'translateX(0)' }}
      >
        {/* Header Section inside Drawer */}
        <div className="flex w-full justify-between items-center p-4 box-border border-b border-green-600">
          <h2 className="text-xl font-bold m-0">Menu</h2>
          <button
            onClick={onClose}
            className="text-white text-2xl p-1 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow overflow-y-auto py-4">
          <ul className="list-none p-0 m-0">
            <li className="mb-1 px-2">
              <Link
                to="/"
                className="text-white no-underline text-lg font-medium block py-3 px-4 rounded-lg transition duration-300 ease-in hover:bg-white/15"
                onClick={onClose}
              >
                Home
              </Link>
            </li>
            <li className="mb-1 px-2">
              <Link
                to="/categories"
                className="text-white no-underline text-lg font-medium block py-3 px-4 rounded-lg transition duration-300 ease-in hover:bg-white/15"
                onClick={onClose}
              >
                categories
              </Link>
            </li>
            <li className="mb-1 px-2">
              <Link
                to="/products"
                className="text-white no-underline text-lg font-medium block py-3 px-4 rounded-lg transition duration-300 ease-in hover:bg-white/15"
                onClick={onClose}
              >
                Products
              </Link>
            </li>
            <li className="mb-1 px-2">
              <Link
                to="/sale-record" 
                className="text-white no-underline text-lg font-medium block py-3 px-4 rounded-lg transition duration-300 ease-in hover:bg-white/15"
                onClick={onClose}
              >
                Sales
              </Link>
            </li>
            <li className="mb-1 px-2">
              <Link
                to="/purchase-record" 
                className="text-white no-underline text-lg font-medium block py-3 px-4 rounded-lg transition duration-300 ease-in hover:bg-white/15"
                onClick={onClose}
              >
                Purchases
              </Link>
            </li>
            <li className="mb-1 px-2">
              <Link
                to="/suppliers"
                className="text-white no-underline text-lg font-medium block py-3 px-4 rounded-lg transition duration-300 ease-in hover:bg-white/15"
                onClick={onClose}
              >
                suppliers
              </Link>
            </li>
            <li className="mb-1 px-2">
              <Link
                to="/history" 
                className="text-white no-underline text-lg font-medium block py-3 px-4 rounded-lg transition duration-300 ease-in hover:bg-white/15"
                onClick={onClose}
              >
                History
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Menu;