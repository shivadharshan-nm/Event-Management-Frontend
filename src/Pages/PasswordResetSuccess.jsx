import React from 'react';
import { useNavigate } from 'react-router-dom';

const PasswordResetSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-800 p-4 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-4">Password Reset Successful</h2>
                <p>Your password has been reset successfully.</p>
                <button
                    onClick={() => navigate('/login')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
};

export default PasswordResetSuccess;