import React, { useEffect, useState } from 'react';
import api from '../Services/localStorage.js';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Bookingticket = ({ userData }) => {
  const { event_id } = useParams();
  const _id = event_id;
  const navigate = useNavigate();
  const [ticketQuantity, setTicketQuantity] = useState(1); // Default 1 ticket
  const [ticketPrice, setTicketPrice] = useState(0);
  const [ticketType, setTicketType] = useState('');
  const initialDetails = { ticketPricing: [], location: '', date: '', description: '', name: '', time: '', category: '', media: { images: [], videos: [] } };
  const [postDetails, setPostDetails] = useState(initialDetails);
  const [loading, setLoading] = useState(false); // To show loading status
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await api.get(`/events/${_id}`);
        const eventData = response.data;
        setPostDetails(eventData);
        if (eventData.ticketPricing.length > 0) {
          setTicketType(eventData.ticketPricing[0].tier);
          setTicketPrice(eventData.ticketPricing[0].price);
          setTotalPrice(eventData.ticketPricing[0].price * ticketQuantity);
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [_id]);

  useEffect(() => {
    if (postDetails.ticketPricing.length > 0) {
      const selectedTicket = postDetails.ticketPricing.find(t => t.tier === ticketType);
      const basePrice = selectedTicket ? selectedTicket.price : 0;
      const calculatedTotal = basePrice * ticketQuantity;
      setTotalPrice(calculatedTotal);
    }
  }, [ticketType, ticketQuantity, postDetails]);

  const handleTicketTypeChange = (type) => {
    const selectedTicket = postDetails.ticketPricing.find(t => t.tier === type);
    setTicketType(type);
    setTicketPrice(selectedTicket ? selectedTicket.price : 0);
  };

  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value, 10);
    setTicketQuantity(quantity);
    setTotalPrice(quantity * ticketPrice);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Navigate to the payment page with the necessary parameters
      navigate('/payment', {
        state: {
          event_id: _id,
          user_id: userData.id,
          ticketTier: ticketType,
          quantity: ticketQuantity,
          price: totalPrice,
        },
      });
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-IN', options).format(new Date(dateString));
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'Time not available';
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Intl.DateTimeFormat('en-IN', options).format(new Date(`1970-01-01T${timeString}:00`));
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row">
          <div className="p-4 flex flex-col justify-between w-full">
            <div>
              <h2 className="text-2xl font-bold mb-2">{postDetails.name}</h2>
              <div className="mb-2">
                <label className="block text-gray-700">Description</label>
                <p className="text-gray-900">{postDetails.description}</p>
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Date</label>
                <p className="text-gray-900">{formatDate(postDetails.date)}</p>
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Time</label>
                <p className="text-gray-900">{formatTime(postDetails.time)}</p>
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Location</label>
                <p className="text-gray-900">{postDetails.location}</p>
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Category</label>
                <p className="text-gray-900">{postDetails.category}</p>
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Ticket Type</label>
                <select
                  value={ticketType}
                  onChange={(e) => handleTicketTypeChange(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {postDetails.ticketPricing.map((ticket) => (
                    <option key={ticket.tier} value={ticket.tier}>
                      {ticket.tier} - ₹{ticket.price}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={ticketQuantity}
                  onChange={handleQuantityChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Total Price</label>
                <p className="text-gray-900">₹{totalPrice}</p>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? 'Processing...' : 'Book Tickets'}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Bookingticket;