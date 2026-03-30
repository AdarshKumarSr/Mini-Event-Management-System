const express = require('express');
const router = express.Router();
const { getAllEvents, createEvent } = require('../controllers/eventController');
const { validateCreateEvent } = require('../middlewares/validate');

router.get('/events', getAllEvents);
router.post('/events', validateCreateEvent, createEvent);

module.exports = router;