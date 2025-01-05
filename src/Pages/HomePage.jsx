import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from '@ant-design/react-slick';
import api from '../Services/localStorage'; // Ensure the correct path to your API service

const Homepage = ({ isLoggedIn }) => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    if (isLoggedIn) {
      const fetchData = async () => {
        try {
          const res = await api.get('/events/');
          if (isMounted) {
            setEvents(res.data);
          }
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      };
      fetchData();
    }

    return () => {
      isMounted = false; // Cleanup function to set isMounted to false when the component unmounts
    };
  }, [isLoggedIn]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex flex-col min-h-screen">
      {isLoggedIn ? (
        <>
          <Slider {...settings} className="w-full">
            {events.map((event) => (
              <div key={event.id} className="relative">
                <img
                  src={event.media?.images?.[0] || ''}
                  alt={event.name}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                  <h3 className="text-2xl font-bold">{event.name}</h3>
                  <p>{event.description}</p>
                  <p>Date: {event.date}</p>
                  <p>Time: {event.time}</p>
                  <p>Category: {event.category}</p>
                  <p>
                    Location: {event.location?.coordinates?.[0]}, {event.location?.coordinates?.[1]}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </>
      ) : (
        <herosection className="flex-grow">
          <div className='bg-gray-800 h-[605px] flex justify-center items-center relative'>
            <div className="relative w-full h-full flex flex-col justify-center items-center text-white py-20">
              <div className="wrapper mx-auto max-w-screen-xl px-6">
                <div className="hero_content text-center">
                  <div className="hero_text_container max-w-4xl mx-auto">
                    <h1 className="hero-heading text-gray-300 text-6xl md:text-5xl lg:text-7xl font-light">Welcome to Eventify <br/> Your Gateway to the <br/> World of Events.</h1>
                    <div className="hero-text mt-12">
                      <p className="text-gray-400 text-4xl">Find the perfect event for your next adventure</p>
                      <br/>
                      <p className="text-gray-400 text-4xl">Join the community by registering to get started</p>
                    </div>
                    <Link to={"/register"}>
                      <div className="button-box mt-10 flex justify-center">
                        <button className="bg-blue-800 text-white py-2 px-6 rounded-lg text-lg">Register Now</button>
                      </div>
                    </Link>
                    <div className="hero-text mt-10">
                      <p className="text-gray-400 text-4xl">Familiar with Eventify?</p>
                    </div>
                    <Link to={"/login"}>
                      <div className="button-box mt-09 flex justify-center">
                        <button className="bg-blue-800 text-white py-1 px-5 rounded-lg text-lg">Login here</button>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </herosection>
      )}
    </div>
  );
};

export default Homepage;