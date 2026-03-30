const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

const validateCreateEvent = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ max: 200 }).withMessage('Title must be under 200 characters'),
    body('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Date must be a valid ISO 8601 format (e.g. 2026-05-15T10:00:00)'),
    body('total_capacity')
        .notEmpty().withMessage('Total capacity is required')
        .isInt({ min: 1 }).withMessage('Capacity must be a positive number'),
    handleValidationErrors
];

const validateCreateBooking = [
    body('user_id')
        .notEmpty().withMessage('User ID is required')
        .isInt({ min: 1 }).withMessage('User ID must be a valid number'),
    body('event_id')
        .notEmpty().withMessage('Event ID is required')
        .isInt({ min: 1 }).withMessage('Event ID must be a valid number'),
    handleValidationErrors
];

const validateAttendance = [
    body('booking_code')
        .trim()
        .notEmpty().withMessage('Booking code is required'),
    handleValidationErrors
];

module.exports = {
    validateCreateEvent,
    validateCreateBooking,
    validateAttendance
};