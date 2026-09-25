const bcrypt = require('bcrypt');
const db = require('../db/database');

const getUsers = (req, res) => {
    const users = db.prepare('SELECT id, username, role, status, created_at FROM users').all();
    res.json(users);
};

const createUser = (req, res) => {
    const { username, password, role, status } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const userRole = role || 'viewer';
    const userStatus = status || 'active';

    try {
        const hash = bcrypt.hashSync(password, 10);
        const insert = db.prepare(`INSERT INTO users (username, password_hash, role, status) VALUES (?, ?, ?, ?)`);
        const result = insert.run(username, hash, userRole, userStatus);
        
        res.status(201).json({ message: 'User created successfully', userId: result.lastInsertRowid });
    } catch (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const { role, status } = req.body; // Can expand to password update logic later
    
    // Prevent modifying the default admin
    const userToUpdate = db.prepare('SELECT role FROM users WHERE id = ?').get(id);
    if (!userToUpdate) {
        return res.status(404).json({ error: 'User not found' });
    }
    if (userToUpdate.role === 'admin' && req.user.id != id) {
        return res.status(403).json({ error: 'Cannot modify other admin users' });
    }

    let query = 'UPDATE users SET ';
    const params = [];
    if (role) {
        query += 'role = ?, ';
        params.push(role);
    }
    if (status) {
        query += 'status = ?, ';
        params.push(status);
    }

    if (params.length === 0) {
        return res.status(400).json({ error: 'Nothing to update' });
    }

    query = query.slice(0, -2) + ' WHERE id = ?';
    params.push(id);

    try {
        db.prepare(query).run(...params);
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getUsers, createUser, updateUser };
