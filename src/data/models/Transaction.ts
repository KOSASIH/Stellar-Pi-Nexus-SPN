import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
    transactionId: { type: String, required: true, unique: true },
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
});

export const Transaction = model('Transaction', transactionSchema);
