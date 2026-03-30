const db = require('../config/db');

const markAttendance = async (booking_id, user_id, event_id) => {
    const [result] = await db.query(
        'INSERT INTO event_attendance (booking_id, user_id, event_id) VALUES (?, ?, ?)',
        [booking_id, user_id, event_id]
    );
    return result;
};

const isAlreadyAttended = async (booking_id) => {
    const [rows] = await db.query(
        'SELECT * FROM event_attendance WHERE booking_id = ?',
        [booking_id]
    );
    return rows.length > 0;
};

module.exports = {
    markAttendance,
    isAlreadyAttended
};