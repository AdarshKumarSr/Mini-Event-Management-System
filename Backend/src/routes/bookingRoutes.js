const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings } = require('../controllers/bookingController');
const { validateCreateBooking } = require('../middlewares/validate');

router.post('/bookings', validateCreateBooking, createBooking);
router.get('/users/:id/bookings', getUserBookings);

module.exports = router;