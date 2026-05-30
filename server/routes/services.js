const router = require('express').Router();
const Service = require('../models/Service');
const { verifyJWT, verifyRole } = require('../middleware/auth');

// Public: list services with search/filter/sort/pagination
router.get('/', async (req, res) => {
    try {
        const {
            search = '',
            category = '',
            minBudget,
            maxBudget,
            sortBy = 'createdAt',
            order = 'desc',
            page = 1,
            limit = 9,
        } = req.query;

        const q = {};
        if (search) q.service_name = { $regex: search, $options: 'i' };
        if (category) q.category = category;
        if (minBudget || maxBudget) {
            q.cost = {};
            if (minBudget) q.cost.$gte = Number(minBudget);
            if (maxBudget) q.cost.$lte = Number(maxBudget);
        }

        const skip = (Number(page) - 1) * Number(limit);
        const sortObj = { [sortBy]: order === 'asc' ? 1 : -1 };
        const [items, total] = await Promise.all([
            Service.find(q).sort(sortObj).skip(skip).limit(Number(limit)),
            Service.countDocuments(q),
        ]);

        res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Public: featured/limited list
router.get('/featured', async (_req, res) => {
    const items = await Service.find().sort({ createdAt: -1 }).limit(6);
    res.json(items);
});

// Public: details
router.get('/:id', async (req, res) => {
    try {
        const item = await Service.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Not found' });
        res.json(item);
    } catch (err) {
        res.status(400).json({ message: 'Invalid id' });
    }
});

// Admin: create
router.post('/', verifyJWT, verifyRole('admin'), async (req, res) => {
    try {
        const payload = { ...req.body, createdByEmail: req.user.email };
        const item = await Service.create(payload);
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Admin: update
router.put('/:id', verifyJWT, verifyRole('admin'), async (req, res) => {
    try {
        const item = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).json({ message: 'Not found' });
        res.json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Admin: delete
router.delete('/:id', verifyJWT, verifyRole('admin'), async (req, res) => {
    try {
        const item = await Service.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
