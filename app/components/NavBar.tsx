'use client';

import { useState } from 'react';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <a href="/" className="text-2xl font-bold text-green-700 hover:text-green-800 transition-colors">
          Welsh Mole Catcher
        </a>

        {/* Mobile Toggle Button */}
        <button
          className="text-3xl md:hidden text-green-700 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? '✕' : '☰'}
        </button>

        {/* Navigation Links */}
        <ul
          className={`
            fixed md:static top-[60px] left-0 w-full md:w-auto 
            bg-white md:bg-transparent shadow-lg md:shadow-none 
            p-6 md:p-0 flex-col md:flex-row md:flex items-center 
            space-y-4 md:space-y-0 md:space-x-8 font-medium text-green-800 
            transition-all duration-300 ease-in-out
            ${isOpen ? 'flex' : 'hidden md:flex'}
          `}
        >
          <li>
            <a href="#about" className="hover:text-green-600 block py-2 border-b md:border-none border-gray-100" onClick={closeMenu}>
              About
            </a>
          </li>
          <li>
            <a href="#services" className="hover:text-green-600 block py-2 border-b md:border-none border-gray-100" onClick={closeMenu}>
              Services
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-green-600 block py-2 border-b md:border-none border-gray-100" onClick={closeMenu}>
              Contact
            </a>
          </li>
          <li>
            <a href="/privacy-policy" className="hover:text-green-600 block py-2" onClick={closeMenu}>
              Privacy Policy
            </a>
          </li>
          {/* Added a prominent Phone Link for SEO/UX */}
          <li className="md:hidden">
            <a href="tel:07375303124" className="bg-green-700 text-white px-6 py-2 rounded-full block text-center mt-4">
              Call Now
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
