const { format, createLogger, transports } = require("winston");
require("winston-daily-rotate-file")

const fileRotateTransport = new transports.DailyRotateFile({
    filename: "logs/%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxFiles: "14d",
});

const logConfiguration = {
    transports: [
        new transports.Console(),
        fileRotateTransport
    ],
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${JSON.stringify(info)}`)
    )
};

const logger= createLogger(logConfiguration);

module.exports = logger