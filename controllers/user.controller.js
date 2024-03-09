const mongoose = require("mongoose")
const User = require("../models/user.model")
const MDB = require("../models/mdb.model")
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

exports.details = async (req, res) => {
	const userId = req.payload
	try {
		const userDetails = await User.findOne({ _id: userId }, { password: 0, _id: 0 })
		if (userDetails) {
			res.status(200).json({
				message: "Success",
				userdata: userDetails
			})
		} else {

			res.status(406).json({
				message: "Something went wrong, Try logging in",
			})
		}
	} catch (error) {
		res.status(401).json({
			error: error.name,
			message: error.message
		})

	}
}

exports.edit = async (req, res) => {
	const userId = new mongoose.Types.ObjectId(req.payload)
	console.log("req.body = " , req.body); //DEBUG/Exposure
	const { username } = req.body
	const { password, newpassword } = req.body
	try {
		const usernameExists = await User.findOne({ username, _id: { $ne: userId } })
		if (usernameExists) {
			res.status(409).json({
				error: "Username already exists",
				message: "The username provided is already registered. Please use a different name."
			})
		} else {
			const userDetails = await User.findOneAndUpdate({ _id: userId, password }, { username, password: newpassword }, { projection: { password: 0 } })
			if (userDetails) {
				res.status(200).json({
					message: "Profile Updated",
					userdata: userDetails
				})
			} else {
				res.status(401).json({ error: "Incorrect password" })
			}
		}
	} catch (error) {
		res.status(401).json({
			error: error.name,
			message: error.message
		})

	}
}

exports.lists = async (req, res) => {
	const userId = req.payload
	const { type } = req.params

	const query = { userId: new mongoose.Types.ObjectId(userId) }
	query[type] = true

	try {
		const result = await MDB.aggregate([
			{
				$match: query,
			},
			{
				$lookup: {
					from: "tmdbcaches",
					localField: "tmdbId",
					foreignField: "tmdbId",
					as: "list",
				},
			},
			{
				$project: {
					_id: 0,
					viewedAt: 0,
					__v: 0
				}
			},
			{
				$unwind: '$list'
			}
		])

		const list = result.filter(stat => stat.list[type] === true)

		if (result) {
			res.status(200).json({
				message: "Success",
				list: result
			})
		} else {

			res.status(406).json({
				message: "Something went wrong",
			})
		}
	} catch (error) {
		res.status(401).json({
			error: error.name,
			message: error.message
		})

	}
}