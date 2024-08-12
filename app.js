const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Log whether JWT_SECRET is set or not
console.log('JWT_SECRET is set:', !!process.env.JWT_SECRET);

const app = express();

app.use(express.json());

// Import routes
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth'); // Import auth routes

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes); // Use auth routes

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Connect to MongoDB only if not in test mode
if (process.env.NODE_ENV !== 'test') {
  const dbURI = process.env.MONGODB_URI;
  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('MongoDB connection error:', err);
  });
}

module.exports = app; // Export the app for testing
