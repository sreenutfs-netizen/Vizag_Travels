import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export default function BookingPage() {
  const [cabs, setCabs] = useState([]);
  const [selectedCab, setSelectedCab] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickupLocation: '',
    dropLocation: '',
    date: '',
    passengers: 1
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCabs();
  }, []);

  const fetchCabs = async () => {
    try {
      const response = await axios.get(`${API_URL}/cabs`);
      setCabs(response.data);
      setLoading(false);
    } catch (error) {
      setMessage('Failed to load cabs');
      setMessageType('error');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculatePrice = () => {
    if (!selectedCab) return 0;
    // Simple calculation: pricePerKm * distance estimate (assume 10km for demo)
    return selectedCab.pricePerKm * 10;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCab) {
      setMessage('Please select a cab');
      setMessageType('error');
      return;
    }

    if (!formData.name || !formData.email || !formData.phone || !formData.pickupLocation || !formData.dropLocation || !formData.date) {
      setMessage('Please fill in all fields');
      setMessageType('error');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/bookings`, {
        ...formData,
        cabId: selectedCab.id,
        totalPrice: calculatePrice()
      });

      setMessage(`✅ Booking Confirmed! Booking ID: ${response.data.booking.id}`);
      setMessageType('success');

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        pickupLocation: '',
        dropLocation: '',
        date: '',
        passengers: 1
      });
      setSelectedCab(null);

      setTimeout(() => {
        setMessage('');
      }, 5000);
    } catch (error) {
      setMessage('Failed to complete booking. Please try again.');
      setMessageType('error');
    }
  };

  if (loading) {
    return <div className="booking-page"><h2>Loading...</h2></div>;
  }

  return (
    <div className="booking-page">
      <h2>📍 Book Your Vizag Tour Cab</h2>

      {message && (
        <div className={`${messageType}-message`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Full Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Phone Number
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+91 9876543210"
              required
            />
          </label>
          <label>
            Date
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Pickup Location
            <input
              type="text"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleInputChange}
              placeholder="e.g., Railway Station, Hotel, Airport"
              required
            />
          </label>
          <label>
            Drop Location
            <input
              type="text"
              name="dropLocation"
              value={formData.dropLocation}
              onChange={handleInputChange}
              placeholder="e.g., Vizag Beach, Araku Valley"
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Number of Passengers
            <input
              type="number"
              name="passengers"
              value={formData.passengers}
              onChange={handleInputChange}
              min="1"
              required
            />
          </label>
        </div>

        <div className="cab-selection">
          <h3>Select Your Cab 🚗</h3>
          <div className="cab-grid">
            {cabs.map(cab => (
              <div
                key={cab.id}
                className={`cab-card ${selectedCab?.id === cab.id ? 'selected' : ''}`}
                onClick={() => setSelectedCab(cab)}
              >
                <div className="cab-icon">{cab.image}</div>
                <h4>{cab.name}</h4>
                <p>👥 Capacity: {cab.capacity} passengers</p>
                <p>₹{cab.pricePerKm}/km</p>
                <p style={{ marginTop: '10px', color: '#667eea', fontWeight: 'bold' }}>
                  ≈ ₹{calculatePrice()} (estimated)
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            💳 Book Now
          </button>
          <button
            type="reset"
            className="btn btn-secondary"
            onClick={() => {
              setFormData({
                name: '',
                email: '',
                phone: '',
                pickupLocation: '',
                dropLocation: '',
                date: '',
                passengers: 1
              });
              setSelectedCab(null);
            }}
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
}
