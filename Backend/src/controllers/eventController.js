const eventModel = require('../models/eventModel');

const getAllEvents = async (req, res, next) => {
    try {
        const events = await eventModel.getAllUpcomingEvents();
        res.status(200).json({
            success: true,
            count: events.length,
            data: events
        });
    } catch (error) {
        next(error);
    }
};

const createEvent = async (req, res, next) => {
    try {
        const { title, description, date, total_capacity } = req.body;
        const result = await eventModel.createEvent(title, description, date, total_capacity);
        res.status(201).json({
            success: true,
            message: 'Event created successfully',
            data: {
                id: result.insertId,
                title,
                description,
                date,
                total_capacity,
                remaining_tickets: total_capacity
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllEvents,
    createEvent
};