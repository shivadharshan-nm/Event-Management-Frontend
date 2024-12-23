import React from 'react';
import { Link } from 'react-router-dom';
import { FaIoxhost } from 'react-icons/fa';

const Navbar = () => {

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <div className="flex items-center">
                <FaIoxhost className="text-white text-xl font-bold" />
                <span className="text-white text-xl font-bold">Eventify</span>
            </div>
            <div className="flex items-center">
                <Link to="/" className="text-white px-4">Home</Link>
                <Link to="/events" className="text-white px-4">Events</Link>
                <Link to="/settings" className="text-white px-4">Dashboard</Link>
                <Link to="/logout" className="text-white px-4">Logout</Link>
                <Link to="/login" className="text-white px-4">Login</Link>
            </div>
        </nav>
    );
};

export default Navbar;
