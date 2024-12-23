import React, { useState, useEffect } from "react";
import api from "../Services/localStorage.js";
import { Link, useNavigate } from "react-router-dom";

const Event = ({ posterDetail, posterId }) => {
  const [events, setEvents] = useState([]);
  const [bookingId, setBookingId] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const handlesubmit = (id) => {
    if (!isLoggedIn()) {
      alert('You must be logged in to book a ticket!');
      navigate('/login');  // Redirect to login page if not logged in
      return;
    }

    setBookingId((prevBookingId) => [...prevBookingId, id]);
  };

  const isLoggedIn = () => {
    const userToken = localStorage.getItem('userToken');
    return !!userToken; // Check if the user is logged in
  };

  const fetchEvents = async () => {
    try {
      const response = await api.get("/posts/getpost");
      setEvents(response.data.posts);
      posterId(bookingId);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  posterDetail(events);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold text-center">Event Posts</h1>
        <div className="relative ">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 absolute top-3 left-5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Go Back
          </button>

          <div className="flex justify-center absolute left-96">
            <input
              className='px-4 py-3 w-[500px] backdrop-blur-[1px] text-black rounded-xl border-2 border-orange-400 font-[sans-serif] focus:w-[600px] focus:outline-none focus:border-blue-600 transition-all duration-200 ease-linear'
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search events..."
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="z-20 absolute right-4 font-bold size-5 top-4">
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
          </div>
          <br />

          <div className="bg-gray-100 md:px-10 px-4 py-12 ">
            <div className="max-w-5xl max-lg:max-w-3xl max-sm:max-w-sm mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-sm:gap-8">
                {filteredEvents.map((Event) => (
                  <span key={Event._id} className="bg-white shadow rounded relative border transform transition-transform duration-300 hover:scale-105">
                    <div className="bg-white rounded overflow-hidden">
                      <img src={Event.image} alt={Event.title} className="w-full h-52 object-cover" />
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-3">{Event.title}</h3>
                        <p className="text-gray-500 priceinput text-sm">{Event.description}</p>
                        <div className="flex justify-between">
                          <p className="text-orange-500 text-[13px] font-semibold mt-4">{Event.date}</p>
                          <p className="mt-4 text-green-500 text-[15px]">₹{Event.generalprice}</p>
                        </div>
                        {isLoggedIn() ? (
                          <Link to={`/ticketbooking/${Event._id}`}>
                            <div className="flex justify-center">
                              <button className="h-10 w-28 bg-blue-600 text-white rounded-md" onClick={() => handlesubmit(Event._id)}>
                                Book Now
                              </button>
                            </div>
                          </Link>
                        ) : (
                          <div className="flex justify-center">
                            <button className="h-10 w-28 bg-gray-600 text-white rounded-md" disabled>
                              Login to Book
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
