import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDetailsContext } from '../App';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { decodeToken } from '../Utils/decodeToken';

const Settings = () => {
  const { userData, setUserData } = useContext(UserDetailsContext);
  const [username, setUsername] = useState(userData?.username || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [tickets, setTickets] = useState([]);
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token from localStorage:", token);
    if (token) {
      const decoded = decodeToken(token);
      console.log("Decoded token:", decoded); // Check if username, email, phone, role exist
      setProfile(decoded);
      setUsername(decoded.username || '');
      setEmail(decoded.email || '');
    }

    const fetchTickets = async () => {
      try {
        const response = await axios.get('/api/tickets/user');
        console.log("Tickets from /api/tickets/user:", response.data);
        setTickets(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/user/update', { username, email });
      setUserData(response.data);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    }
  };

  const handlePasswordChange = () => {
    navigate('/request-password-reset');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Update Profile
          </button>
        </form>
        <button
          onClick={handlePasswordChange}
          className="mt-4 w-full py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          Change Password
        </button>
        <h3 className="text-xl font-bold mt-6">Purchased Tickets</h3>
        <ul className="space-y-4 mt-4">
          {Array.isArray(tickets) && tickets.map(ticket => (
            <li key={ticket.id} className="border-b pb-2">
              <p className="text-gray-700">Event ID: {ticket.event}</p>
              <p className="text-gray-700">Price: ${ticket.price}</p>
              <p className="text-gray-700">Quantity: {ticket.quantity}</p>
              <p className="text-gray-700">Ticket Tier: {ticket.ticketTier}</p>
              <p className="text-gray-700">Purchased At: {new Date(ticket.purchasedAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
        </div>
      <ToastContainer />
    </div>
  );
};

export default Settings;