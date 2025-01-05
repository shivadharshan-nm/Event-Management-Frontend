import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Perform logout logic here
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    }, [setIsLoggedIn, navigate]);

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
};

export default LogoutPage;