const db = require('../config/db');

const createBooking = async (user_id, event_id, booking_code, connection) => {
    const [result] = await connection.query(
        'INSERT INTO bookings (user_id, event_id, booking_code) VALUES (?, ?, ?)',
        [user_id, event_id, booking_code]
    );
    return result;
};

const getBookingsByUserId = async (user_id) => {
    const [rows] = await db.query(
        `SELECT 
      b.id, b.booking_code, b.booking_date,
      e.title, e.description, e.date AS event_date
     FROM bookings b
     JOIN events e ON b.event_id = e.id
     WHERE b.user_id = ?
     ORDER BY b.booking_date DESC`,
        [user_id]
    );
    return rows;
};

const getBookingByCode = async (booking_code) => {
    const [rows] = await db.query(
        'SELECT * FROM bookings WHERE booking_code = ?',
        [booking_code]
    );
    return rows[0];
};

const countBookingsByEvent = async (event_id) => {
    const [rows] = await db.query(
        'SELECT COUNT(*) as total FROM bookings WHERE event_id = ?',
        [event_id]
    );
    return rows[0].total;
};

module.exports = {
    createBooking,
    getBookingsByUserId,
    getBookingByCode,
    countBookingsByEvent
};