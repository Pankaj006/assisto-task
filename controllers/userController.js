const User = require('../models/user');
const logger = require('../logger/logger');

const userController = {

    // REST Api to create User
    createUser: async (req, res) => {
        try {
            const user = await User.create(req.body);
            logger.info(`User created: ${user.dataValues.name}`);
            return res.status(201).json(user);
        } catch (error) {
            logger.error(`Error creating user: ${error.errors[0].message}`);
            return res.status(500).json({message: error.errors[0].message});
        }
    },

    // REST Api to get User by ID
    getUserById: async (req, res) => {
        const userId = req.params.userId;

        try {
            const user = await User.findByPk(userId);
            if (user) {
                logger.info(`User found: ${user.dataValues.name}`);
                return res.json(user);
            } else {
                logger.warn(`User with ID ${userId} not found`);
                return res.status(404).json({message: `User with ID ${userId} NOT FOUND!`});
            }
        } catch (error) {
            logger.error(`Error getting user by ID: ${error.message}`);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    },

    // REST Api to update User
    updateUser: async (req, res) => {
        const updatedUserData = req.body;
        const userId = req.params.userId;

        try {
            const user = await User.findByPk(userId);
            if (user) {
                Object.assign(user, updatedUserData);
                await user.save();
                logger.info(`User updated: ${user.dataValues.name}`);
                return res.json(user);
            } else {
                logger.warn(`User with ID ${userId} not found`);
                return res.status(404).json({message: `User with ID ${userId} NOT FOUND!`});
            }
        } catch (error) {
            logger.error(`Error updating user: ${error.message}`);
            return res.status(500).json({message: 'Failed to update user!'});
        }
    },

    // REST Api to delete user by ID
    deleteUserById: async (req, res) => {
        const userId = req.params.userId;

        try {
            const user = await User.findByPk(userId);
            if (user) {
                await user.destroy();
                logger.info(`User deleted: ${user.dataValues.name}`);
                return res.status(200).json({message: 'USER SUCCESSFULLY DELETED!'});
            } else {
                logger.warn(`User with ID ${userId} not found`);
                return res.status(404).json({message: `User with ID ${userId} NOT FOUND!`});
            }
        } catch (error) {
            logger.error(`Error deleting user: ${error.message}`);
            return res.status(500).json({message: 'Failed to delete user!'});
        }
    },

    // REST Api to get all Users
    getAllUser: async (req, res) => {
        try {
            const users = await User.findAll();
            logger.info(`Retrieved ${users.length} user`);
            return res.json(users);
        } catch (error) {
            logger.error('Error getting all users:', error.message);
            return res.status(500).json({message: 'Failed to get all Users!'});
        }
    },
};

module.exports = userController;
