// database config
const DB_USER = "root";
const DB_PASSWORD = "pwd";
const DB_HOST = "127.0.0.1";
const DB_PORT = "27017";

module.exports = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}?directConnection=true`;