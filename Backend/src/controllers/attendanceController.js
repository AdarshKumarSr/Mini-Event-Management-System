const bookingModel = require('../models/bookingModel');
const attendanceModel = require('../models/attendanceModel');

const markAttendance = async (req, res, next) => {
    try {
        const { id: event_id } = req.params;
        const { booking_code } = req.body;

        // Find booking by code
        const booking = await bookingModel.getBookingByCode(booking_code);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Invalid booking code'
            });
        }

        // Check if booking belongs to this event
        if (String(booking.event_id) !== String(event_id)) {
            return res.status(400).json({
                success: false,
                message: 'This booking code does not belong to this event'
            });
        }

        // Check if already attended
        const alreadyAttended = await attendanceModel.isAlreadyAttended(booking.id);
        if (alreadyAttended) {
            return res.status(400).json({
                success: false,
                message: 'This ticket has already been used for entry'
            });
        }

        // Mark attendance
        await attendanceModel.markAttendance(booking.id, booking.user_id, event_id);

        // Get total bookings for this event
        const totalBookings = await bookingModel.countBookingsByEvent(event_id);

        res.status(200).json({
            success: true,
            message: 'Attendance marked successfully',
            data: {
                booking_code,
                user_id: booking.user_id,
                event_id,
                entry_time: new Date(),
                total_tickets_booked: totalBookings
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    markAttendance
};