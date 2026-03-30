const express = require('express');
const router = express.Router();
const { markAttendance } = require('../controllers/attendanceController');
const { validateAttendance } = require('../middlewares/validate');

router.post('/events/:id/attendance', validateAttendance, markAttendance);

module.exports = router;