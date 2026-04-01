const express = require('express');
const router = express.Router();
const { createUser, getUserById, getAllUsers } = require('../controllers/userController');
const { validateCreateUser } = require('../middlewares/validate');

router.get('/users', getAllUsers);
router.post('/users', validateCreateUser, createUser);
router.get('/users/:id', getUserById);

module.exports = router;