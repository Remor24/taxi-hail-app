// src/App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <nav style={{ margin: 10 }}>
        {!user ? (
          <Link to="/register" style={{ marginRight: 10 }}>
            Register / Login
          </Link>
        ) : (
          <>
            <span style={{ marginRight: 10 }}>Welcome, {user.username}</span>
            <Link to="/book">Book a Ride</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route
          path="/"
          element={<Navigate to={user ? "/book" : "/register"} replace />}
        />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route
          path="/book"
          element={
            user ? <BookingForm user={user} /> : <Navigate to="/register" />
          }
        />
      </Routes>
    </Router>
  );
}

// Registration & Login form
function Register({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Replace with your backend endpoint for registration/login
      const response = await axios.post("/api/register", { username, password });
      setUser(response.data.user);
    } catch (err) {
      setError("Failed to register/login. Try again.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Register / Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div style={{ marginTop: 8 }}>
          <label>Password: </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <p style={{ color: "red", marginTop: 10 }}>{error}</p>
        )}
        <button type="submit" style={{ marginTop: 10 }}>
          Submit
        </button>
      </form>
    </div>
  );
}

// Booking form for rides
function BookingForm({ user }) {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [status, setStatus] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      // Replace with your backend booking endpoint
      await axios.post("/api/bookings", {
        userId: user.id,
        pickup,
        destination,
      });
      setStatus("Booking successful!");
    } catch (err) {
      setStatus("Booking failed. Please try again.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Book a Ride</h2>
      <form onSubmit={handleBooking}>
        <div>
          <label>Pickup Location: </label>
          <input
            required
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
          />
        </div>
        <div style={{ marginTop: 8 }}>
          <label>Destination: </label>
          <input
            required
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <button type="submit" style={{ marginTop: 10 }}>
          Book Now
        </button>
      </form>
      {status && <p style={{ marginTop: 10 }}>{status}</p>}
    </div>
  );
}

export default App;
