const db = require('../db/database');

const getSummary = (req, res) => {
    try {
        // Compute total income, expenses, and net balance
        const totals = db.prepare(`
            SELECT 
                SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END) as total_income,
                SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) as total_expense
            FROM records
        `).get();

        const income = totals.total_income || 0;
        const expense = totals.total_expense || 0;
        const net_balance = income - expense;

        res.json({
            total_income: income,
            total_expense: expense,
            net_balance: net_balance
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to load summary' });
    }
};

const getCategoryTotals = (req, res) => {
    try {
        // Group amounts by category
        const totals = db.prepare(`
            SELECT category, type, SUM(amount) as total
            FROM records
            GROUP BY category, type
        `).all();
        
        res.json(totals);
    } catch (err) {
        res.status(500).json({ error: 'Failed to load category totals' });
    }
};

const getRecentActivity = (req, res) => {
    try {
        const { limit = 5 } = req.query;
        const recent = db.prepare(`
            SELECT id, amount, type, category, date 
            FROM records 
            ORDER BY date DESC, id DESC
            LIMIT ?
        `).all(limit);

        res.json(recent);
    } catch (err) {
        res.status(500).json({ error: 'Failed to load recent activity' });
    }
};

module.exports = { getSummary, getCategoryTotals, getRecentActivity };
