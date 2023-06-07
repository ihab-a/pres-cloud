const jwt = require("jsonwebtoken");

const { ENV_SECRET } = process.env;

module.exports = async (req, res, next) => {
	const token = req.headers.authorization;
	const tokenPayload = token ? (await jwt.verify(token, ENV_SECRET)) : null;

	if(!tokenPayload) return res.send({ error : "invalid token" });

	req._user = { id : tokenPayload.id };

	next();
}