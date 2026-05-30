const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
    {
        service_name: { type: String, required: true },
        cost: { type: Number, required: true }, // BDT
        unit: { type: String, required: true }, // per sqft, per floor, per meter
        category: {
            type: String,
            required: true,
            enum: ['home', 'wedding', 'office', 'seminar', 'meeting', 'birthday', 'anniversary'],
        },
        description: { type: String, required: true },
        image: { type: String, default: '' },
        createdByEmail: { type: String, required: true },
    },
    { timestamps: true }
);

serviceSchema.index({ service_name: 'text', description: 'text' });

module.exports = mongoose.model('Service', serviceSchema);
