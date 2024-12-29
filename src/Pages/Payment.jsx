import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../Services/localStorage.js';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event_id, user_id, ticketTier, quantity, price, orderId } = location.state;
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    const loadRazorpay = async () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const options = {
          key: 'rzp_test_3OvUplk3DXkULw',
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
              setLoading(true);
              setTimeout(() => {
                navigate('/events');
              }, 5000);
            } catch (error) {
              console.error("Payment success error:", error);
            }
          },
          modal: {
            ondismiss: () => {
              setLoading(true);
              setTimeout(() => {
                navigate('/events');
              }, 5000);
            }
          }
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      };
      document.body.appendChild(script);
    };
    loadRazorpay();
  }, [event_id, user_id, ticketTier, quantity, price, orderId, navigate]);

  useEffect(() => {
    if (loading) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [loading]);

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? (
        <div className="text-center">
          <p className="text-2xl font-semibold">Redirecting to events page in {timer} seconds...</p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-2xl font-semibold">Loading payment gateway...</p>
        </div>
      )}
    </div>
  );
};

export default Payment;