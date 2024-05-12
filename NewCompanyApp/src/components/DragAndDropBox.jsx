import React, { useState } from 'react';

const DragAndDropBox = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsDropdownOpen(false); // Close the dropdown when the menu is toggled
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex justify-between items-center py-4 px-8 bg-gray-800 text-white">
      <div className="flex items-center space-x-4">
        <div className="text-xl font-bold">Logo</div>
        <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </div>
      </div>
      <div className={`md:flex md:items-center md:space-x-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
        <a href="#" className="hover:text-gray-400">Home</a>
        <a href="#" className="hover:text-gray-400">About</a>
        <a
          href="#"
          className={`hover:text-gray-400 ${isDropdownOpen ? 'text-gray-400' : ''}`}
          onMouseEnter={toggleDropdown}
          onMouseLeave={toggleDropdown}
        >
          Services
        </a>
        <a href="#" className="hover:text-gray-400">Contact</a>
      </div>
    </div>
  );
};



export default DragAndDropBox;
