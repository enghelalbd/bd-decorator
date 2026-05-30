const router = require('express').Router();
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const { verifyJWT, verifyRole } = require('../middleware/auth');

const stripeKey = process.env.STRIPE_SECRET_KEY;
// Lazy-init so the server still boots if the test key is missing
let stripe = null;
if (stripeKey && stripeKey.startsWith('sk_')) {
    stripe = require('stripe')(stripeKey);
}

// Create payment intent
router.post('/create-intent', verifyJWT, async (req, res) => {
    try {
        const { bookingId } = req.body;
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        if (booking.userEmail !== req.user.email)
            return res.status(403).json({ message: 'Forbidden' });
        if (booking.paymentStatus === 'paid')
            return res.status(400).json({ message: 'Already paid' });

        const amount = Math.round(Number(booking.serviceSnapshot.cost) * 100); // cents
        if (!stripe) {
            // Fallback for dev when no Stripe key configured
            return res.json({ clientSecret: 'demo_secret', demo: true, amount });
        }
        const intent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method_types: ['card'],
            metadata: { bookingId: String(booking._id), userEmail: booking.userEmail },
        });
        res.json({ clientSecret: intent.client_secret, amount });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Confirm payment + record txn
router.post('/confirm', verifyJWT, async (req, res) => {
    try {
        const { bookingId, paymentIntentId, transactionId } = req.body;
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        if (booking.userEmail !== req.user.email)
            return res.status(403).json({ message: 'Forbidden' });

        booking.paymentStatus = 'paid';
        booking.paymentIntentId = paymentIntentId || 'demo_intent';
        booking.amountPaid = booking.serviceSnapshot.cost;
        await booking.save();

        const payment = await Payment.create({
            booking: booking._id,
            userEmail: booking.userEmail,
            amount: booking.serviceSnapshot.cost,
            paymentIntentId: booking.paymentIntentId,
            transactionId: transactionId || `TXN-${Date.now()}`,
        });

        res.json({ booking, payment });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Payment history (user)
router.get('/mine', verifyJWT, async (req, res) => {
    const items = await Payment.find({ userEmail: req.user.email })
        .sort({ createdAt: -1 })
        .populate('booking');
    res.json(items);
});

// Admin revenue + analytics
router.get('/admin/stats', verifyJWT, verifyRole('admin'), async (_req, res) => {
    const [revenueAgg, totalBookings, paidBookings, byCategory] = await Promise.all([
        Payment.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }]),
        Booking.countDocuments(),
        Booking.countDocuments({ paymentStatus: 'paid' }),
        Booking.aggregate([
            { $group: { _id: '$serviceSnapshot.category', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]),
    ]);
    res.json({
        revenue: revenueAgg[0]?.total || 0,
        totalBookings,
        paidBookings,
        byCategory,
    });
});

// Decorator earnings (paid + assigned)
router.get('/decorator/earnings', verifyJWT, verifyRole('decorator'), async (req, res) => {
    const bookings = await Booking.find({
        assignedDecoratorEmail: req.user.email,
        paymentStatus: 'paid',
    });
    const total = bookings.reduce((s, b) => s + (b.amountPaid || 0), 0);
    res.json({ total, bookings });
});

module.exports = router;
