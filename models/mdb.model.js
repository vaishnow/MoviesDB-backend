const mongoose = require('mongoose')

const MDB = mongoose.Schema({
	tmdbId: {
		type: Number,
		required: true,
		max: [10, "tmdbId must be less than 10 numbers in length"]
	},
	type: {
		type: Number,
		required: true,
		enum: {
			values: [1, 2],
			message: "Values for type must be 1(Movie) or 2(TVShow)"
		}
	},
	userId: {
		type: String,
		required: true
	}
	, liked: {
		type: Boolean,
		required: true,
		default: false
	}
	, saved: {
		type: Boolean,
		required: true,
		default: false
	},
	viewedAt: {
		type: String,
		required: true,
		default: () => new Date().toISOString()
	}
}
)

module.exports = mongoose.model('mdbstat', MDB)