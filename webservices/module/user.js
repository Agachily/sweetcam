const { DataTypes } = require("sequelize")
const sequelize = require('../database/database');

const User = sequelize.define("users", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = {User}