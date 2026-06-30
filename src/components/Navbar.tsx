import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            My Gunupur
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
            <Link to="/home-loan" className="text-gray-700 hover:text-blue-600">Home Loan</Link>
            <Link to="/emergency" className="text-gray-700 hover:text-blue-600">Emergency</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
