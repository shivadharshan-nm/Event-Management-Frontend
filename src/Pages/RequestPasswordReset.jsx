import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Services/Api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequestPasswordReset = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleRequestSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('auth/request-password-reset', { email });
            toast.success(response.data.msg);
            navigate('/verify-otp-reset-password', { state: { email } });
        } catch (error) {
            toast.error('Failed to send OTP');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Request Password Reset</h2>
                <form onSubmit={handleRequestSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        Send OTP
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RequestPasswordReset;