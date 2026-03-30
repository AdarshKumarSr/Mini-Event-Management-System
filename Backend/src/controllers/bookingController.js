const db = require('../config/db');
const eventModel = require('../models/eventModel');
const bookingModel = require('../models/bookingModel');
const generateBookingCode = require('../utils/generateCode');

const createBooking = async (req, res, next) => {
    const connection = await db.getConnection();
    try {
        const { user_id, event_id } = req.body;

        // Start transaction
        await connection.beginTransaction();

        // Check if event exists
        const event = await eventModel.getEventById(event_id);
        if (!event) {
            await connection.rollback();
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // Check if tickets are available
        if (event.remaining_tickets <= 0) {
            await connection.rollback();
            return res.status(400).json({
                success: false,
                message: 'No tickets available for this event'
            });
        }

        // Decrement ticket count
        const decrementResult = await eventModel.decrementTicket(event_id, connection);

        // Race condition check — if no rows updated means ticket just ran out
        if (decrementResult.affectedRows === 0) {
            await connection.rollback();
            return res.status(400).json({
                success: false,
                message: 'Tickets just sold out, please try again'
            });
        }

        // Generate unique booking code
        const booking_code = generateBookingCode();

        // Create booking
        const booking = await bookingModel.createBooking(user_id, event_id, booking_code, connection);

        // Commit transaction
        await connection.commit();

        res.status(201).json({
            success: true,
            message: 'Ticket booked successfully',
            data: {
                booking_id: booking.insertId,
                booking_code,
                user_id,
                event_id,
                event_title: event.title,
                event_date: event.date
            }
        });
    } catch (error) {
        await connection.rollback();
        next(error);
    } finally {
        connection.release();
    }
};

const getUserBookings = async (req, res, next) => {
    try {
        const { id } = req.params;
        const bookings = await bookingModel.getBookingsByUserId(id);
        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createBooking,
    getUserBookings
};