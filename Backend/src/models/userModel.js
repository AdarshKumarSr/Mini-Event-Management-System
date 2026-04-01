const db = require('../config/db');

const createUser = async (name, email) => {
    const [result] = await db.query(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [name, email]
    );
    return result;
};

const getUserById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM users WHERE id = ?',
        [id]
    );
    return rows[0];
};

const getAllUsers = async () => {
    const [rows] = await db.query(
        'SELECT * FROM users ORDER BY created_at DESC'
    );
    return rows;
};

module.exports = { createUser, getUserById, getAllUsers };