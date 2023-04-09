const dbConfig = require("../config/db-config.json")
const { Sequelize} = require("sequelize")

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect
    }
)

module.exports = sequelize