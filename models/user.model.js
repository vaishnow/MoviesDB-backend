const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: [true, "Username cannot be empty"],
		min: [3, "Username must be atleast 3 characters in length"],
		max: [20, "Username must be less than 20 characters in length"]
	},
	email: {
		type: String,
		required: [true, "Email cannot be empty"],
		unique: [true, "Email already Exist"]
	},
	password: {
		type: String,
		required: [true, "Password cannot be empty"],
		min: [8, "Password must be longer than 8 characters"]
	},
	userimg: {
		type: String
	},
	dob: {
		type: String
	}
},
	{
		timestamps: true
	}
)


module.exports = mongoose.model('user', userSchema)