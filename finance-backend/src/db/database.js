const Database = require('better-sqlite3');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const dbFile = process.env.DB_FILE || 'finance.sqlite';
const dbPath = path.resolve(process.cwd(), dbFile);
const db = new Database(dbPath, { verbose: console.log });

// Initialize database schema
const initDB = () => {
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'viewer', /* viewer, analyst, admin */
            status TEXT NOT NULL DEFAULT 'active', /* active, inactive */
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount REAL NOT NULL,
            type TEXT NOT NULL, /* INCOME, EXPENSE */
            category TEXT NOT NULL,
            date TEXT NOT NULL,
            notes TEXT,
            created_by INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(created_by) REFERENCES users(id)
        );
    `);

    // Create an initial admin user if not exists
    const adminCheck = db.prepare('SELECT id FROM users WHERE role = ?').get('admin');
    if (!adminCheck) {
        const bcrypt = require('bcrypt');
        const hash = bcrypt.hashSync('admin123', 10);
        const insertAdmin = db.prepare(`
            INSERT INTO users (username, password_hash, role, status) VALUES (?, ?, ?, ?)
        `);
        insertAdmin.run('admin', hash, 'admin', 'active');
        console.log('Default admin user created: admin / admin123');
    }
};

initDB();

module.exports = db;
