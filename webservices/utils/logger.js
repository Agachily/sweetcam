const { format, createLogger, transports } = require("winston");
const { combine, timestamp, label, prettyPrint } = format;
const CATEGORY = 'sweetcam';

const logConfiguration = {
    transports: [
        new transports.Console()
    ],
    format: combine(
        label({
            label: CATEGORY
        }),
        timestamp(),
        prettyPrint()
    )
};

const logger =createLogger(logConfiguration);

// logger.log({level: 'info', message: 'Hello world!', test: {asdasd: "asdsadas"}});
module.exports = logger