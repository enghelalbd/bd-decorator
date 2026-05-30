const router = require('express').Router();
const User = require('../models/User');
const { verifyJWT, verifyRole } = require('../middleware/auth');

// Public: top decorators
router.get('/top', async (_req, res) => {
    const items = await User.find({ role: 'decorator', status: 'active' })
        .sort({ rating: -1 })
        .limit(6);
    res.json(items);
});

// Admin: list with pagination
router.get('/', verifyJWT, verifyRole('admin'), async (req, res) => {
    const { page = 1, limit = 8, search = '' } = req.query;
    const q = { role: 'decorator' };
    if (search) q.name = { $regex: search, $options: 'i' };
    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
        User.find(q).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
        User.countDocuments(q),
    ]);
    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
});

// Admin: list all users (to promote to decorator)
router.get('/users/all', verifyJWT, verifyRole('admin'), async (_req, res) => {
    const items = await User.find().sort({ createdAt: -1 });
    res.json(items);
});

// Admin: promote user to decorator
router.patch('/promote/:email', verifyJWT, verifyRole('admin'), async (req, res) => {
    const u = await User.findOneAndUpdate(
        { email: req.params.email.toLowerCase() },
        { role: 'decorator' },
        { new: true }
    );
    if (!u) return res.status(404).json({ message: 'Not found' });
    res.json(u);
});

// Admin: change role
router.patch('/role/:email', verifyJWT, verifyRole('admin'), async (req, res) => {
    const { role } = req.body;
    if (!['user', 'decorator', 'admin'].includes(role))
        return res.status(400).json({ message: 'Invalid role' });
    const u = await User.findOneAndUpdate(
        { email: req.params.email.toLowerCase() },
        { role },
        { new: true }
    );
    if (!u) return res.status(404).json({ message: 'Not found' });
    res.json(u);
});

// Admin: update decorator (CRUD)
router.put('/:id', verifyJWT, verifyRole('admin'), async (req, res) => {
    const u = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!u) return res.status(404).json({ message: 'Not found' });
    res.json(u);
});

// Admin: approve/disable
router.patch('/:id/status', verifyJWT, verifyRole('admin'), async (req, res) => {
    const { status } = req.body;
    if (!['active', 'disabled'].includes(status))
        return res.status(400).json({ message: 'Invalid status' });
    const u = await User.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!u) return res.status(404).json({ message: 'Not found' });
    res.json(u);
});

// Admin: delete decorator
router.delete('/:id', verifyJWT, verifyRole('admin'), async (req, res) => {
    const u = await User.findByIdAndDelete(req.params.id);
    if (!u) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
});

module.exports = router;
