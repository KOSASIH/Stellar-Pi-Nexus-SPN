const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // Exclude from queries by default
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastLogin: {
        type: Date,
    },
    balance: {
        type: Number,
        default: 0,
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction', // Reference to Transaction model
    }],
});

// Method to update user balance
userSchema.methods.updateBalance = async function(amount) {
    this.balance += amount;
    await this.save();
};

// Method to check if the user has sufficient balance
userSchema.methods.hasSufficientBalance = function(amount) {
    return this.balance >= amount;
};

const User = mongoose.model('User ', userSchema);

module.exports = User;
