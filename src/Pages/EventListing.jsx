import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../Services/localStorage.js'; // Ensure the correct path to your API service

const EventListing = ({ isLoggedIn }) => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await api.get('/events');
        setEvents(response.data);

        // Extract unique categories from events
        const uniqueCategories = [...new Set(response.data.map(event => event.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchEvents();
    }
  }, [isLoggedIn]);

  const filteredEvents = category === 'All' ? events : events.filter(event => event.category === category);

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Event Listings</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        >
          <option value="All">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="text-center">
          <p>Loading events...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={event.bannerUrl} alt={event.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold">{event.name}</h2>
                <p className="text-gray-700">{event.description}</p>
                <Link to={`/events/${event.id}`} className="text-blue-500 hover:underline mt-2 inline-block">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">{selectedEvent.name}</h2>
            <p>{selectedEvent.description}</p>
            <button onClick={handleCloseModal} className="mt-4 bg-blue-500 text-white p-2 rounded-lg">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventListing;