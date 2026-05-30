require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim());

app.use(
    cors({
        origin: (origin, callback) => {
            // allow requests with no origin (curl, Postman, same-origin)
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            callback(new Error(`CORS: origin ${origin} not allowed`));
        },
        credentials: true,
    })
);
app.use(express.json({ limit: '5mb' }));
app.use(morgan('dev'));

app.get('/', (_req, res) => {
    res.json({ message: 'StyleDecor API is running', status: 'ok' });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/decorators', require('./routes/decorators'));
app.use('/api/payments', require('./routes/payments'));

// 404
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Error handler
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ message: err.message || 'Server error' });
});

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB connected');
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1);
    });
