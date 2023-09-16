
const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const User = sequelize.define('User', {
    id: {
        field: 'ID',
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
        },
    }
},{
    timestamps: false,
});

module.exports = User;
