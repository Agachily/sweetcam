const nodemailer = require('nodemailer');

const a = {
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
}
console.log(a)
const transporter = nodemailer.createTransport(a)

module.exports = transporter

