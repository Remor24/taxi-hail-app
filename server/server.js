<<<<<<< HEAD
// Express server setup (see earlier for full content)
=======
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Your existing users and bookings storage or database setup here
// For demo, we'll use in-memory arrays:
const users = [];
const bookings = [];

// Register/login user endpoint
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Username and password required." });

  let user = users.find(u => u.username === username);
  if (user) {
    if (user.password === password) {
      return res.json({ user: { id: user.id, username: user.username } });
    } else {
      return res.status(401).json({ error: "Invalid password." });
    }
  } else {
    const newUser = { id: uuidv4(), username, password };
    users.push(newUser);
    return res.json({ user: { id: newUser.id, username: newUser.username } });
  }
});

// Booking endpoint
app.post("/api/bookings", (req, res) => {
  const { userId, pickup, destination } = req.body;
  if (!userId || !pickup || !destination)
    return res.status(400).json({ error: "userId, pickup, and destination are required." });

  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: "User not found." });

  const newBooking = {
    id: uuidv4(),
    userId,
    pickup,
    destination,
    timestamp: new Date().toISOString(),
  };
  bookings.push(newBooking);
  res.json({ booking: newBooking });
});

// (Add other routes and middleware as needed)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
>>>>>>> ed78bbbe (Full project: backend and frontend)
