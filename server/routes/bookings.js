const router = require('express').Router();
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const User = require('../models/User');
const { verifyJWT, verifyRole } = require('../middleware/auth');

// Create booking (user)
router.post('/', verifyJWT, async (req, res) => {
    try {
        const { serviceId, bookingDate, location, notes } = req.body;
        const service = await Service.findById(serviceId);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        const user = await User.findOne({ email: req.user.email });
        const booking = await Booking.create({
            service: service._id,
            serviceSnapshot: {
                service_name: service.service_name,
                cost: service.cost,
                unit: service.unit,
                category: service.category,
                image: service.image,
            },
            userEmail: req.user.email,
            userName: user?.name || req.user.email,
            bookingDate,
            location,
            notes,
        });
        res.status(201).json(booking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// My bookings (user) - sort + pagination
router.get('/mine', verifyJWT, async (req, res) => {
    const {
        sortBy = 'createdAt',
        order = 'desc',
        page = 1,
        limit = 6,
    } = req.query;
    const q = { userEmail: req.user.email };
    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
        Booking.find(q).sort({ [sortBy]: order === 'asc' ? 1 : -1 }).skip(skip).limit(Number(limit)),
        Booking.countDocuments(q),
    ]);
    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
});

// Update my booking (date/location/notes) - only if unpaid
router.patch('/:id/mine', verifyJWT, async (req, res) => {
    const b = await Booking.findById(req.params.id);
    if (!b) return res.status(404).json({ message: 'Not found' });
    if (b.userEmail !== req.user.email) return res.status(403).json({ message: 'Forbidden' });
    if (b.paymentStatus === 'paid')
        return res.status(400).json({ message: 'Paid bookings cannot be edited' });
    const { bookingDate, location, notes } = req.body;
    if (bookingDate) b.bookingDate = bookingDate;
    if (location) b.location = location;
    if (typeof notes === 'string') b.notes = notes;
    await b.save();
    res.json(b);
});

// Cancel booking (user) - only if unpaid
router.delete('/:id/mine', verifyJWT, async (req, res) => {
    const b = await Booking.findById(req.params.id);
    if (!b) return res.status(404).json({ message: 'Not found' });
    if (b.userEmail !== req.user.email) return res.status(403).json({ message: 'Forbidden' });
    if (b.paymentStatus === 'paid')
        return res.status(400).json({ message: 'Paid bookings cannot be cancelled' });
    await b.deleteOne();
    res.json({ message: 'Cancelled' });
});

// Admin: list all bookings
router.get('/', verifyJWT, verifyRole('admin'), async (req, res) => {
    const items = await Booking.find().sort({ createdAt: -1 });
    res.json(items);
});

// Admin: assign decorator (only if paid)
router.patch('/:id/assign', verifyJWT, verifyRole('admin'), async (req, res) => {
    const { decoratorEmail } = req.body;
    const b = await Booking.findById(req.params.id);
    if (!b) return res.status(404).json({ message: 'Not found' });
    if (b.paymentStatus !== 'paid')
        return res.status(400).json({ message: 'Booking is not paid yet' });
    const dec = await User.findOne({ email: decoratorEmail.toLowerCase(), role: 'decorator' });
    if (!dec) return res.status(404).json({ message: 'Decorator not found' });
    b.assignedDecoratorEmail = dec.email;
    b.assignedDecoratorName = dec.name;
    b.projectStatus = 'Assigned';
    await b.save();
    res.json(b);
});

// Decorator: my assigned projects
router.get('/assigned/mine', verifyJWT, verifyRole('decorator'), async (req, res) => {
    const items = await Booking.find({ assignedDecoratorEmail: req.user.email }).sort({
        bookingDate: 1,
    });
    res.json(items);
});

// Decorator: update project status
router.patch('/:id/status', verifyJWT, verifyRole('decorator'), async (req, res) => {
    const { projectStatus } = req.body;
    const b = await Booking.findById(req.params.id);
    if (!b) return res.status(404).json({ message: 'Not found' });
    if (b.assignedDecoratorEmail !== req.user.email)
        return res.status(403).json({ message: 'Not your project' });
    b.projectStatus = projectStatus;
    await b.save();
    res.json(b);
});

module.exports = router;
