// database config
const DB_USER = "root";
const DB_PASSWORD = "PWD";
const DB_HOST = "127.0.0.1";
const DB_PORT = "27017";

const MICROSERVICE_USER_PORT = "http://127.0.0.1:9001";
const MICROSERVICE_BOOK_PORT = "http://127.0.0.1:9002";
const MICROSERVICE_AUTHENTICATION_PORT = "http://127.0.0.1:9003";
const MICROSERVICE_TRANSACTION_PORT = "http://127.0.0.1:9004";

module.exports = {
	DB_URI : `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}?directConnection=true`,
	microservices : {
		user: MICROSERVICE_USER_PORT,
		transaction: MICROSERVICE_TRANSACTION_PORT,
		book: MICROSERVICE_BOOK_PORT,
		authentication: MICROSERVICE_AUTHENTICATION_PORT,
	}
}