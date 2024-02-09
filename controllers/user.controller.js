const User = require("../models/user.model")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
	const { username, email, password } = req.body
	try {
		const emailExists = await User.findOne({ email })
		const userExists = await User.findOne({ username })
		if (emailExists) {
			res.status(406).json({ message: 'Email already exists' })
		}
		else if (userExists) {
			res.status(406).json({ message: 'Username already exists' })
		}
		else {
			const newUser = {
				username,
				email,
				password
			}
			await User.create(newUser)
			res.status(200).json({ message: `${email} registered` })
		}

	}
	catch (error) {
		res.status(500).json({
			error: error.name,
			message: error.message
		})
	}

}

exports.login = async (req, res) => {
	const { email, password } = req.body
	const mdbPasswd = process.env.MOVIESDB_PASSWD
	try {
		let userExists = await User.findOne({ email, password }, { password: 0, __v: 0, updatedAt: 0 })
		if (userExists) {
			const token = jwt.sign({ token: userExists._id }, mdbPasswd)
			userdata = { ...userExists.toObject(), _id: null }
			res.status(200).json({
				message: "Login Success",
				userdata,
				token
			})
		} else {
			res.status(406).json({ message: 'Incorrect email or password' })
		}
	} catch (error) {
		res.status(401).json({
			error: error.name,
			message: error.message
		})
	}
}