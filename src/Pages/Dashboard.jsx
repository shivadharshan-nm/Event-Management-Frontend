import React, { useEffect, useState, useContext } from 'react';
import { UserDetailsContext } from '../App';
import { useNavigate } from 'react-router-dom';
import api from '../Services/localStorage.js';

const Dashboard = () => {
  const { userData, setUserData } = useContext(UserDetailsContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tickets, setTickets] = useState([]);
  const [profile, setProfile] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    profilePic: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userData) {
      navigate('/login');
    } else {
      setProfile({
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: '',
        profilePic: userData.profilePic,
      });
      // Fetch tickets
      fetchTickets();
    }
  }, [userData, navigate]);

  const fetchTickets = async () => {
    try {
      const response = await api.get('/api/tickets/user');
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleProfilePicChange = (e) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      profilePic: e.target.files[0],
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    // Update profile in the backend
    // Example: const response = await api.put(`/users/${userData.id}`, profile);
    // setUserData(response.data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome, {userData?.name}</h1>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="flex justify-between mb-4">
          <button
            className={`px-4 py-2 ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => handleTabClick('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'past-events' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => handleTabClick('past-events')}
          >
            Past Events
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'transactions' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => handleTabClick('transactions')}
          >
            Transactions
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => handleTabClick('profile')}
          >
            Profile
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Event Analytics</h2>
            {/* Display event analytics here */}
          </div>
        )}

        {activeTab === 'past-events' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Past Events</h2>
            <ul>
              {tickets.map((ticket) => (
                <li key={ticket.id} className="mb-2">
                  <div className="bg-gray-200 p-2 rounded-lg">
                    <h3 className="text-xl font-bold">Event ID: {ticket.event}</h3>
                    <p>Ticket Tier: {ticket.ticketTier}</p>
                    <p>Quantity: {ticket.quantity}</p>
                    <p>Purchased At: {new Date(ticket.purchasedAt).toLocaleString()}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Transactions</h2>
            <ul>
              {tickets.map((ticket) => (
                <li key={ticket.id} className="mb-2">
                  <div className="bg-gray-200 p-2 rounded-lg">
                    <p>Transaction ID: {ticket.id}</p>
                    <p>Amount: ₹{ticket.price}</p>
                    <p>Date: {new Date(ticket.purchasedAt).toLocaleString()}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
            <form onSubmit={handleProfileSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={profile.password}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Profile Picture</label>
                <input
                  type="file"
                  name="profilePic"
                  onChange={handleProfilePicChange}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;