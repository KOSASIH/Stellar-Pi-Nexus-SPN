const TransactionModel = require('../models/Transaction'); // Assuming you have a Transaction model
const mlModel = require('../ml/fraudDetectionModel'); // Import your ML model for fraud detection

// Function to detect fraud in a transaction
async function detectFraud(transaction) {
    try {
        const features = extractFeatures(transaction);
        const prediction = await mlModel.predict(features); // Assuming your model has a predict method
        return prediction === 'fraud';
    } catch (error) {
        console.error('Error detecting fraud:', error);
        throw new Error('Fraud detection failed');
    }
}

// Function to extract features from a transaction
function extractFeatures(transaction) {
    return {
        amount: transaction.amount,
        timestamp: transaction.createdAt,
        userId: transaction.userId,
        // Add more features as needed
    };
}

// Function to analyze recent transactions for fraud
async function analyzeRecentTransactions() {
    try {
        const recentTransactions = await TransactionModel.find().sort({ createdAt: -1 }).limit(100);
        const fraudReports = [];

        for (const transaction of recentTransactions) {
            const isFraud = await detectFraud(transaction);
            if (isFraud) {
                fraudReports.push(transaction);
            }
        }

        return fraudReports;
    } catch (error) {
        console.error('Error analyzing recent transactions:', error);
        throw new Error('Transaction analysis failed');
    }
}

module.exports = { detectFraud, analyzeRecentTransactions };
