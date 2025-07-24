// Menu.js
import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>

      {/* Menu Drawer */}
      <div className="absolute top-0 left-0 w-full h-screen bg-[#6a0dad] text-white flex flex-col items-center justify-center p-5 box-border z-50 font-sans">
        <div className="flex w-full justify-between items-center absolute top-10 left-0 px-5 box-border">
          <button
            onClick={onClose}
            className="bg-none border-none text-4xl cursor-pointer text-white py-[5px] px-[10px] rounded-lg transition duration-300 ease-in hover:bg-white/10"
            aria-label="Close menu"
          >
            &times;
          </button>
          <h1 className="text-3xl m-0 absolute left-1/2 -translate-x-1/2">Inventor.io</h1>
        </div>
        <nav className="mt-20 w-full text-center">
          <ul className="list-none p-0 m-0">
            <li className="mb-6">
              <Link
                to="/"
                className="text-white no-underline text-2xl font-medium py-2.5 px-5 rounded-lg inline-block transition duration-300 ease-in transform hover:bg-white/15 hover:scale-105"
                onClick={onClose}
              >
                Home
              </Link>
            </li>
            <li className="mb-6">
              <Link
                to="/products"
                className="text-white no-underline text-2xl font-medium py-2.5 px-5 rounded-lg inline-block transition duration-300 ease-in transform hover:bg-white/15 hover:scale-105"
                onClick={onClose}
              >
                Product
              </Link>
            </li>
            <li className="mb-6">
              <Link
                to="/category"
                className="text-white no-underline text-2xl font-medium py-2.5 px-5 rounded-lg inline-block transition duration-300 ease-in transform hover:bg-white/15 hover:scale-105"
                onClick={onClose}
              >
                Category
              </Link>
            </li>
            <li className="mb-6">
              <Link
                to="/sales"
                className="text-white no-underline text-2xl font-medium py-2.5 px-5 rounded-lg inline-block transition duration-300 ease-in transform hover:bg-white/15 hover:scale-105"
                onClick={onClose}
              >
                Sale Records
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="text-white no-underline text-2xl font-medium py-2.5 px-5 rounded-lg inline-block transition duration-300 ease-in transform hover:bg-white/15 hover:scale-105"
                onClick={onClose}
              >
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Menu;