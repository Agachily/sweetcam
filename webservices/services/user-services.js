const { User } = require("../model/user");
const bcrypt = require("bcrypt");

const addUser = async (name, password) => {
    const saltRounds = 10
    await User.sync()
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const result = await User.create({name: name, passwordHash: passwordHash})
    return {id: result.id, name: result.name}
}

const findUserPasswordHashByName = async (name) => {
    await User.sync()
    const result = await User.findOne({where: {name: name}})
    return result === null ? null : result.passwordHash
}

const getNumberOfUsers = async () => {
    return await User.count()
}

module.exports = { findUserPasswordHashByName, addUser, getNumberOfUsers}