import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import BookingPage from './pages/BookingPage';
import AdminPanel from './pages/AdminPanel';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="logo">🚌 Vizag Tours & Travels</h1>
          <div className="nav-buttons">
            <button 
              className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentPage('home')}
            >
              Book a Cab
            </button>
            <button 
              className={`nav-btn ${currentPage === 'admin' ? 'active' : ''}`}
              onClick={() => setCurrentPage('admin')}
            >
              Admin Panel
            </button>
          </div>
        </div>
      </nav>

      <main>
        {currentPage === 'home' && <BookingPage />}
        {currentPage === 'admin' && <AdminPanel />}
      </main>

      <footer className="footer">
        <p>&copy; 2026 Vizag Tours & Travels. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
