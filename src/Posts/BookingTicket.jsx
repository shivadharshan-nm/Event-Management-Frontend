import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserDetailsContext } from '../App';
import api from '../Services/Api.js';

const BookingTicket = () => {
  const { userData } = useContext(UserDetailsContext);
  const { event_id } = useParams();
  const _id = event_id;
  console.log('Event ID:', _id);
  const navigate = useNavigate();
  const [ticketQuantity, setTicketQuantity] = useState(1); // Default 1 ticket
  const [ticketPrice, setTicketPrice] = useState(0);
  const [ticketType, setTicketType] = useState('');
  const initialDetails = { ticketPricing: [], location: '', date: '', description: '', name: '', time: '', category: '', media: { images: [], videos: [] } };
  const [postDetails, setPostDetails] = useState(initialDetails);
  const [loading, setLoading] = useState(false); // To show loading status
  const [totalPrice, setTotalPrice] = useState(0);

  console.log('User Data:', userData);

  useEffect(() => {
    const fetchEventDetails = async () => {
      setLoading(true);
      try {
        // Use event_id directly from params
        const response = await api.get(`/events/${event_id}`);
        const eventData = response.data;
        setPostDetails(eventData);
        if (eventData.ticketPricing.length > 0) {
          setTicketType(eventData.ticketPricing[0].tier);
          setTicketPrice(eventData.ticketPricing[0].price);
          setTotalPrice(eventData.ticketPricing[0].price);
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
        toast.error('An error occurred while fetching event details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (event_id) {
      fetchEventDetails();
    }
  }, [event_id]);

  const handleTicketTypeChange = (type) => {
    const selectedTicket = postDetails.ticketPricing.find(ticket => ticket.tier === type);
    setTicketType(type);
    setTicketPrice(selectedTicket ? selectedTicket.price : 0);
    setTotalPrice(selectedTicket ? selectedTicket.price * ticketQuantity : 0);
  };


  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value, 10);
    setTicketQuantity(quantity);
    setTotalPrice(quantity * ticketPrice);
  };

  const handleBooking = async () => {
    if (!userData || !userData.username) {
      toast.error('You must be logged in to book a ticket!');
      navigate('/login');  // Redirect to login page if not logged in
      return;
    }
  
    try {
      // Navigate to the payment page with the necessary parameters
      navigate('/payment', {
        state: {
          event_id: _id,
          username: userData.username,
          name: userData.name,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('User Data:', userData);
    console.log('Event ID:', _id);
    console.log('Ticket Type:', ticketType);
    console.log('Ticket Quantity:', ticketQuantity);
    console.log('Total Price:', totalPrice);

    // if (!userData || !userData.username) {
    //   alert('Please log in to book tickets.');
    //   navigate('/login');
    //   return;
    // }
    // setLoading(true);

    try {
      // Navigate to the payment page with the necessary parameters
      navigate('/payment', {
        state: {
          event_id: _id,
          username: userData.username,
          name: userData.name,
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

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
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
                <p className="text-gray-900">{new Date(postDetails.date).toLocaleDateString()}</p>
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Time</label>
                <p className="text-gray-900">{new Date(`1970-01-01T${postDetails.time}Z`).toLocaleTimeString()}</p>
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

export default BookingTicket;