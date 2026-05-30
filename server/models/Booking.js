const mongoose = require('mongoose');

const PROJECT_STATUSES = [
    'Pending',
    'Assigned',
    'Planning Phase',
    'Materials Prepared',
    'On the Way to Venue',
    'Setup in Progress',
    'Completed',
    'Cancelled',
];

const bookingSchema = new mongoose.Schema(
    {
        service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
        serviceSnapshot: {
            service_name: String,
            cost: Number,
            unit: String,
            category: String,
            image: String,
        },
        userEmail: { type: String, required: true, lowercase: true },
        userName: { type: String, required: true },
        bookingDate: { type: Date, required: true },
        location: { type: String, required: true },
        notes: { type: String, default: '' },
        paymentStatus: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
        paymentIntentId: { type: String, default: '' },
        amountPaid: { type: Number, default: 0 },
        projectStatus: { type: String, enum: PROJECT_STATUSES, default: 'Pending' },
        assignedDecoratorEmail: { type: String, default: '' },
        assignedDecoratorName: { type: String, default: '' },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
module.exports.PROJECT_STATUSES = PROJECT_STATUSES;
