const context = require("request-context");
const fs = require("fs");

const options = {
    logDirectory: "./logs", // Директория для хранения логгов (должна существовать)
    fileNamePattern: "<DATE>.log", // Паттерн файла логов
    dateFormat: "YYYY.MM.DD", // Формат даты
};

if (!fs.existsSync(options.logDirectory)) {
    fs.mkdir(options.logDirectory, {}, () => {});
}

const logger = require("simple-node-logger").createRollingFileLogger(options); // Создание логгера

module.exports = {
    ...logger,
    info: (message) => logger.info(context.get("uuid"), " ", message), // Переназначение метода, для автоматического логирования UUID запроса
    error: (message) => logger.error(context.get("uuid"), " ", message),
    fatal: (message) => logger.fatal(context.get("uuid"), " ", message),
};
