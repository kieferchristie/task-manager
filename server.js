const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Import routes
const userRoutes = require('./routes/users');

// Use routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Connect to MongoDB
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
