const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already taken');
    }

    const newUser = new User({ username, password });

    await newUser.save();
    const savedUser = await User.findOne({ username });
    console.log('Stored hashed password during registration:', savedUser.password);

    res.status(201).send('User registered successfully');
  } catch (err) {
    console.error('Server error during registration:', err);
    res.status(500).send('Server error');
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Login request received for username:', username);

    const user = await User.findOne({ username });
    if (!user) {
      console.error('User not found');
      return res.status(400).send('Invalid credentials');
    }

    console.log('Plaintext password:', password);
    console.log('Stored hashed password:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match status:', isMatch);

    if (!isMatch) {
      console.error('Password does not match');
      return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Login successful, token generated:', token);
    res.json({ token });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
