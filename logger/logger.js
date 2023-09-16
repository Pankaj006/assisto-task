const winston = require("winston");
const path = require("path");
const logFolder = path.join(__dirname);

// Configuration
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "assisto-task" },
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: path.join(logFolder, "error.log"), level: "error" }),
        new winston.transports.File({ filename: path.join(logFolder, "combined.log") }),
    ],
});

module.exports = logger;
