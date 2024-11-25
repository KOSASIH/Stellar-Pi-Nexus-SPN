const winston = require('winston');

// Create a logger instance
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log errors to a file
        new winston.transports.File({ filename: 'combined.log' }) // Log all messages to a file
    ],
});

// Function to log info messages
function logInfo(message) {
    logger.info(message);
}

// Function to log error messages
function logError(message) {
    logger.error(message);
}

// Function to log warnings
function logWarning(message) {
    logger.warn(message);
}

module.exports = { logInfo, logError, logWarning };
