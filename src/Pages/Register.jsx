import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../Services/localStorage';

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (file && validTypes.includes(file.type)) {
      setProfilePicture(file.name);
      setProfilePicturePreview(URL.createObjectURL(file));
    } else {
      toast.error("Invalid file type. Only PNG, JPEG, and JPG are allowed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      username,
      email,
      password,
      phone,
      profilePicture,
      role
    };

    try {
      const res = await api.post("/auth/register", payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 1300);
    } catch (error) {
      toast.error(error.response.data.message);
    }

    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setPhone("");
    setProfilePicture("");
    setProfilePicturePreview(null);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => setShowPassword(!showPassword)}
                  className="w-6 h-6 absolute right-3 top-3 cursor-pointer"
                  fill="#bbb"
                  viewBox="0 0 128 128"
                >
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"></path>
                </svg>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Profile Picture</label>
              <input
                type="file"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={handleProfilePictureChange}
              />
              {profilePicturePreview && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={profilePicturePreview}
                    alt="Profile Preview"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Register
            </button>
          </form>
          <p className="text-center text-gray-700 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;