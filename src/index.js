// src/index.js

// Import necessary modules
const express = require('express');
const { connectToDatabase } = require('./config/dbConfig');
const { logInfo, logError } = require('./utils/logger');
const apiRoutes = require('./routes/apiRoutes'); // Assuming you have an API routes file
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create an instance of Express
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Connect to the database
connectToDatabase();

// Set up routes
app.use('/api', apiRoutes); // Use your API routes

// Error handling middleware
app.use((err, req, res, next) => {
    logError(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logInfo(`Server is running on port ${PORT}`);
});
