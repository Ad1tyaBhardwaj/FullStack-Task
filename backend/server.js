const express = require('express');
const cors = require('cors'); // Add this
const app = express();
const port = 3000;

// Enable CORS for all origins
app.use(cors()); // Add this

// Middleware to parse JSON requests
app.use(express.json());

// Define a default route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the backend server! Use /api/click with POST to test the functionality.');
  console.log("Hello World")
});

// Backend logic for button click
app.post('/api/click', (req, res) => {
  let response = {
    points: 1, // Default point increment
    prize: null // No prize by default
    
  };

  // Add 10 points with a 50% chance
  if (Math.random() < 0.5) {
    response.points += 10;
  }

  // Award a prize with a 25% chance
  if (Math.random() < 0.25) {
    response.prize = 'Generic Prize';
  }
  console.log('API Response:', response);

  // Send response back to frontend
  res.json(response);


});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
