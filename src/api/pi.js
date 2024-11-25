const axios = require('axios');

const PI_API_BASE_URL = 'https://api.minepi.com'; // Replace with actual Pi Network API URL

// Function to authenticate user
async function authenticateUser (username, password) {
    try {
        const response = await axios.post(`${PI_API_BASE_URL}/auth/login`, {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Error authenticating user:', error);
        throw new Error('Authentication failed');
    }
}

// Function to get user balance
async function getUser Balance(userId, token) {
    try {
        const response = await axios.get(`${PI_API_BASE_URL}/users/${userId}/balance`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.balance;
    } catch (error) {
        console.error('Error fetching user balance:', error);
        throw new Error('Unable to fetch user balance');
    }
}

// Function to get user transaction history
async function getUser TransactionHistory(userId, token) {
    try {
        const response = await axios.get(`${PI_API_BASE_URL}/users/${userId}/transactions`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.transactions;
    } catch (error) {
        console.error('Error fetching user transaction history:', error);
        throw new Error('Unable to fetch transaction history');
    }
}

module.exports = { authenticateUser , getUser Balance, getUser TransactionHistory };
