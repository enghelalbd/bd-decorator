const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
        userEmail: { type: String, required: true, lowercase: true },
        amount: { type: Number, required: true },
        currency: { type: String, default: 'BDT' },
        paymentIntentId: { type: String, required: true },
        transactionId: { type: String, required: true },
        status: { type: String, default: 'succeeded' },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
