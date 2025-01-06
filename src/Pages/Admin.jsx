import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [events, setEvents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [supportInquiries, setSupportInquiries] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch initial data for events, payments, support inquiries, and reports
    fetchEvents();
    fetchPayments();
    fetchSupportInquiries();
    fetchReports();
  }, []);

  const fetchEvents = async () => {
    const response = await axios.get('/api/events');
    setEvents(Array.isArray(response.data) ? response.data : []);
  };

  const fetchPayments = async () => {
    const response = await axios.get('/api/payments');
    setPayments(Array.isArray(response.data) ? response.data : []);
  };

  const fetchSupportInquiries = async () => {
    const response = await axios.get('/api/support-inquiries');
    setSupportInquiries(Array.isArray(response.data) ? response.data : []);
  };

  const fetchReports = async () => {
    const response = await axios.get('/api/reports');
    setReports(Array.isArray(response.data) ? response.data : []);
  };

  const handleMonitorPayments = async () => {
    fetchPayments();
  };

  const handleUserSupport = async () => {
    fetchSupportInquiries();
  };

  const generateReports = async () => {
    setReports([]);
    for (const event of events) {
      const { data: tickets } = await axios.get(`/api/tickets/event/${event.id}`);
      const totalRevenue = tickets.reduce(
        (sum, ticket) => sum + (ticket.price * ticket.quantity), 
        0
      );
      setReports(prev => [
        ...prev,
        {
          eventPerformance: 'Placeholder performance',
          revenue: `$${totalRevenue}`,
          attendeeFeedback: 'Placeholder feedback'
        }
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 p-8">
      <h1 className="text-3xl text-blue-500 font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Actions</h2>
          <button onClick={handleMonitorPayments} className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4">Monitor Payments</button>
          <button onClick={handleUserSupport} className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4">User Support</button>
          <button onClick={generateReports} className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Generate Reports</button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Support Inquiries</h2>
          <ul className="space-y-4">
            {Array.isArray(supportInquiries) && supportInquiries.map(inquiry => (
              <li key={inquiry.id} className="border-b pb-2">
                <p className="text-gray-700">{inquiry.message}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Reports</h2>
          <ul className="space-y-4">
            {reports.map((report, index) => (
              <li key={index} className="border-b pb-2">
                <p className="text-gray-700">Event Performance: {report.eventPerformance}</p>
                <p className="text-gray-700">Revenue: {report.revenue}</p>
                <p className="text-gray-700">Attendee Feedback: {report.attendeeFeedback}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;
