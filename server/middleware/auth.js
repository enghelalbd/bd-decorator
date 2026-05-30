const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyJWT = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        if (!auth || !auth.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: no token' });
        }
        const token = auth.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { email, role }
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: invalid token' });
    }
};

const verifyRole = (...roles) => {
    return async (req, res, next) => {
        try {
            const dbUser = await User.findOne({ email: req.user.email });
            if (!dbUser) return res.status(401).json({ message: 'User not found' });
            if (dbUser.status === 'disabled') {
                return res.status(403).json({ message: 'Account disabled' });
            }
            if (!roles.includes(dbUser.role)) {
                return res.status(403).json({ message: 'Forbidden: insufficient role' });
            }
            req.dbUser = dbUser;
            next();
        } catch (err) {
            return res.status(500).json({ message: 'Role verification failed' });
        }
    };
};

module.exports = { verifyJWT, verifyRole };
