const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Issue JWT for a Firebase-authenticated user (email-based, simple)
router.post('/jwt', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });
    const user = await User.findOne({ email: email.toLowerCase() });
    const role = user ? user.role : 'user';
    const token = jwt.sign({ email: email.toLowerCase(), role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });
    res.json({ token });
});

// Upsert user (called on register/login)
router.post('/users', async (req, res) => {
    try {
        const { name, email, photoURL } = req.body;
        if (!email || !name) return res.status(400).json({ message: 'name & email required' });
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            // update photo/name if changed
            let dirty = false;
            if (photoURL && photoURL !== existing.photoURL) {
                existing.photoURL = photoURL;
                dirty = true;
            }
            if (name && name !== existing.name) {
                existing.name = name;
                dirty = true;
            }
            if (dirty) await existing.save();
            return res.json(existing);
        }
        const user = await User.create({ name, email: email.toLowerCase(), photoURL });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a user by email (used for role check)
router.get('/users/:email', async (req, res) => {
    const u = await User.findOne({ email: req.params.email.toLowerCase() });
    if (!u) return res.status(404).json({ message: 'Not found' });
    res.json(u);
});

module.exports = router;
