const { MongoClient } = require("mongodb");
const uri = require("../env.js").DB_URI;

module.exports = (database="users") => {
	const client = new MongoClient(uri);
	return client.db(database);
};