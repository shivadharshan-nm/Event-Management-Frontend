import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaIoxhost } from "react-icons/fa6";
import { UserDetailsContext } from '../App';

const Navbar = () => {
  const { userData } = useContext(UserDetailsContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic
    navigate('/logout');
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <FaIoxhost className="text-white text-xl font-bold " />
        <span className="text-white text-xl font-bold ">Eventify</span>
        <span>
        
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      <div className="md:flex md:items-center md:gap-12">
        <nav aria-label="Global" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <Link to="/" className="text-white transition hover:text-gray-300">Home</Link>
            </li>

            <li>
              <Link to="/events" className="text-white transition hover:text-gray-300">Events</Link>
            </li>

            <li>
              <Link to="/dashboard" className="text-white transition hover:text-gray-300">Dashboard</Link>
            </li>

            <li>
              <Link to="/settings" className="text-white transition hover:text-gray-300">Settings</Link>
            </li>

            <li>
              <Link to="/login" className="text-white transition hover:text-gray-300">Login</Link>
            </li>
          </ul>
        </nav>
        
      </div>
    </div>
  </div>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
