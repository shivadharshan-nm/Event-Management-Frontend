import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../Services/Api.js'; 

const EventListing = () => {
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

    // Always fetch events
    fetchEvents();
  }, []);

  const getImageUrl = (media) => {
    if (!media || !media.images || media.images.length === 0) return '/no-image.jpg';
    const image = media.images[0];
    if (image.startsWith('http')) return image;
    return `${process.env.REACT_APP_API_URL}/${image}`;
  };

  const filteredEvents = category === 'All' ? events : events.filter(event => event.category === category);

  const handleViewDetails = async (event) => {
    try {
      const detailsResponse = await api.get(`/events/${event._id}`);
      const bookingsResponse = await api.get(`/events/${event._id}/bookings`);
      setSelectedEvent({ ...detailsResponse.data, bookings: bookingsResponse.data });
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Events</h1>
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
      ) : filteredEvents.length === 0 ? (
        <div className="text-center">
          <p>No events found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredEvents.map((event) => (
            <div key={event._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={getImageUrl(event.media)} alt={event.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold">{event.name}</h2>
                <p className="text-gray-700">{event.description}</p>
                <button onClick={() => handleViewDetails(event)} className="text-blue-500 hover:underline mt-2 inline-block">View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold">{selectedEvent.name}</h2>
            <p>{selectedEvent.description}</p>
            <p>Date: {new Date(selectedEvent.date).toLocaleDateString()}</p>
            <p>Time: {new Date(`1970-01-01T${selectedEvent.time}Z`).toLocaleTimeString()}</p>
            <p>Category: {selectedEvent.category}</p>
            <p>Location: {selectedEvent.location}</p>
            <h3 className="mt-4 font-semibold">Bookings:</h3>
            <ul>
              {selectedEvent.bookings?.map((booking) => (
                <li key={booking.id}>{booking.userName} - {booking.quantity} tickets</li>
              ))}
            </ul>
            <button onClick={handleCloseModal} className="mt-4 bg-blue-500 text-white p-2 rounded-lg">Close</button>
            <Link to={`/book/${selectedEvent._id}`} className="mt-4 bg-green-500 text-white p-2 rounded-lg inline-block">Book Tickets</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventListing;