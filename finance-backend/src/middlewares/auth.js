const jwt = require('jsonwebtoken');
const db = require('../db/database');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_finance_dashboard_key');
        
        // Fetch user basic info
        const user = db.prepare('SELECT id, username, role, status FROM users WHERE id = ?').get(decoded.id);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized: User not found' });
        }
        if (user.status !== 'active') {
            return res.status(403).json({ error: 'Forbidden: User is inactive' });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized: Token expired or invalid' });
    }
};

module.exports = authMiddleware;
