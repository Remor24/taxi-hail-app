const express = require('express');
const app = express();

// Middleware example - to parse JSON bodies
app.use(express.json());

// Your routes go here
app.get('/', (req, res) => {
  res.send('Hello from Taxi Hail backend!');
});

// You can add more routes, for example:
app.post('/register', (req, res) => {
  // handle client or driver registration here
  res.send('Register endpoint');
});

// Use the port Render assigns or 3000 locally
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
