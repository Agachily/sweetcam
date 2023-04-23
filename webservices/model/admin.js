const { DataTypes } = require("sequelize")
const sequelize = require('../database/database');

const Admin = sequelize.define("admins", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    chatId: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = {Admin}