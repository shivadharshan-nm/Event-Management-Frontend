import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './Pages/Admin';
import Bookingticket from './Posts/BookingTicket';
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
import LogoutPage from './Pages/LogoutPage';

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
        <UserDetailsContext.Provider value={{ userData }}>
            <Router>
                <div className="flex flex-col min-h-screen">
                    <Navbar isLoggedIn={isLoggedIn} />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
                            <Route path="/admin" element={<Admin />} />
                            <Route path="/payment" element={<Payment />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                            <Route path="/events" element={<EventListing isLoggedIn={isLoggedIn} />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/request-password-reset" element={<RequestPasswordReset />} />
                            <Route path="/verify-otp-reset-password" element={<VerifyOtpResetPassword />} />
                            <Route path="/password-reset-success" element={<PasswordResetSuccess />} />
                            <Route path="/logout" element={<LogoutPage setIsLoggedIn={setIsLoggedIn} />} />
                            <Route path="/eventListing/:event_id" element={<EventListing isLoggedIn={isLoggedIn} />} />
                            <Route path="/posts/bookingTicket/:event_id" element={<Bookingticket />} />
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </UserDetailsContext.Provider>
    );
};

export default App;