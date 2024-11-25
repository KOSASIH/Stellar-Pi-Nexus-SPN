const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User ', // Reference to User model
        required: true,
    },
    destinationId: {
        type: String, // Could be a Stellar account ID or similar
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'canceled'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    transactionHash: {
        type: String, // Store transaction hash from blockchain
    },
});

// Method to cancel a transaction
transactionSchema.methods.cancel = async function() {
    this.status = 'canceled';
    await this.save();
};

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
