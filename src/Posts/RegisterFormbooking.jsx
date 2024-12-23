import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterFormbooking = () => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState('home');

  // Handle tab switching
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold text-center">Register for Booking</h1>
        <div className="font-sans p-4">
          {/* Tab Navigation */}
          <ul className="flex bg-gray-100">
            <li
              id="homeTab"
              className={`tab w-full text-center text-base py-3 px-6 cursor-pointer ${
                activeTab === 'home' ? 'text-white font-bold bg-purple-500' : 'text-gray-600 font-semibold'
              }`}
              onClick={() => handleTabClick('home')}
            >
              Home
            </li>
            <li
              id="settingTab"
              className={`tab w-full text-center text-base py-3 px-6 cursor-pointer ${
                activeTab === 'setting' ? 'text-white font-bold bg-purple-500' : 'text-gray-600 font-semibold'
              }`}
              onClick={() => handleTabClick('setting')}
            >
              Settings
            </li>
            <li
              id="profileTab"
              className={`tab w-full text-center text-base py-3 px-6 cursor-pointer ${
                activeTab === 'profile' ? 'text-white font-bold bg-purple-500' : 'text-gray-600 font-semibold'
              }`}
              onClick={() => handleTabClick('profile')}
            >
              Profile
            </li>
          </ul>

          {/* Tab Content */}
          <div
            id="homeContent"
            className={`tab-content max-w-2xl mt-8 ${activeTab === 'home' ? 'block' : 'hidden'}`}
          >
            <h4 className="text-lg font-bold text-gray-600">Home</h4>
            <p className="text-sm text-gray-600 mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor arcu, at fermentum dui.
              Maecenas vestibulum a turpis in lacinia. Proin aliquam turpis at erat venenatis malesuada.
            </p>
          </div>
          <div
            id="settingContent"
            className={`tab-content max-w-2xl mt-8 ${activeTab === 'setting' ? 'block' : 'hidden'}`}
          >
            <h4 className="text-lg font-bold text-gray-600">Setting</h4>
            <p className="text-sm text-gray-600 mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor arcu, at fermentum dui.
              Maecenas vestibulum a turpis in lacinia. Proin aliquam turpis at erat venenatis malesuada. Sed semper,
              justo vitae consequat fermentum, felis diam posuere ante, sed fermentum quam justo in dui.
            </p>
          </div>
          <div
            id="profileContent"
            className={`tab-content max-w-2xl mt-8 ${activeTab === 'profile' ? 'block' : 'hidden'}`}
          >
            <h4 className="text-lg font-bold text-gray-600">Profile</h4>
            <p className="text-sm text-gray-600 mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor arcu, at fermentum dui.
              Maecenas vestibulum a turpis in lacinia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterFormbooking;
