import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export default function AdminPanel() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBookings();
    // Refresh bookings every 5 seconds
    const interval = setInterval(fetchBookings, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/bookings`);
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch bookings');
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await axios.put(`${API_URL}/admin/bookings/${bookingId}`, {
        status: newStatus
      });
      setMessage('✅ Booking status updated');
      fetchBookings();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Failed to update booking');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDelete = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await axios.delete(`${API_URL}/admin/bookings/${bookingId}`);
        setMessage('✅ Booking deleted');
        fetchBookings();
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('❌ Failed to delete booking');
        setTimeout(() => setMessage(''), 3000);
      }
    }
  };

  if (loading) {
    return <div className="admin-panel"><h2>Loading...</h2></div>;
  }

  // Calculate statistics
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length
  };

  return (
    <div className="admin-panel">
      <h2>📊 Admin Dashboard</h2>

      {message && (
        <div style={{
          background: message.includes('✅') ? '#4caf50' : '#f44336',
          color: 'white',
          padding: '15px',
          borderRadius: '5px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Bookings</h3>
          <div className="number">{stats.total}</div>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <div className="number">{stats.pending}</div>
        </div>
        <div className="stat-card">
          <h3>Confirmed</h3>
          <div className="number">{stats.confirmed}</div>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <div className="number">{stats.completed}</div>
        </div>
      </div>

      <h3>All Cab Bookings</h3>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <p>No bookings yet. 🚗</p>
        </div>
      ) : (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Pickup</th>
              <th>Drop</th>
              <th>Date</th>
              <th>Passengers</th>
              <th>Price (₹)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td><strong>{booking.name}</strong></td>
                <td>{booking.email}</td>
                <td>{booking.phone}</td>
                <td>{booking.pickupLocation}</td>
                <td>{booking.dropLocation}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td>{booking.passengers}</td>
                <td>₹{booking.totalPrice}</td>
                <td>
                  <select
                    className="status-badge"
                    value={booking.status}
                    onChange={(e) => handleStatusUpdate(booking.id, e.target.value)}
                    style={{
                      padding: '5px',
                      borderRadius: '3px',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-sm btn-delete"
                      onClick={() => handleDelete(booking.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
