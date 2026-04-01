const userModel = require('../models/userModel');

const createUser = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const result = await userModel.createUser(name, email);
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                id: result.insertId,
                name,
                email
            }
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userModel.getUserById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userModel.getAllUsers();
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { createUser, getUserById, getAllUsers }; 