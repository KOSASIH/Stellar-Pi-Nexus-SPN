const TransactionModel = require('../models/Transaction'); // Assuming you have a Transaction model
const { sendPayment } = require('../api/stellar'); // Import Stellar API integration

// Function to create a new transaction
async function createTransaction(userId, destinationId, amount) {
    try {
        const transaction = new TransactionModel({
            userId,
            destinationId,
            amount,
            status: 'pending',
            createdAt: new Date(),
        });
        await transaction.save();
        return transaction;
    } catch (error) {
        console.error('Error creating transaction:', error);
        throw new Error('Transaction creation failed');
    }
}

// Function to execute a transaction
async function executeTransaction(transactionId, sourceSecret) {
    try {
        const transaction = await TransactionModel.findById(transactionId);
        if (!transaction) {
            throw new Error('Transaction not found');
        }
        if (transaction.status !== 'pending') {
            throw new Error('Transaction already executed or canceled');
        }

        const result = await sendPayment(sourceSecret, transaction.destinationId, transaction.amount);
        transaction.status = 'completed';
        transaction.transactionHash = result.hash; // Assuming the result contains a hash
        await transaction.save();

        return transaction;
    } catch (error) {
        console.error('Error executing transaction:', error);
        throw new Error('Transaction execution failed');
    }
}

// Function to get transaction history for a user
async function getUser TransactionHistory(userId) {
    try {
        const transactions = await TransactionModel.find({ userId }).sort({ createdAt: -1 });
        return transactions;
    } catch (error) {
        console.error('Error fetching user transaction history:', error);
        throw new Error('Unable to fetch transaction history');
    }
}

module.exports = { createTransaction, executeTransaction, getUser TransactionHistory };
