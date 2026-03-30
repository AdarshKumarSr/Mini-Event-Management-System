const db = require('../config/db');

const getAllUpcomingEvents = async () => {
    const [rows] = await db.query(
        'SELECT * FROM events WHERE date > NOW() ORDER BY date ASC'
    );
    return rows;
};

const createEvent = async (title, description, date, total_capacity) => {
    const [result] = await db.query(
        'INSERT INTO events (title, description, date, total_capacity, remaining_tickets) VALUES (?, ?, ?, ?, ?)',
        [title, description, date, total_capacity, total_capacity]
    );
    return result;
};

const getEventById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM events WHERE id = ?',
        [id]
    );
    return rows[0];
};

const decrementTicket = async (eventId, connection) => {
    const [result] = await connection.query(
        'UPDATE events SET remaining_tickets = remaining_tickets - 1 WHERE id = ? AND remaining_tickets > 0',
        [eventId]
    );
    return result;
};

module.exports = {
    getAllUpcomingEvents,
    createEvent,
    getEventById,
    decrementTicket
};