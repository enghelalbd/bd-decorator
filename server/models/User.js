const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        photoURL: { type: String, default: '' },
        role: {
            type: String,
            enum: ['user', 'admin', 'decorator'],
            default: 'user',
        },
        status: {
            type: String,
            enum: ['active', 'disabled'],
            default: 'active',
        },
        // decorator-specific
        specialties: [{ type: String }],
        rating: { type: Number, default: 0 },
        experienceYears: { type: Number, default: 0 },
        bio: { type: String, default: '' },
        phone: { type: String, default: '' },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
