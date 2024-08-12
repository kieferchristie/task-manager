const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const token = req.header('Authorization').replace('Bearer ', '');

        // Verify and decode the JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the token has expired
        if (decoded.exp * 1000 < Date.now()) {
            return res.status(401).json({ message: 'Token has expired. Please log in again.' });
        }

        // Find the user associated with the token
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }

        // Store the user in the request object for use in other routes
        req.user = user;
        next();
    } catch (err) {
        // Handle different types of JWT errors
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired. Please log in again.' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token. Please authenticate.' });
        }

        // General error handling
        return res.status(401).json({ message: 'Authentication error. Please authenticate.' });
    }
};
