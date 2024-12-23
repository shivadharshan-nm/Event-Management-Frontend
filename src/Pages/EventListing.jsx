import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../Services/localStorage.js';

const EventListing = ({ isLoggedIn }) => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        setEvents(response.data);

        // Extract unique categories from events
        const uniqueCategories = [...new Set(response.data.map(event => event.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching events:', error);
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

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const formatTime = (time) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(`1970-01-01T${time}Z`).toLocaleTimeString(undefined, options);
  };

  return (
    <div className="container mx-auto mt-8">
      {isLoggedIn ? (
        <>
          <h1 className="text-3xl font-bold text-center">Events</h1>
          <div className="flex justify-center mt-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-lg px-4 py-2"
            >
              <option value="All">All</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredEvents.map(event => (
              <div key={event.id} className="bg-white shadow rounded-lg p-4">
                <img src={event.media.images[0]} alt={event.name} className="w-full h-48 object-cover rounded-t-lg" />
                <h3 className="text-xl font-bold mt-4">{event.name}</h3>
                <p className="text-gray-700 mt-2">{event.description}</p>
                <p className="text-gray-500 mt-2">Date: {formatDate(event.date)}</p>
                <p className="text-gray-500 mt-2">Time: {formatTime(event.time)}</p>
                <p className="text-gray-500 mt-2">Category: {event.category}</p>
                <button
                  onClick={() => handleViewDetails(event)}
                  className="text-blue-600 hover:underline mt-4 block"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          {selectedEvent && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
                <button
                  onClick={handleCloseModal}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                >
                  &times;
                </button>
                <img src={selectedEvent.media.images[0]} alt={selectedEvent.name} className="w-full h-64 object-cover rounded-t-lg" />
                <h2 className="text-2xl font-bold mt-4">{selectedEvent.name}</h2>
                <p className="text-gray-700 mt-2">{selectedEvent.description}</p>
                <p className="text-gray-500 mb-2">Date: {formatDate(selectedEvent.date)}</p>
                <p className="text-gray-500 mb-2">Time: {formatTime(selectedEvent.time)}</p>
                <p className="text-gray-500 mt-2">Location: {selectedEvent.location}</p>
                <p className="text-gray-500 mt-2">Category: {selectedEvent.category}</p>
                <div className="flex justify-between items-center mt-4">
                  <Link
                    to={`/ticketbooking/${selectedEvent.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Book a Ticket
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center mt-8">
          <h2 className="text-2xl font-bold">Please log in to view events.</h2>
          <Link to="/login" className="text-blue-600 hover:underline mt-4 block">
            Go to Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default EventListing;