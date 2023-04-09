const {User} = require("../module/user");
const bcrypt = require("bcrypt");

const saltRounds = 10

const addUser = async (name, password) => {
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

module.exports = { findUserPasswordHashByName, addUser }