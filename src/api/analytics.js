const TransactionModel = require('../models/Transaction'); // Assuming you have a Transaction model
const UserModel = require('../models/User'); // Assuming you have a User model

// Function to analyze transaction data
async function analyzeTransactionData() {
    try {
        const transactions = await TransactionModel.find();
        // Perform analysis (e.g., total volume, average transaction size)
        const totalVolume = transactions.reduce((acc, tx) => acc + parseFloat(tx.amount), 0);
        const averageTransactionSize = totalVolume / transactions.length;

        return {
            totalVolume,
            averageTransactionSize,
            transactionCount: transactions.length,
        };
    } catch (error) {
        console.error('Error analyzing transaction data:', error);
        throw new Error('Transaction analysis failed');
    }
}

// Function to track user behavior
async function trackUser Behavior(userId ) {
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error('User  not found');
        }
        // Logic to track user behavior (e.g., login times, transaction frequency)
        user.lastLogin = new Date();
        await user.save();

        return {
            message: 'User  behavior tracked successfully',
            lastLogin: user.lastLogin,
        };
    } catch (error) {
        console.error('Error tracking user behavior:', error);
        throw new Error('User  behavior tracking failed');
    }
}

module.exports = { analyzeTransactionData, trackUser Behavior };
