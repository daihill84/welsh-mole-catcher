'use client';

import { useState } from 'react';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-green-700">
          Welsh Mole Catcher
        </a>

        <button
          className="text-3xl md:hidden text-green-700"
          onClick={toggleMenu}
        >
          ☰
        </button>

        <ul
          className={`md:flex md:items-center md:space-x-8 font-medium text-green-800 transition-all duration-300 ease-in-out ${
            isOpen
              ? 'block mt-4 bg-white p-4 rounded-xl shadow-lg'
              : 'hidden md:flex'
          }`}
        >
          <li>
            <a
              href="#about"
              className="hover:text-green-600 block py-2"
              onClick={toggleMenu}
            >
              About
            </a>
          </li>

          <li>
            <a
              href="#services"
              className="hover:text-green-600 block py-2"
              onClick={toggleMenu}
            >
              Services
            </a>
          </li>

          <li>
            <a
              href="#contact"
              className="hover:text-green-600 block py-2"
              onClick={toggleMenu}
            >
              Contact
            </a>
          </li>

          <li>
            <a
              href="/privacy-policy"
              className="hover:text-green-600 block py-2"
              onClick={toggleMenu}
            >
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
