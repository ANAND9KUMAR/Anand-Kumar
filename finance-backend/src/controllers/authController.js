const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/database');

const login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (user.status !== 'active') {
        return res.status(403).json({ error: 'User is inactive. Please contact admin.' });
    }

    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const payload = {
        id: user.id,
        username: user.username,
        role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'super_secret_finance_dashboard_key', { expiresIn: '1d' });

    res.json({
        message: 'Login successful',
        token,
        user: payload
    });
};

const register = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const hash = bcrypt.hashSync(password, 10);
        // By default, open registration creates a viewer. Admin must upgrade to analyst or admin.
        const insert = db.prepare(`INSERT INTO users (username, password_hash, role, status) VALUES (?, ?, 'viewer', 'active')`);
        const result = insert.run(username, hash);
        
        res.status(201).json({ message: 'User registered successfully', userId: result.lastInsertRowid });
    } catch (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { login, register };
