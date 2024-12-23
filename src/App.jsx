import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
// import Admin from './Pages/Admin';  // Change this line
import Bookingticket from './Posts/Bookingticket';
import Payment from './Pages/Payment';
import PageNotFound from './Pages/PageNotFound';
import Dashboard from './Pages/Dashboard';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import HomePage from './Pages/HomePage';
import EventListing from './Pages/EventListing';
import Footer from './Components/Footer';
import Navbar from './components/Navbar';
import Settings from './Pages/Settings';

export const UserDetailsContext = createContext();

const App = () => {
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <UserDetailsContext.Provider value={{ userData, setUserData }}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    {/* <Route path='/admin' element={<Admin />} />  // Update component name */}
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path='/events' element={<EventListing />} />
                    <Route path='/ticketbooking/:event_id' element={<Bookingticket />} />
                    <Route path='/payment' element={<Payment />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='*' element={<PageNotFound />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </UserDetailsContext.Provider>
    );
};

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // Perform logout logic
        navigate('/login');
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <h2 className="text-2xl font-bold">Uh-oh, you have logged out!</h2>
        </div>
    );
};

export default App;