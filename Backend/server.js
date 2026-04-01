const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

dotenv.config();
require('./src/config/db');

const userRoutes = require('./src/routes/userRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const attendanceRoutes = require('./src/routes/attendanceRoutes');
const errorHandler = require('./src/middlewares/errorHandler');



const app = express();

app.use(express.json());


// Root route — API info
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: '✅ API is working',
        api: 'Lattice Event Management API',
        version: '1.0.0',
        documentation: '/api-docs',
        endpoints: {
            users: '/api/users',
            events: '/api/events',
            bookings: '/api/bookings',
            attendance: '/api/attendance',
        },
        timestamp: new Date().toISOString(),
    });
});

// Swagger docs
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// // Routes
app.use('/api', userRoutes);
app.use('/api', eventRoutes);
app.use('/api', bookingRoutes);
app.use('/api', attendanceRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: '404: Route not found' });
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

    console.log(`docs Swagger docs at http://localhost:${PORT}/api-docs`);
});