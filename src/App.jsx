import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Admin from './Pages/Admin';
import Bookingticket from './Posts/Bookingticket';
import Payment from './Pages/Payment';
import PageNotFound from './Pages/PageNotFound';
import Register from './Pages/Register';
import Login from './Pages/Login';
import HomePage from './Pages/HomePage';
import EventListing from './Pages/EventListing';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import Settings from './Pages/Settings';
import RequestPasswordReset from './Pages/RequestPasswordReset';
import VerifyOtpResetPassword from './Pages/VerifyOtpResetPassword';
import PasswordResetSuccess from './Pages/PasswordResetSuccess';
import { decodeToken } from './Utils/decodeToken';

export const UserDetailsContext = createContext();

const App = () => {
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = decodeToken(token);
                setUserData(decoded);
                setIsLoggedIn(true);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }
    }, []);

    return (
        <UserDetailsContext.Provider value={{ userData, setUserData }}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path='/events' element={<EventListing isLoggedIn={isLoggedIn} />} />
                    <Route path='/ticketbooking/:event_id' element={<Bookingticket />} />
                    <Route path='/payment' element={<Payment />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='/request-password-reset' element={<RequestPasswordReset />} />
                    <Route path='/verify-otp-reset-password' element={<VerifyOtpResetPassword />} />
                    <Route path='/password-reset-success' element={<PasswordResetSuccess />} />
                    <Route path='/logout' element={<Logout setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />} />
                    <Route path='*' element={<PageNotFound />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </UserDetailsContext.Provider>
    );
};

const logout = (navigate, setIsLoggedIn, setUserData) => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserData(null);
    navigate('/logout');
};

const Logout = ({ setIsLoggedIn, setUserData }) => {
    const navigate = useNavigate();
    useEffect(() => {
        logout(navigate, setIsLoggedIn, setUserData);
    }, [navigate, setIsLoggedIn, setUserData]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <h2 className="text-2xl font-bold">You have successfully logged out!</h2>
        </div>
    );
};

export default App;