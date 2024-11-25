// API configuration settings
const apiConfig = {
    baseUrl: process.env.API_BASE_URL || 'https://api.example.com',
    apiKey: process.env.API_KEY || 'your-api-key',
    timeout: process.env.API_TIMEOUT || 5000, // Timeout in milliseconds
};

// Function to get headers for API requests
function getApiHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiConfig.apiKey}`,
    };
}

module.exports = { apiConfig, getApiHeaders };
