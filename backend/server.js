const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Data file path
const bookingsFile = path.join(__dirname, 'bookings.json');
const cabsFile = path.join(__dirname, 'cabs.json');

// Initialize data files if they don't exist
const initializeDataFiles = () => {
  if (!fs.existsSync(bookingsFile)) {
    fs.writeFileSync(bookingsFile, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(cabsFile)) {
    const defaultCabs = [
      { id: 1, name: 'Innova', capacity: 6, pricePerKm: 12, image: '🚌' },
      { id: 2, name: 'Toyota Fortuner', capacity: 7, pricePerKm: 15, image: '🚐' },
      { id: 3, name: 'Sedan', capacity: 4, pricePerKm: 8, image: '🚗' },
      { id: 4, name: 'Premium SUV', capacity: 5, pricePerKm: 18, image: '🏎️' }
    ];
    fs.writeFileSync(cabsFile, JSON.stringify(defaultCabs, null, 2));
  }
};

const readBookings = () => {
  return JSON.parse(fs.readFileSync(bookingsFile, 'utf8'));
};

const writeBookings = (bookings) => {
  fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2));
};

const readCabs = () => {
  return JSON.parse(fs.readFileSync(cabsFile, 'utf8'));
};

// Routes

// Get all cabs
app.get('/api/cabs', (req, res) => {
  try {
    const cabs = readCabs();
    res.json(cabs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cabs' });
  }
});

// Book a cab
app.post('/api/bookings', (req, res) => {
  try {
    const { name, email, phone, cabId, pickupLocation, dropLocation, date, passengers, totalPrice } = req.body;

    if (!name || !email || !phone || !cabId || !pickupLocation || !dropLocation || !date || !passengers) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const booking = {
      id: uuidv4(),
      name,
      email,
      phone,
      cabId,
      pickupLocation,
      dropLocation,
      date,
      passengers,
      totalPrice: totalPrice || 0,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const bookings = readBookings();
    bookings.push(booking);
    writeBookings(bookings);

    res.status(201).json({ success: true, message: 'Booking confirmed!', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Get all bookings (Admin)
app.get('/api/admin/bookings', (req, res) => {
  try {
    const bookings = readBookings();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Get booking details
app.get('/api/bookings/:id', (req, res) => {
  try {
    const bookings = readBookings();
    const booking = bookings.find(b => b.id === req.params.id);
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

// Update booking status (Admin)
app.put('/api/admin/bookings/:id', (req, res) => {
  try {
    const { status } = req.body;
    const bookings = readBookings();
    const booking = bookings.find(b => b.id === req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    booking.status = status;
    writeBookings(bookings);

    res.json({ success: true, message: 'Booking updated', booking });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

// Delete booking (Admin)
app.delete('/api/admin/bookings/:id', (req, res) => {
  try {
    const bookings = readBookings();
    const filteredBookings = bookings.filter(b => b.id !== req.params.id);
    writeBookings(filteredBookings);

    res.json({ success: true, message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Initialize data files and start server
initializeDataFiles();

app.listen(PORT, () => {
  console.log(`✅ Vizag Travels Backend running on http://localhost:${PORT}`);
  console.log(`📍 API Documentation:`);
  console.log(`   GET  /api/cabs - Get all available cabs`);
  console.log(`   POST /api/bookings - Create a new booking`);
  console.log(`   GET  /api/admin/bookings - Get all bookings (Admin)`);
  console.log(`   PUT  /api/admin/bookings/:id - Update booking status (Admin)`);
});
