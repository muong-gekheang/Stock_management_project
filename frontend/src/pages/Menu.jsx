/* This page is duplicate with menu.jsx file in component. */
/* This page is not used */

import React from 'react'; // Make sure React is imported

const Menu = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-[#6a0dad] text-white flex flex-col items-center justify-center p-5 box-border z-50 font-sans">
      <div className="flex w-full justify-between items-center absolute top-10 left-0 px-5 box-border">
        <button className="bg-none border-none text-4xl cursor-pointer text-white py-[5px] px-[10px] rounded-lg transition duration-300 ease-in hover:bg-white/10">
          &times;
        </button>
        <h1 className="text-3xl m-0 absolute left-1/2 -translate-x-1/2">Inventor.io</h1>
        {/* No corresponding CSS for the third item in the header for the title to be truly centered between two items,
            so keeping it as is to match original layout intent. */}
      </div>
      <nav className="mt-20 w-full text-center">
        <ul className="list-none p-0 m-0">
          <li className="mb-6"><a href="#" className="text-white no-underline text-2xl font-medium py-2.5 px-5 rounded-lg inline-block transition duration-300 ease-in transform duration-200 hover:bg-white/15 hover:scale-105">Dashboard</a></li>
          <li className="mb-6"><a href="#" className="text-white no-underline text-2xl font-medium py-2.5 px-5 rounded-lg inline-block transition duration-300 ease-in transform duration-200 hover:bg-white/15 hover:scale-105">Product</a></li>
          <li className="mb-6"><a href="#" className="text-white no-underline text-2xl font-medium py-2.5 px-5 rounded-lg inline-block transition duration-300 ease-in transform duration-200 hover:bg-white/15 hover:scale-105">Category</a></li>
          <li className="mb-6"><a href="#" className="text-white no-underline text-2xl font-medium py-2.5 px-5 rounded-lg inline-block transition duration-300 ease-in transform duration-200 hover:bg-white/15 hover:scale-105">Sale records</a></li>
          <li><a href="#" className="text-white no-underline text-2xl font-medium py-2.5 px-5 rounded-lg inline-block transition duration-300 ease-in transform duration-200 hover:bg-white/15 hover:scale-105">Profile</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;