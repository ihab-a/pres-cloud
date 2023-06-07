const { MongoClient } = require("mongodb");
const uri = require("./env.js");

module.exports = (database="users") => {
	const client = new MongoClient(uri);
	return client.db(database);
};