import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-blue-500">Eventify</Link>
            </div>
          </div>
          <div className="flex items-center">
            {isLoggedIn && (
              <>
                <Link to="/" className="mr-4 p-2 text-gray-100 hover:text-blue-500 transition duration-300">Home</Link>
                <Link to="/events" className="mr-4 p-2 text-gray-100 hover:text-blue-500 transition duration-300">Events</Link>
                <Link to="/settings" className="mr-4 p-2 text-gray-100 hover:text-blue-500 transition duration-300">Dashboard</Link>
                <Link to="/logout" className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300">Logout</Link>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Link to="/login" className="mr-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">Login</Link>
                <Link to="/register" className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
