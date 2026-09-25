const db = require('../db/database');

const createRecord = (req, res) => {
    const { amount, type, category, date, notes } = req.body;
    
    if (amount === undefined || !type || !category || !date) {
        return res.status(400).json({ error: 'Amount, type, category, and date are required' });
    }
    
    if (type !== 'INCOME' && type !== 'EXPENSE') {
        return res.status(400).json({ error: 'Type must be INCOME or EXPENSE' });
    }

    try {
        const stmt = db.prepare(`
            INSERT INTO records (amount, type, category, date, notes, created_by)
            VALUES (?, ?, ?, ?, ?, ?)
        `);
        const info = stmt.run(amount, type, category, date, notes || '', req.user.id);
        
        res.status(201).json({ message: 'Record created successfully', recordId: info.lastInsertRowid });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create record' });
    }
};

const getRecords = (req, res) => {
    // Basic filtering and pagination
    const { type, category, start_date, end_date, limit = 50, offset = 0 } = req.query;
    
    let query = 'SELECT * FROM records WHERE 1=1';
    const params = [];

    if (type) {
        query += ' AND type = ?';
        params.push(type);
    }
    if (category) {
        query += ' AND category = ?';
        params.push(category);
    }
    if (start_date) {
        query += ' AND date >= ?';
        params.push(start_date);
    }
    if (end_date) {
        query += ' AND date <= ?';
        params.push(end_date);
    }

    query += ' ORDER BY date DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    try {
        const records = db.prepare(query).all(...params);
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch records' });
    }
};

const getRecordById = (req, res) => {
    const { id } = req.params;
    const record = db.prepare('SELECT * FROM records WHERE id = ?').get(id);
    
    if (!record) {
        return res.status(404).json({ error: 'Record not found' });
    }
    
    res.json(record);
};

const updateRecord = (req, res) => {
    const { id } = req.params;
    const { amount, type, category, date, notes } = req.body;

    const record = db.prepare('SELECT id FROM records WHERE id = ?').get(id);
    if (!record) {
        return res.status(404).json({ error: 'Record not found' });
    }

    let query = 'UPDATE records SET ';
    const params = [];

    if (amount !== undefined) { query += 'amount = ?, '; params.push(amount); }
    if (type) { query += 'type = ?, '; params.push(type); }
    if (category) { query += 'category = ?, '; params.push(category); }
    if (date) { query += 'date = ?, '; params.push(date); }
    if (notes !== undefined) { query += 'notes = ?, '; params.push(notes); }

    if (params.length === 0) {
        return res.status(400).json({ error: 'Nothing to update' });
    }

    query = query.slice(0, -2) + ' WHERE id = ?';
    params.push(id);

    try {
        db.prepare(query).run(...params);
        res.json({ message: 'Record updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update record' });
    }
};

const deleteRecord = (req, res) => {
    const { id } = req.params;

    const record = db.prepare('SELECT id FROM records WHERE id = ?').get(id);
    if (!record) {
        return res.status(404).json({ error: 'Record not found' });
    }

    try {
        db.prepare('DELETE FROM records WHERE id = ?').run(id);
        res.json({ message: 'Record deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete record' });
    }
};

module.exports = { createRecord, getRecords, getRecordById, updateRecord, deleteRecord };
