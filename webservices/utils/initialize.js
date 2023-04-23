const adminServices = require('../services/admin-services')
const userServices = require('../services/user-services')
const lineReader = require('line-reader');

const  initialize = async () => {
    await initializeAdmin()
    await initializeUsers()
}

const initializeAdmin = async () => {
    if (await adminServices.getNumberOfAdmins() === 0) {
       await adminServices.addAdmin(process.env.DEFAULT_ADMIN_NAME, process.env.DEFAULT_ADMIN_PASSWORD, process.env.TELEGRAM_CHAT_ID)
    }
}

const initializeUsers = async () => {
    if (await userServices.getNumberOfUsers() === 0) {
        lineReader.eachLine('./config/initial-users.txt', async (line, last) => {
            const userInfo = line.split(" ");
            await userServices.addUser(userInfo[0], userInfo[1])
            if (last) {
                console.log('All users are loaded');
            }
        })
    }
}

module.exports = initialize