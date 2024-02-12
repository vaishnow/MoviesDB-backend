const jwt = require("jsonwebtoken")
require("dotenv").config()

const mdbPasswd = process.env.MOVIESDB_PASSWD

const jwtMiddleware = (req, res, next) => {
	const token = req.headers['authorization'].split(' ')[1]
	try {
		const jwtResponse = jwt.verify(token,mdbPasswd)
		req.payload = jwtResponse.token
		next()
	} catch (error) {
		res.status(401).json({
			message: "Authentication failed"
		})
	}
}

module.exports = jwtMiddleware