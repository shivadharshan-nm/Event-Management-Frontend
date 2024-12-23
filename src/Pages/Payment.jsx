import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../Services/localStorage.js';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event_id, user_id, ticketTier, quantity, price, orderId } = location.state;

  useEffect(() => {
    const loadRazorpay = async () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const options = {
          key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay key
          amount: price * 100, // Razorpay amount is in paise
          currency: 'INR',
          name: 'Event Management Platform',
          description: 'Ticket Booking',
          order_id: orderId,
          handler: async (response) => {
            try {
              const paymentData = {
                event_id,
                user_id,
                ticketTier,
                quantity,
                price,
                payment_id: response.razorpay_payment_id,
              };
              const result = await api.post('/payments/success', paymentData);
              if (result.data.success) {
                navigate('/success');
              } else {
                navigate('/failure');
              }
            } catch (error) {
              console.error('Payment failed:', error);
              navigate('/failure');
            }
          },
          prefill: {
            name: 'Your Name', // Replace with user's name
            email: 'your.email@example.com', // Replace with user's email
            contact: '9999999999', // Replace with user's contact number
          },
          theme: {
            color: '#3399cc',
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      };
      script.onerror = () => {
        console.error('Razorpay SDK failed to load.');
      };
      document.body.appendChild(script);
    };

    loadRazorpay();
  }, [event_id, user_id, ticketTier, quantity, price, orderId, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-bold">Processing Payment...</h2>
    </div>
  );
};

export default Payment;