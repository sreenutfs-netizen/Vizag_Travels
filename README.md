# 🚌 Vizag Tours & Travels - Booking Application

A complete full-stack web application for booking cabs and tours in Visakhapatnam (Vizag) with an admin dashboard to manage bookings.

## Features

### User Features
- **Browse Available Cabs** - View different vehicle options with capacity and pricing
- **Easy Booking** - Simple form to book a cab with pickup/drop locations and date
- **Real-time Pricing** - Calculate estimated fare based on cab type
- **Booking Confirmation** - Get instant booking confirmation with booking ID

### Admin Features
- **Dashboard Statistics** - View total, pending, confirmed, and completed bookings
- **Booking Management** - View all bookings in a detailed table
- **Status Updates** - Change booking status (Pending → Confirmed → Completed → Cancelled)
- **Delete Bookings** - Remove bookings from the system
- **Real-time Updates** - Dashboard refreshes every 5 seconds

## Project Structure

```
Travels Application/
├── backend/              # Express.js server
│   ├── server.js         # Main server file
│   ├── package.json      # Backend dependencies
│   ├── bookings.json     # Booking data storage
│   └── cabs.json         # Available cabs data
│
└── frontend/             # React.js application
    ├── public/           # Static files
    ├── src/
    │   ├── App.js        # Main component
    │   ├── App.css       # Styling
    │   ├── index.js      # Entry point
    │   └── pages/
    │       ├── BookingPage.js    # User booking interface
    │       └── AdminPanel.js     # Admin dashboard
    └── package.json      # Frontend dependencies
```

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React.js, Axios
- **Data Storage**: JSON files
- **Styling**: CSS3 with responsive design

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Backend Setup

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend server:
```bash
npm start
```

The frontend will open automatically at `http://localhost:3000`

## Available APIs

### User Endpoints
- `GET /api/cabs` - Get all available cabs
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/:id` - Get booking details

### Admin Endpoints
- `GET /api/admin/bookings` - Get all bookings
- `PUT /api/admin/bookings/:id` - Update booking status
- `DELETE /api/admin/bookings/:id` - Delete a booking

## Usage

### Booking a Cab
1. Click "Book a Cab" tab
2. Fill in your personal details (name, email, phone)
3. Select pickup and drop locations
4. Choose a date
5. Select a cab from the available options
6. Click "Book Now"
7. You'll receive a booking confirmation with a booking ID

### Managing Bookings (Admin)
1. Click "Admin Panel" tab
2. View all bookings in the dashboard
3. See statistics for total, pending, confirmed, and completed bookings
4. Change booking status using the dropdown
5. Delete bookings if needed

## Sample Cabs Available

1. **Innova** - 6 seater, ₹12/km
2. **Toyota Fortuner** - 7 seater, ₹15/km
3. **Sedan** - 4 seater, ₹8/km
4. **Premium SUV** - 5 seater, ₹18/km

## Booking Statuses

- **Pending** - Awaiting confirmation
- **Confirmed** - Booking confirmed by admin
- **Completed** - Trip completed
- **Cancelled** - Booking cancelled

## Features Overview

### Modern UI/UX
- Responsive design works on desktop, tablet, and mobile
- Beautiful gradient theme with purple and blue colors
- Smooth animations and transitions
- Interactive cab selection with visual feedback

### Data Management
- JSON-based storage (easily upgradeable to database)
- Real-time data synchronization
- Auto-refresh admin dashboard

### Security Considerations (For Production)
- Add authentication for admin panel
- Use a proper database (MongoDB, PostgreSQL)
- Implement API authentication (JWT tokens)
- Add input validation and sanitization
- HTTPS encryption

## Future Enhancements

- User authentication and login system
- Payment gateway integration
- Google Maps integration for location selection
- SMS/Email notifications for bookings
- Customer ratings and reviews
- Driver assignment and tracking
- Multiple branch/location support
- Cancellation policies and refunds
- Multi-language support

## Troubleshooting

### Backend won't start
- Make sure port 5000 is not in use
- Check if Node.js is installed: `node --version`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Frontend won't start
- Make sure port 3000 is not in use
- Clear npm cache: `npm cache clean --force`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### CORS errors
- Make sure backend is running on port 5000
- Check that frontend is making requests to `http://localhost:5000`

## Contact & Support

For any issues or questions, please contact the development team.

---

**Made with ❤️ for Vizag Tours & Travels**

Version 1.0.0 | May 2026
