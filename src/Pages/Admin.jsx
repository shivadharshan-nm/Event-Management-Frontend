import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/localStorage.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";

export const Admin = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [eventAnalytics, setEventAnalytics] = useState({});
  const [userAnalytics, setUserAnalytics] = useState({});
  const [error, setError] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.role === 'admin') {
        setAdmin(decodedToken);
        setActiveTab('dashboard');
        fetchUnapprovedPosts();
        fetchUsers();
        fetchEventAnalytics();
        fetchUserAnalytics();
      } else {
        toast.error("Unauthorized access");
        navigate('/login');
      }
    }
  }, [navigate]);

  const fetchUnapprovedPosts = async () => {
    try {
      const response = await api.get("/api/events/");
      setPosts(response.data.posts);
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching unapproved posts");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching users");
    }
  };

  const fetchEventAnalytics = async () => {
    try {
      const response = await api.get("/api/events/analytics");
      setEventAnalytics(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching event analytics");
    }
  };

  const fetchUserAnalytics = async () => {
    try {
      const response = await api.get("/api/users/analytics");
      setUserAnalytics(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching user analytics");
    }
  };

  const approveEvent = async (id) => {
    try {
      await api.put(`/api/posts/approve/${id}`);
      toast.success("Event approved successfully");
      fetchUnapprovedPosts();
    } catch (error) {
      toast.error("Error approving event");
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', credentials);
      const { token } = response.data;
      localStorage.setItem('token', token);
      const decodedToken = jwt_decode(token);
      if (decodedToken.role === 'admin') {
        setAdmin(decodedToken);
        setActiveTab('dashboard');
        toast.success("Login successful");
      } else {
        toast.error("Unauthorized access");
        localStorage.removeItem('token');
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  if (!admin) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleLoginChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleLoginChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="flex justify-between mb-4">
          <button
            className={`px-4 py-2 ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => handleTabClick('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'events' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => handleTabClick('events')}
          >
            Events
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => handleTabClick('users')}
          >
            Users
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'analytics' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => handleTabClick('analytics')}
          >
            Analytics
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
            <p>Welcome to the admin dashboard. Use the tabs to navigate through different sections.</p>
          </div>
        )}

        {activeTab === 'events' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Unapproved Events</h2>
            {error && <p className="text-red-500">{error}</p>}
            <ul>
              {posts.map((post) => (
                <li key={post.id} className="mb-2">
                  <div className="bg-gray-200 p-2 rounded-lg">
                    <h3 className="text-xl font-bold">{post.title}</h3>
                    <p>{post.description}</p>
                    <button
                      onClick={() => approveEvent(post.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2"
                    >
                      Approve
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            {error && <p className="text-red-500">{error}</p>}
            <ul>
              {users.map((user) => (
                <li key={user.id} className="mb-2">
                  <div className="bg-gray-200 p-2 rounded-lg">
                    <h3 className="text-xl font-bold">{user.username}</h3>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <p>Role: {user.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Analytics</h2>
            <div className="mb-4">
              <h3 className="text-xl font-bold">Event Analytics</h3>
              <p>Total Events: {eventAnalytics.totalEvents}</p>
              <p>Total Attendance: {eventAnalytics.totalAttendance}</p>
              <p>Total Revenue: ₹{eventAnalytics.totalRevenue}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold">User Analytics</h3>
              <p>Total Users: {userAnalytics.totalUsers}</p>
              <p>Active Users: {userAnalytics.activeUsers}</p>
              <p>New Users This Month: {userAnalytics.newUsersThisMonth}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};