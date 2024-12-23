import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../Services/localStorage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyOtpResetPassword = () => {
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state;

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleVerifySubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('auth/verify-otp-reset-password', { email, otp, newPassword });
            toast.success(response.data.msg);
            navigate('/password-reset-success');
        } catch (error) {
            toast.error('Failed to reset password');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Verify OTP and Reset Password</h2>
                <form onSubmit={handleVerifySubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">OTP</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={handleOtpChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyOtpResetPassword;