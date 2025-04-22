'use client';

import { useState } from 'react';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <a href="/" className="nav-logo">
          Welsh Mole Catcher
        </a>
        <button className="nav-menu-button" onClick={toggleMenu}>
          ☰
        </button>
        <ul className={`nav-menu ${isOpen ? 'open' : ''}`}>
          <li className="nav-item">
            <a href="#about" className="nav-link" onClick={toggleMenu}>
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="#services" className="nav-link" onClick={toggleMenu}>
              Services
            </a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-link" onClick={toggleMenu}>
              Contact
            </a>
          </li>
          <li className="nav-item">
            <a href="/privacy-policy" className="nav-link" onClick={toggleMenu}>
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}