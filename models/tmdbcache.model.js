const mongoose = require('mongoose')

const tmdb = mongoose.Schema({
	tmdbId: {
		type: Number,
		required: true,
		max: [10, "tmdbId must be less than 10 numbers in length"]
	},
	title: {
		type: String,
		required: true
	},
	poster_path: {
		type: String,
		required: true,
	},
	genres: {
		type: Array
	},
	type: {
		type: Number,
		required: true,
		enum: {
			values: [1, 2],
			message: "Values for type must be 1(Movie) or 2(TVShow)"
		}
	}
}, { timestamps: true }
)

module.exports = mongoose.model('tmdbcache', tmdb)